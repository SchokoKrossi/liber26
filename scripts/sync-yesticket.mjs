#!/usr/bin/env node
/**
 * scripts/sync-yesticket.mjs
 *
 * Daily GitHub Action job: fetch the LIBER YesTicket iCal feed and
 * replace the `shows` table contents.
 *
 * Mode: yesticket-only. Each run deletes all FUTURE shows and reinserts
 * the events currently in the feed. Past shows are preserved.
 *
 * Required environment variables:
 *   SUPABASE_URL           — e.g. https://hfbqnjuxuvmmakhxgqbp.supabase.co
 *   SUPABASE_SERVICE_KEY   — service-role key (bypasses RLS)
 */

const YT_ICAL_URL = 'https://www.yesticket.org/ical/liber-ligue-dimpro-de-berlin.ics';

// ═══════════════════════════════════════════════════════════
// iCal parser — mirrors js/lib-yesticket.js so behaviour matches.
// ═══════════════════════════════════════════════════════════
function unescapeIcs(s) {
  return (s || '').replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
}
function unfold(t) { return t.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, ''); }
function parseDTStart(v) {
  const m = v.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
  return m ? { date: `${m[1]}-${m[2]}-${m[3]}`, time: `${m[4]}:${m[5]}` } : { date: null, time: '20:00' };
}
function cleanTitle(s) {
  return s.replace(/\s*\(LIBER,?\s*Ligue d['']Impro de Berlin\)\s*$/i, '').trim();
}

function parseIcal(text) {
  const lines = unfold(text).split(/\r?\n/);
  const events = [];
  let cur = null;
  for (const raw of lines) {
    if (raw === 'BEGIN:VEVENT') { cur = {}; continue; }
    if (raw === 'END:VEVENT')   { if (cur && cur.date) events.push(cur); cur = null; continue; }
    if (!cur) continue;
    const colon = raw.indexOf(':');
    if (colon < 0) continue;
    const name = raw.slice(0, colon).split(';')[0].toUpperCase();
    const val  = raw.slice(colon + 1);
    switch (name) {
      case 'SUMMARY':  cur.title = cleanTitle(unescapeIcs(val)); break;
      case 'DTSTART':  { const { date, time } = parseDTStart(val); cur.date = date; cur.time = time; break; }
      case 'LOCATION': cur.venue = unescapeIcs(val).trim(); break;
      case 'URL':      cur.tickets = val.trim(); break;
    }
  }
  return events;
}

function eventToRow(ev) {
  return {
    date: ev.date, time: ev.time || '20:00',
    title_fr: ev.title || '', title_de: ev.title || '',
    venue: ev.venue || '', tickets: ev.tickets || '',
  };
}

// ═══════════════════════════════════════════════════════════
// Minimal Supabase REST client
// ═══════════════════════════════════════════════════════════
class Supa {
  constructor(url, key) {
    this.url = url.replace(/\/$/, '');
    this.h = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  }
  async deleteFutureShows() {
    const today = new Date().toISOString().slice(0, 10);
    const r = await fetch(`${this.url}/rest/v1/shows?date=gte.${today}`, {
      method: 'DELETE',
      headers: { ...this.h, Prefer: 'return=representation' },
    });
    if (!r.ok) throw new Error(`Delete failed (HTTP ${r.status}): ${await r.text()}`);
    const arr = await r.json();
    return arr.length;
  }
  async insertShows(rows) {
    if (!rows.length) return 0;
    const r = await fetch(`${this.url}/rest/v1/shows`, {
      method: 'POST',
      headers: { ...this.h, Prefer: 'return=representation' },
      body: JSON.stringify(rows),
    });
    if (!r.ok) throw new Error(`Insert failed (HTTP ${r.status}): ${await r.text()}`);
    const arr = await r.json();
    return arr.length;
  }
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env var.');
    process.exit(1);
  }

  console.log('Fetching iCal:', YT_ICAL_URL);
  const res = await fetch(YT_ICAL_URL);
  if (!res.ok) throw new Error(`iCal HTTP ${res.status}`);
  const ical = await res.text();

  const events = parseIcal(ical);
  console.log(`Parsed ${events.length} event(s) from feed.`);
  for (const e of events) console.log('  •', e.date, e.time, '—', e.title);

  const supa = new Supa(url, key);
  const deleted  = await supa.deleteFutureShows();
  console.log(`Deleted ${deleted} future show(s).`);
  const inserted = await supa.insertShows(events.map(eventToRow));
  console.log(`Inserted ${inserted} new show(s).`);
  console.log('Sync complete.');
}

main().catch(err => { console.error('Sync FAILED:', err); process.exit(1); });
