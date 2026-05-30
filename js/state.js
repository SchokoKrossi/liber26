/**
 * js/state.js — Central app state, loaded from Supabase on init.
 *
 * Initial values are empty arrays; loadFromSupabase() fills them
 * from the database before the first page render.
 */

// ── Global state ──────────────────────────────────────────────
let currentLang = 'fr';
let currentPage = 'home';
let registrationsOpen = true;
let currentUser = null;        // { id, email, name, role } when logged in

const TODAY = new Date();
let calMonth = TODAY.getMonth();
let calYear  = TODAY.getFullYear();

// Editable singletons
let siteLogo      = { text: '🎭 LIBER', img: '' };
let googleFormUrl = '';

// Content collections — populated by loadFromSupabase()
let shows         = [];
let members       = [];
let courses       = [];
let videos        = [];
let galleryPhotos = [];

// ── DB ↔ JS field mapping ─────────────────────────────────────
// Database uses snake_case; the existing app code uses camelCase
// for bilingual fields (titleFR, titleDE, captionFR, captionDE).
const _showFromDB  = r => ({ id:r.id, date:r.date, time:r.time, titleFR:r.title_fr, titleDE:r.title_de||'', venue:r.venue, tickets:r.tickets||'#' });
const _showToDB    = j => ({ date:j.date, time:j.time, title_fr:j.titleFR, title_de:j.titleDE, venue:j.venue, tickets:j.tickets });

const _memberFromDB= r => ({ id:r.id, name:r.name, role:r.role||'', bio:r.bio||'', photo:r.photo||'', bg:r.bg||'', email:r.email||'', visible:!!r.visible });
const _memberToDB  = j => ({ name:j.name, role:j.role, bio:j.bio, photo:j.photo, bg:j.bg, email:j.email, visible:j.visible });

// Course bilingual mapping. `level` and `tags` are the legacy single-lang
// fields; new rows use `level_fr/level_de` and `tags_fr/tags_de`.
const _courseFromDB = r => ({
  id: r.id, icon: r.icon || '⭐',
  titleFR: r.title_fr, titleDE: r.title_de || '',
  levelFR: r.level_fr || r.level || '',
  levelDE: r.level_de || r.level || '',
  desc_fr: r.desc_fr || '', desc_de: r.desc_de || '',
  tagsFR:  Array.isArray(r.tags_fr) ? r.tags_fr : (Array.isArray(r.tags) ? r.tags : []),
  tagsDE:  Array.isArray(r.tags_de) ? r.tags_de : (Array.isArray(r.tags) ? r.tags : []),
  color:   r.color || 'var(--liber-yellow)',
  visible: r.visible !== false,   // default true if column missing
});
const _courseToDB = j => ({
  icon: j.icon, title_fr: j.titleFR, title_de: j.titleDE,
  level_fr: j.levelFR, level_de: j.levelDE,
  desc_fr:  j.desc_fr, desc_de:  j.desc_de,
  tags_fr:  j.tagsFR,  tags_de:  j.tagsDE,
  // Keep the legacy `level`/`tags` columns in sync so any old reader still works:
  level: j.levelFR, tags: j.tagsFR,
  color: j.color,
  visible: j.visible !== false,
});

const _videoFromDB = r => ({ id:r.id, url:r.url||'', thumbnail:r.thumbnail||'', titleFR:r.title_fr, titleDE:r.title_de||'', bg:r.bg||'linear-gradient(135deg,#FF3CAC,#784BA0)' });
const _videoToDB   = j => ({ title_fr:j.titleFR, title_de:j.titleDE, url:j.url, thumbnail:j.thumbnail, bg:j.bg });

const _photoFromDB = r => ({ id:r.id, url:r.url||'', captionFR:r.caption_fr, captionDE:r.caption_de||'', cls:r.cls||'', bg:r.bg||'linear-gradient(135deg,#FF3CAC,#784BA0)' });
const _photoToDB   = j => ({ caption_fr:j.captionFR, caption_de:j.captionDE, url:j.url, cls:j.cls, bg:j.bg });

// ── Site content keys (non-i18n singletons stored in site_content) ────
// All start with "__" to distinguish them from i18n keys.
const KEY_LOGO_TEXT        = '__logo_text';
const KEY_LOGO_IMG         = '__logo_img';
const KEY_GOOGLE_FORM_URL  = '__google_form_url';
const KEY_REG_OPEN         = '__registrations_open';
const KEY_CONTACT_ADDRESS  = '__contact_address_val';
const KEY_CONTACT_EMAIL    = '__contact_email_val';
const KEY_CONTACT_PHONE    = '__contact_phone_val';
const KEY_HOME_IMG         = '__home_img';
const KEY_ABOUT_IMG        = '__about_img';
const KEY_COURSES_IMG      = '__courses_img';

// Cache of all rows fetched on load — used to re-apply DOM-targeted
// singletons (contact info, hero images) after the page is rendered.
let _siteContentRows = [];

// ═══════════════════════════════════════════════════════════
// LOAD — Fetch all content from Supabase on startup
// ═══════════════════════════════════════════════════════════
async function loadFromSupabase() {
  try {
    const [showsR, membersR, coursesR, videosR, photosR, contentR] = await Promise.all([
      sb.from('shows')         .select('*').order('date',       { ascending: true }),
      sb.from('members')       .select('*').order('sort_order', { ascending: true }).order('id'),
      sb.from('courses')       .select('*').order('sort_order', { ascending: true }).order('id'),
      sb.from('videos')        .select('*').order('sort_order', { ascending: true }).order('id'),
      sb.from('gallery_photos').select('*').order('sort_order', { ascending: true }).order('id'),
      sb.from('site_content')  .select('*'),
    ]);

    if (showsR.data)   shows         = showsR.data.map(_showFromDB);
    if (membersR.data) members       = membersR.data.map(_memberFromDB);
    if (coursesR.data) courses       = coursesR.data.map(_courseFromDB);
    if (videosR.data)  videos        = videosR.data.map(_videoFromDB);
    if (photosR.data)  galleryPhotos = photosR.data.map(_photoFromDB);

    // Apply site_content rows
    if (contentR.data) {
      _siteContentRows = contentR.data;
      for (const row of contentR.data) {
        _applyContentRow(row);
      }
    }
  } catch (err) {
    console.error('[LIBER] Failed to load from Supabase:', err);
    showToast?.('❌ Erreur de chargement des données', 'error');
  }
}

/** Apply a site_content row to either I18N or a singleton variable. */
function _applyContentRow(row) {
  const { key, value_fr, value_de } = row;
  if (!key) return;
  // Non-i18n singletons (prefix __)
  switch (key) {
    case KEY_LOGO_TEXT:        siteLogo.text     = value_fr || siteLogo.text;      return;
    case KEY_LOGO_IMG:         siteLogo.img      = value_fr || '';                 return;
    case KEY_GOOGLE_FORM_URL:  googleFormUrl     = value_fr || '';                 return;
    case KEY_REG_OPEN:         registrationsOpen = value_fr === 'true';            return;
  }
  // Image-field overrides (handled via render after load)
  if (key.startsWith('__')) return;  // any other __ keys handled below via DOM patch
  // i18n override
  if (typeof I18N !== 'undefined') {
    if (I18N.fr && value_fr) I18N.fr[key] = value_fr;
    if (I18N.de && value_de) I18N.de[key] = value_de;
  }
}

/** Apply the __-prefixed singletons that need DOM patching after first render.
 *  Called from app.js after the initial page render. */
function applyContentSingletons() {
  const findRow = k => _siteContentRows.find(r => r.key === k);
  const setText = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };

  // Contact info
  const addr  = findRow(KEY_CONTACT_ADDRESS); if (addr)  setText('contactAddressVal', addr.value_fr);
  const mail  = findRow(KEY_CONTACT_EMAIL);   if (mail)  setText('contactEmailVal',   mail.value_fr);
  const phone = findRow(KEY_CONTACT_PHONE);   if (phone) setText('contactPhoneVal',   phone.value_fr);

  // Hero/page images — apply via the admin field's onApply handlers
  const applyImg = (boxId, bgId, emojiId, url) => {
    const box = document.getElementById(boxId);
    const bg  = document.getElementById(bgId);
    const em  = document.getElementById(emojiId);
    if (!box || !url) return;
    box.style.backgroundImage    = `url(${url})`;
    box.style.backgroundSize     = 'contain';
    box.style.backgroundRepeat   = 'no-repeat';
    box.style.backgroundPosition = 'center';
    if (bg) bg.style.display = 'none';
    if (em) em.style.display = 'none';
  };
  const home    = findRow(KEY_HOME_IMG);    if (home)    applyImg('homeImgBox',    'homeImgBg',    'homeImgInitials', home.value_fr);
  const about   = findRow(KEY_ABOUT_IMG);   if (about)   applyImg('aboutImgBox',   'aboutImgBg',   'aboutImgEmoji',  about.value_fr);
  const courses = findRow(KEY_COURSES_IMG); if (courses) applyImg('coursesImgBox', 'coursesImgBg', 'coursesImgEmoji',courses.value_fr);
}

/** Helper: get the next upcoming show. */
function getNextShow() {
  return [...shows]
    .sort((a,b) => new Date(a.date) - new Date(b.date))
    .find(s => new Date(s.date) >= TODAY) || null;
}

// ═══════════════════════════════════════════════════════════
// SAVE helpers used by admin.js
// ═══════════════════════════════════════════════════════════

/** Upsert a key into site_content. Returns true on success. */
async function saveContentKey(key, value_fr, value_de = null) {
  const { error } = await sb.from('site_content').upsert(
    { key, value_fr, value_de, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  );
  if (error) { console.error('[saveContentKey]', error); showToast('❌ Sauvegarde échouée: '+error.message, 'error'); return false; }
  return true;
}
