/**
 * lib-yesticket.js — Fetch + parse the LIBER YesTicket iCal feed
 * and replace the shows table with its contents.
 *
 * Mode: yesticket-only. Each sync deletes all FUTURE shows and reinserts
 * the events currently in the feed. Past shows are kept for history.
 *
 * Used by:
 *  • The admin "Sync from YesTicket" button (via syncShowsFromYesTicket()).
 *  • Mirrored logic in scripts/sync-yesticket.mjs for the daily GitHub Action.
 */

const YT_ICAL_URL  = 'https://www.yesticket.org/ical/liber-ligue-dimpro-de-berlin.ics';
// Free CORS proxies — only the in-browser button needs these; the GitHub
// Action fetches the feed directly server-side.
const CORS_PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

// ─── iCal helpers ──────────────────────────────────────────────────
function _unescapeIcs(s) {
  if (!s) return '';
  return s.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
}
function _unfold(text) {
  return text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
}
function _parseDTStart(value) {
  const m = value.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
  if (!m) return { date: null, time: '20:00' };
  return { date: `${m[1]}-${m[2]}-${m[3]}`, time: `${m[4]}:${m[5]}` };
}
function _cleanTitle(s) {
  return s.replace(/\s*\(LIBER,?\s*Ligue d['']Impro de Berlin\)\s*$/i, '').trim();
}

/** Extract the YesTicket numeric event ID from the iCal UID
 *  (UIDs look like "19358_<hash>" — we want just the leading digits). */
function _eventIdFromUid(uid) {
  const m = (uid || '').match(/^(\d+)/);
  return m ? m[1] : null;
}

/** Build the YesTicket banner image URL for an event (~1200×628 OG-style). */
function _imageUrlFor(eventId) {
  if (!eventId) return '';
  return `https://cdn.yesticket.org/picture_me.php?type=event&id=${eventId}&width=1200&height=628`;
}

/** Split a YesTicket DESCRIPTION into { de, fr } sections.
 *  YesTicket convention: German first, then a long run of dashes, then French.
 *  If no divider is found, the same text is returned for both. */
function _splitDescription(desc) {
  if (!desc) return { de: '', fr: '' };
  const parts = desc.split(/\n\s*-{20,}\s*\n/);
  if (parts.length >= 2) {
    return { de: parts[0].trim(), fr: parts.slice(1).join('\n').trim() };
  }
  // No divider — same text for both languages
  const t = desc.trim();
  return { de: t, fr: t };
}

/** Parse iCal text into an array of show objects. */
function parseYesTicketIcal(text) {
  const lines = _unfold(text).split(/\r?\n/);
  const events = [];
  let current = null;
  for (const raw of lines) {
    if (raw === 'BEGIN:VEVENT') { current = {}; continue; }
    if (raw === 'END:VEVENT')   {
      if (current && current.date) {
        current.image = _imageUrlFor(_eventIdFromUid(current.uid));
        const { de, fr } = _splitDescription(current.description || '');
        current.descriptionDE = de;
        current.descriptionFR = fr;
        events.push(current);
      }
      current = null; continue;
    }
    if (!current) continue;
    const colon = raw.indexOf(':');
    if (colon < 0) continue;
    const head = raw.slice(0, colon);
    const val  = raw.slice(colon + 1);
    const name = head.split(';')[0].toUpperCase();
    switch (name) {
      case 'UID':         current.uid         = val.trim(); break;
      case 'SUMMARY':     current.title       = _cleanTitle(_unescapeIcs(val)); break;
      case 'DTSTART':     { const { date, time } = _parseDTStart(val); current.date = date; current.time = time; break; }
      case 'LOCATION':    current.venue       = _unescapeIcs(val).trim(); break;
      case 'URL':         current.tickets     = val.trim(); break;
      case 'DESCRIPTION': current.description = _unescapeIcs(val); break;
    }
  }
  return events;
}

function _eventToShowRow(ev) {
  return {
    date:           ev.date,
    time:           ev.time || '20:00',
    title_fr:       ev.title || '',
    title_de:       ev.title || '',
    venue:          ev.venue || '',
    tickets:        ev.tickets || '',
    image_url:      ev.image || null,
    description_fr: ev.descriptionFR || null,
    description_de: ev.descriptionDE || null,
  };
}

async function _fetchIcalViaProxy() {
  let lastErr;
  for (const make of CORS_PROXIES) {
    try {
      const res = await fetch(make(YT_ICAL_URL), { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const txt = await res.text();
      if (txt.includes('BEGIN:VCALENDAR')) return txt;
      throw new Error('Proxy returned non-iCal content');
    } catch (err) {
      lastErr = err;
      console.warn('[YesTicket] proxy failed, trying next:', err.message);
    }
  }
  throw lastErr || new Error('All CORS proxies failed');
}

/**
 * Yesticket-only sync: wipe all FUTURE shows, insert everything in the feed.
 * Past shows are preserved.
 */
async function syncShowsFromYesTicket() {
  if (typeof sb === 'undefined') throw new Error('Supabase client (sb) not loaded');

  // 1. Fetch + parse
  const ical = await _fetchIcalViaProxy();
  const evts = parseYesTicketIcal(ical);

  // 2. Delete all future shows (yesticket is the only source of truth)
  const today = new Date().toISOString().slice(0, 10);
  const { error: delErr, count: delCount } = await sb
    .from('shows')
    .delete({ count: 'exact' })
    .gte('date', today);
  if (delErr) throw new Error('Delete future failed: ' + delErr.message);

  // 3. Insert the events from the feed
  let inserted = 0;
  if (evts.length) {
    const rows = evts.map(_eventToShowRow);
    const { error: insErr } = await sb.from('shows').insert(rows);
    if (insErr) throw new Error('Insert failed: ' + insErr.message);
    inserted = rows.length;
  }

  return { fetched: evts.length, deleted: delCount || 0, inserted };
}
