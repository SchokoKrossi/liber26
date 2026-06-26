/**
 * js/router.js
 * SPA page routing, i18n application, scroll-reveal.
 */

/** Pages whose name in the URL hash navigates the SPA. */
const _ROUTE_PAGES = ['home','about','courses','shows','contact','imprint','privacy','admin','48hliberfilm'];

/** Last non-legal page the user was on — used by the back button on imprint/privacy. */
let _lastContentPage = 'home';

/** Navigate back to wherever the user was before hitting imprint/privacy. */
function goBackFromLegal() {
  showPage(_lastContentPage || 'home');
}

/** Switch the visible page, update the URL hash, and re-render dynamic content. */
function showPage(id, opts = {}) {
  // If invoked from an inline onclick on an <a href="#…">, the browser's
  // default link navigation runs AFTER onclick and overwrites the hash we
  // set below. Cancel it. (window.event is the firing event in inline handlers.)
  try {
    const ev = (typeof event !== 'undefined') ? event : null;
    if (ev && ev.preventDefault) ev.preventDefault();
  } catch (_) {}

  // ── Auth gate: only admins can land on #admin. Anyone else gets
  //    bounced to Home and the login modal opens so they know why. ──
  if (id === 'admin' && (typeof currentUser === 'undefined' || currentUser?.role !== 'admin')) {
    console.log('[LIBER] /#admin denied — not logged in as admin');
    id = 'home';
    // Strip any #admin hash so a refresh doesn't loop right back here
    if (location.hash === '#admin') {
      history.replaceState(null, '', location.pathname + location.search);
    }
    // Pop the login modal after the page render settles
    setTimeout(() => { try { openModal('loginModal'); } catch (_) {} }, 150);
  }

  closeMobile();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(id + 'Page');
  if (el) el.classList.add('active');
  // Remember the last content page (not legal/admin/campaign) so the "back"
  // buttons on imprint / privacy / 48hliberfilm can return there.
  if (id !== 'imprint' && id !== 'privacy' && id !== 'admin' && id !== '48hliberfilm') {
    _lastContentPage = id;
  }
  currentPage = id;

  // Highlight nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', (a.getAttribute('onclick') || '').includes(`'${id}'`));
  });

  // Render page-specific dynamic content
  const renderMap = {
    home:    () => { renderNextShowBanner(); renderHomeExtras(); renderLogo(); renderAboutBody(); },
    about:   () => { renderMembers(); renderAboutBody(); },
    courses: renderCourses,
    shows:   () => { renderShows(); renderCalendar(); renderMedia(); renderNextShowBanner(); },
    contact: () => {},
    imprint: () => renderLegalPage('imprint'),
    privacy: () => renderLegalPage('privacy'),
    admin:   () => {
      if (currentUser?.role !== 'admin') return;
      // Pre-render all data CRUD widgets so they're ready when the admin
      // clicks the sidebar (no waiting for re-render on each click).
      renderAdminShows(); renderAdminMembers(); renderAdminCourses(); renderAdminMedia();
      // Default active section = Home. Render its text/image editor.
      renderAdminContent('home', 'adminTextFields_home');
      // Sync the visibility toggles with current state
      if (typeof refreshRegistrationsUI === 'function') refreshRegistrationsUI();
      if (typeof refreshChallengeUI === 'function')     refreshChallengeUI();
      if (typeof refreshNewsletterUI === 'function')    refreshNewsletterUI();
      if (typeof refreshVoucherUI === 'function')       refreshVoucherUI();
    },
  };
  if (renderMap[id]) renderMap[id]();

  // Reflect the page in the URL hash so a refresh keeps us here.
  // Use replaceState to avoid bloating the back-button history.
  if (!opts.skipHash && _ROUTE_PAGES.includes(id)) {
    const want = '#' + id;
    if (location.hash !== want) history.replaceState(null, '', want);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(triggerReveal, 100);
}

/** Read the current URL hash and return a known page id, or null. */
function getPageFromHash() {
  const h = (location.hash || '').slice(1).toLowerCase();
  if (!h) return null;
  if (h === 'login') return null;        // handled by auth.js, not a navigation target
  return _ROUTE_PAGES.includes(h) ? h : null;
}

// Handle the user typing/changing the hash manually
window.addEventListener('hashchange', () => {
  const page = getPageFromHash();
  if (page && page !== currentPage) showPage(page, { skipHash: true });
});

/** Render the About page's multi-paragraph body from a single i18n string.
 *  Paragraphs are separated by one or more blank lines (\n\n). */
function renderAboutBody() {
  const box = document.getElementById('aboutBody');
  if (!box) return;
  const txt = (typeof I18N !== 'undefined' && I18N[currentLang]?.about_body) || '';
  const paras = txt.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  box.innerHTML = paras.map(p => `<p class="reveal visible">${esc(p)}</p>`).join('');
}

/** Apply i18n strings to every [data-i18n] element. */
function applyI18N(lang) {
  currentLang = lang;
  // Persist so the next page load remembers the user's choice
  try { localStorage.setItem('liber_lang', lang); } catch (_) {}

  // Update page-level metadata that should match the active language
  // (helps search engines, social previews, and screen readers).
  document.documentElement.lang = lang;
  const meta = document.getElementById('metaDescription');
  if (meta && I18N[lang]?.site_description) meta.content = I18N[lang].site_description;
  if (I18N[lang]?.site_title) document.title = I18N[lang].site_title;

  // Update lang toggle buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === lang.toUpperCase());
  });

  // Translate every element with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key] !== undefined) el.textContent = I18N[lang][key];
  });

  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang][key] !== undefined) el.placeholder = I18N[lang][key];
  });

  // Re-render dynamic sections so their text updates too
  renderNextShowBanner();
  renderHomeExtras();
  renderLogo();
  renderMembers();
  renderCourses();
  renderShows();
  renderCalendar();
  renderAboutBody();
  if (currentPage === 'imprint') renderLegalPage('imprint');
  if (currentPage === 'privacy') renderLegalPage('privacy');
}

/** Make every .toggle-switch element keyboard-accessible:
 *  role=switch, focusable, aria-checked synced with the .on class,
 *  and SPACE/ENTER triggers a click. Safe to call multiple times — only
 *  upgrades elements that haven't been processed yet. */
function makeTogglesAccessible() {
  document.querySelectorAll('.toggle-switch').forEach(el => {
    if (el.dataset.a11yReady === '1') return;
    el.setAttribute('role', 'switch');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-checked', el.classList.contains('on') ? 'true' : 'false');
    el.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); el.click(); }
    });
    // Sync aria-checked when class changes via JS
    new MutationObserver(() => {
      el.setAttribute('aria-checked', el.classList.contains('on') ? 'true' : 'false');
    }).observe(el, { attributes: true, attributeFilter: ['class'] });
    el.dataset.a11yReady = '1';
  });
}

// Apply on initial load AND every time the admin re-renders (admin dashboard
// rebuilds toggle DOM when course/member lists refresh).
window.addEventListener('load',         makeTogglesAccessible);
document.addEventListener('click', () => setTimeout(makeTogglesAccessible, 0));

/** Trigger .reveal animations for elements in the viewport. */
function triggerReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60)
      el.classList.add('visible');
  });
}

// ── Nav scroll effect ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 30);
  triggerReveal();
});

// ── Mobile menu ───────────────────────────────────────────────
function toggleMobile() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('hamburger')?.classList.remove('open');
  document.getElementById('mobileMenu')?.classList.remove('open');
}

// ── Modals ────────────────────────────────────────────────────
function openModal(id)  {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// ── Toast ─────────────────────────────────────────────────────
let _toastTimer;
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.querySelector('#toastMsg').textContent = msg;
  // Every toast message already carries its own contextual emoji
  // (✅, ❌, 🗑️, 📁, 🎉, 👋, …) — keep the icon span empty so we
  // don't double up.
  const iconEl = t.querySelector('#toastIcon');
  if (iconEl) iconEl.textContent = '';
  t.className = `toast ${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ── ESC key ───────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    closeMobile();
  }
});
