/**
 * js/app.js — Page renderers & contact/newsletter handlers
 */

// ── HOME ──────────────────────────────────────────────────────
function renderNextShowBanner() {
  const next = getNextShow();
  const nameEl = document.getElementById('nextShowName');
  const dateEl = document.getElementById('nextShowDate');
  const venueEl = document.getElementById('nextShowVenue');
  const linkEl  = document.getElementById('nextShowLink');

  if (!next) {
    if (nameEl) nameEl.textContent = currentLang === 'fr' ? 'Aucun spectacle prévu' : 'Keine Aufführung geplant';
    if (dateEl) dateEl.textContent = '—';
    return;
  }

  const d = new Date(next.date);
  const locale = currentLang === 'fr' ? 'fr-CH' : 'de-CH';
  if (nameEl)  nameEl.textContent  = currentLang === 'fr' ? next.titleFR : next.titleDE;
  if (dateEl)  dateEl.textContent  = d.toLocaleDateString(locale, { day:'numeric', month:'long', year:'numeric' });
  if (venueEl) venueEl.textContent = next.venue;
  if (linkEl)  linkEl.href         = next.tickets || '#';

  document.getElementById('regOpenBanner')?.classList.toggle('hidden', !registrationsOpen);
}

function renderHomeExtras() {
  ['home_extra1','home_extra2','home_extra3'].forEach(key => {
    const el = document.getElementById(key);
    if (el) el.textContent = I18N[currentLang][key] || '';
  });
}

// ── LOGO ──────────────────────────────────────────────────────
// Render: [logo image] [LIBER text]. The image defaults to the bundled
// images/logo.jpg and can be overridden via the admin Logo Image field.
function renderLogo() {
  const imgSrc = siteLogo.img || 'images/logo.jpg';
  const text   = (siteLogo.text || 'LIBER').replace(/^🎭\s*/, ''); // strip stale emoji prefix
  document.querySelectorAll('.nav-logo, .footer-logo').forEach(el => {
    const isFooter = el.classList.contains('footer-logo');
    const size = isFooter ? 64 : 46;
    el.innerHTML =
      `<img src="${imgSrc}" alt="LIBER logo"
            style="height:${size}px;width:${size}px;object-fit:contain;
                   vertical-align:middle;border-radius:10px;margin-right:.55rem" />` +
      `<span class="logo-text">${text}</span>`;
  });
}

// ── ABOUT — Members grid ──────────────────────────────────────
function renderMembers() {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;
  const list = currentUser ? members : members.filter(m => m.visible);

  grid.innerHTML = list.map(m => {
    // Photo or gradient placeholder with initials
    const initials = m.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    // Use object-fit:contain so portrait photos aren't cropped — the
    // gradient background fills any leftover space and stays on-brand.
    const avatarInner = m.photo
      ? `<div style="background:${m.bg};position:absolute;inset:0"></div>
         <img src="${m.photo}" alt="${m.name}" style="width:100%;height:100%;object-fit:contain;position:absolute;inset:0;padding:6px" />`
      : `<div style="background:${m.bg};position:absolute;inset:0"></div>
         <span style="position:relative;z-index:1;font-family:var(--font-display);font-size:2.2rem;color:rgba(255,255,255,.9)">${initials}</span>`;

    return `
    <div class="member-card">
      <div class="member-avatar" style="position:relative;overflow:hidden">
        ${avatarInner}
      </div>
      <div class="member-info">
        <div class="member-name">${m.name}</div>
        <div class="member-role">${m.role}</div>
        <div class="member-bio">${m.bio}</div>
      </div>
      ${currentUser ? `
      <div class="member-toggle">
        <span class="toggle-label">${I18N[currentLang].visibility_label}</span>
        <div class="toggle-switch ${m.visible?'on':''}" onclick="toggleMemberVisibility(${m.id})"></div>
      </div>` : ''}
    </div>`;
  }).join('');
}

async function toggleMemberVisibility(id, isAdmin=false) {
  const m = members.find(x=>x.id===id); if (!m) return;
  if (!isAdmin && currentUser?.role !== 'admin' && currentUser?.email !== m.email) {
    showToast('❌ Vous ne pouvez modifier que votre propre profil.', 'error'); return;
  }
  m.visible = !m.visible;
  const { error } = await sb.from('members').update({ visible: m.visible }).eq('id', id);
  if (error) { m.visible = !m.visible; showToast('❌ '+error.message, 'error'); return; }
  renderMembers();
  if (isAdmin) renderAdminMembers();
  showToast('✅ Visibilité mise à jour!', 'success');
}

// ── COURSES ───────────────────────────────────────────────────
function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  const escHtml = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Split a description on blank lines into multiple <p> tags.
  const descToHtml = txt => (txt||'')
    .split(/\n{2,}/)
    .map(p => p.trim()).filter(Boolean)
    .map(p => `<p class="course-desc">${escHtml(p)}</p>`)
    .join('');

  // Public visitors see only visible courses; admins see all.
  const list = currentUser ? courses : courses.filter(c => c.visible !== false);
  grid.innerHTML = list.map(c => `
    <div class="course-card card">
      <div class="course-header" style="border-bottom:3px solid ${c.color}">
        <div class="course-icon">${c.icon}</div>
        <div>
          <div class="course-title">${currentLang==='fr' ? c.titleFR : c.titleDE}</div>
          <div class="course-level">${currentLang==='fr' ? (c.levelFR||'') : (c.levelDE||'')}</div>
        </div>
      </div>
      <div class="course-body">
        ${descToHtml(currentLang==='fr' ? c.desc_fr : c.desc_de)}
        <div class="course-meta">${(currentLang==='fr' ? (c.tagsFR||[]) : (c.tagsDE||[])).map(t=>`<span class="course-tag">${t}</span>`).join('')}</div>
      </div>
    </div>`).join('');

  // Registration form / Google Form embed
  const regOpenEl   = document.getElementById('regOpen');
  const regClosedEl = document.getElementById('regClosed');
  const formArea    = document.getElementById('googleFormArea');

  if (regOpenEl)   regOpenEl.classList.toggle('hidden',  !registrationsOpen);
  if (regClosedEl) regClosedEl.classList.toggle('hidden', registrationsOpen);

  if (formArea && registrationsOpen) {
    if (googleFormUrl) {
      formArea.innerHTML = `<iframe src="${googleFormUrl}" width="100%" height="700"
        frameborder="0" marginheight="0" marginwidth="0"
        style="border-radius:12px;margin-top:1.5rem"
        loading="lazy">Chargement…</iframe>`;
    } else {
      formArea.innerHTML = `
        <div class="google-form-placeholder">
          <div style="font-size:3.5rem;margin-bottom:1rem">📝</div>
          <p style="color:rgba(255,255,255,.55);max-width:440px;line-height:1.7" data-i18n="form_placeholder">
            Remplacez cette zone par une balise &lt;iframe&gt; pointant vers votre Google Form,
            ou saisissez l'URL dans le tableau de bord admin (Cours → URL Google Form).
          </p>
          <code style="display:block;background:rgba(255,255,255,.08);padding:.6rem 1rem;border-radius:10px;font-size:.78rem;color:var(--teal);margin-top:1rem;max-width:500px">
            https://docs.google.com/forms/d/YOUR_FORM_ID/viewform?embedded=true
          </code>
        </div>`;
    }
  }
}

// ── SHOWS ─────────────────────────────────────────────────────
function renderShows() {
  const list = document.getElementById('showsList');
  if (!list) return;
  const future = [...shows].sort((a,b)=>new Date(a.date)-new Date(b.date))
                            .filter(s=>new Date(s.date)>=TODAY);
  const months = I18N[currentLang].month_names;
  list.innerHTML = future.map(s => {
    const d = new Date(s.date);
    return `
    <div class="show-item">
      <div class="show-date-box">
        <div class="day">${d.getDate()}</div>
        <div class="month">${months[d.getMonth()].slice(0,3).toUpperCase()}</div>
      </div>
      <div class="show-details">
        <div class="show-name">${currentLang==='fr'?s.titleFR:s.titleDE}</div>
        <div class="show-venue">📍 ${s.venue}</div>
        <div class="show-time">🕗 ${s.time}</div>
      </div>
      <a class="btn btn-primary" href="${s.tickets}" target="_blank" rel="noopener">🎟️</a>
    </div>`;
  }).join('') || `<p style="color:rgba(255,255,255,0.4);text-align:center;padding:2rem;">${I18N[currentLang].no_shows || 'Aucun spectacle à venir.'}</p>`;
}

// ── CALENDAR ──────────────────────────────────────────────────
function renderCalendar() {
  const grid  = document.getElementById('calendarGrid');
  const label = document.getElementById('calMonthLabel');
  if (!grid) return;
  const months   = I18N[currentLang].month_names;
  const dayNames = I18N[currentLang].day_names;
  if (label) label.textContent = `${months[calMonth]} ${calYear}`;

  const showKeys = new Set(shows.map(s => {
    const d=new Date(s.date);
    return `${d.getFullYear()}-${String(d.getMonth()).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }));
  const firstDay = new Date(calYear, calMonth, 1);
  let offset = firstDay.getDay(); offset = offset===0?6:offset-1;
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const daysInPrev  = new Date(calYear, calMonth, 0).getDate();

  let html = dayNames.map(d=>`<div class="cal-day-name">${d}</div>`).join('');
  for (let i=offset-1;i>=0;i--) html+=`<div class="cal-day other-month">${daysInPrev-i}</div>`;
  for (let d=1;d<=daysInMonth;d++) {
    const isToday = d===TODAY.getDate()&&calMonth===TODAY.getMonth()&&calYear===TODAY.getFullYear();
    const hasShow = showKeys.has(`${calYear}-${String(calMonth).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
    let cls='cal-day'; if(isToday) cls+=' today'; if(hasShow) cls+=' has-show';
    html+=`<div class="${cls}" title="${hasShow?'🎭 Spectacle':''}">${d}</div>`;
  }
  const pad=(offset+daysInMonth)%7===0?0:7-(offset+daysInMonth)%7;
  for(let d=1;d<=pad;d++) html+=`<div class="cal-day other-month">${d}</div>`;
  grid.innerHTML=html;
}

function prevMonth(){if(--calMonth<0){calMonth=11;calYear--;}renderCalendar();}
function nextMonth(){if(++calMonth>11){calMonth=0;calYear++;}renderCalendar();}

// ── MEDIA ─────────────────────────────────────────────────────
function renderMedia() { _renderVideos(); _renderGallery(); }

function _renderVideos() {
  const vg = document.getElementById('videoGrid'); if(!vg) return;
  vg.innerHTML = videos.map(v => {
    const title      = currentLang==='fr' ? v.titleFR : v.titleDE;
    const safeThumb  = v.thumbnail ? v.thumbnail.replace(/"/g, '%22') : '';
    const thumbStyle = safeThumb ? `background:url("${safeThumb}") center/cover` : `background:${v.bg}`;
    return `
    <div class="video-thumb" data-video-url="${v.url ? encodeURI(v.url) : ''}" data-video-title="${v.url ? '' : title}">
      <div class="video-thumb-img" style="${thumbStyle}">
        ${!v.thumbnail ? `<span style="font-size:4rem;position:relative;z-index:1">🎭</span>` : ''}
        <div class="play-btn"></div>
      </div>
      <div class="video-caption">${title}</div>
    </div>`;
  }).join('');

  vg.querySelectorAll('.video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const url   = thumb.getAttribute('data-video-url');
      const label = thumb.querySelector('.video-caption').textContent;
      if (url) window.open(url, '_blank', 'noopener');
      else showToast(`▶️ ${label} — ajoutez une URL dans l'admin`, 'success');
    });
  });
}

function _renderGallery() {
  const pg = document.getElementById('photoGrid'); if(!pg) return;
  const esc = s => (s||'').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  pg.innerHTML = galleryPhotos.map(p => {
    const cap = currentLang==='fr' ? p.captionFR : p.captionDE;
    // <img> renders at the photo's natural aspect ratio (no crop).
    // For photos without a URL we show a placeholder block with the gradient.
    const inner = p.url
      ? `<img src="${esc(p.url)}" alt="${esc(cap)}" loading="lazy" />`
      : `<div style="background:${p.bg};aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;font-size:2.5rem">📸</div>`;
    return `
    <div class="photo-item" title="${esc(cap)}">
      ${inner}
      <div class="photo-overlay"><span>${esc(cap)}</span></div>
    </div>`;
  }).join('');
}

// ── NEWSLETTER ────────────────────────────────────────────────
// Subscribes the email into the public.newsletter_subscribers table.
// Admins can view + export the full list from the Contact admin section.
async function submitNewsletter() {
  const input = document.getElementById('newsletterEmail');
  const email = input?.value.trim().toLowerCase();
  const re    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !re.test(email)) {
    showToast(I18N[currentLang].newsletter_error || '❌ Email invalide', 'error');
    return;
  }

  try {
    const { error } = await sb.from('newsletter_subscribers')
      .insert({ email });

    // 23505 = unique_violation — already subscribed. Treat as success
    // to avoid revealing who's on the list.
    if (error && error.code !== '23505') {
      console.error('[newsletter] insert failed:', error);
      showToast('❌ ' + (error.message || 'Erreur'), 'error');
      return;
    }
  } catch (err) {
    console.error('[newsletter] unexpected error:', err);
    showToast('❌ Erreur réseau', 'error');
    return;
  }

  showToast(I18N[currentLang].newsletter_success, 'success');
  if (input) input.value = '';
}

// ── LEGAL PAGES ───────────────────────────────────────────────
function renderLegalPage(type) {
  const el = document.getElementById(type + 'Body');
  if (el) el.innerHTML = I18N[currentLang][type + '_body'] || '';
  const titleEl = document.getElementById(type + 'Title');
  if (titleEl) titleEl.textContent = I18N[currentLang][type + '_title'] || '';
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('load', async () => {
  await loadFromSupabase();   // fetch all content from the database first
  await restoreSession();     // restore login state if any
  // Restore the user's last chosen language (defaults to French)
  let savedLang = 'fr';
  try {
    const v = localStorage.getItem('liber_lang');
    if (v === 'fr' || v === 'de') savedLang = v;
  } catch (_) {}
  applyI18N(savedLang);
  // Restore the page from the URL hash (e.g. #courses) so refreshing
  // a deep page doesn't bounce the user back to Home. Falls back to Home.
  const initialPage = getPageFromHash() || 'home';
  showPage(initialPage, { skipHash: true });
  applyContentSingletons();   // re-apply contact info & hero images from DB
  setTimeout(triggerReveal, 200);
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if(e.target===m) closeModal(m.id); });
  });
});
