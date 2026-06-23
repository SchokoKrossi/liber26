/**
 * js/admin.js — Full admin dashboard
 *
 * Every save directly patches:
 *  1. The live DOM (the public page)
 *  2. The I18N store (so lang-switch keeps the edited value)
 *  3. The state variable (shows / members / courses / videos / photos)
 */

// ═══════════════════════════════════════════════════════════
// FIELD SCHEMA  — maps admin inputs → live DOM selectors
// ═══════════════════════════════════════════════════════════
const ADMIN_PAGES = {
  home: {
    label:'🏠 Accueil',
    fields:[
      { key:'home_eyebrow',   label:'Badge eyebrow',           type:'text',     i18nFR:'hero_eyebrow',  i18nDE:'hero_eyebrow',  targets:[{sel:'[data-i18n="hero_eyebrow"]',  prop:'textContent'}] },
      { key:'home_word1',     label:'Titre ligne 1',           type:'text',     i18nFR:'hero_word1',    i18nDE:'hero_word1',    targets:[{sel:'.hero-title .word1',          prop:'textContent'}] },
      { key:'home_word2',     label:'Titre ligne 2',           type:'text',     i18nFR:'hero_word2',    i18nDE:'hero_word2',    targets:[{sel:'.hero-title .word2',          prop:'textContent'}] },
      { key:'home_desc',      label:'Texte descriptif hero',   type:'textarea', i18nFR:'hero_desc',     i18nDE:'hero_desc',     targets:[{sel:'[data-i18n="hero_desc"]',     prop:'textContent'}] },
      { key:'home_reg_title', label:'Bannière inscription — Titre',  type:'text', i18nFR:'reg_open_title', i18nDE:'reg_open_title', targets:[{sel:'[data-i18n="reg_open_title"]',prop:'textContent'}] },
      { key:'home_reg_sub',   label:'Bannière inscription — Sous-titre', type:'text', i18nFR:'reg_open_sub',   i18nDE:'reg_open_sub',  targets:[{sel:'[data-i18n="reg_open_sub"]',  prop:'textContent'}] },
      { key:'home_extra1',    label:'Texte extra 1 (sous bannière)', type:'text', i18nFR:'home_extra1',  i18nDE:'home_extra1',   targets:[{sel:'#home_extra1',               prop:'textContent'}] },
      { key:'home_extra2',    label:'Texte extra 2',           type:'text',     i18nFR:'home_extra2',   i18nDE:'home_extra2',   targets:[{sel:'#home_extra2',               prop:'textContent'}] },
      { key:'home_extra3',    label:'Texte extra 3',           type:'text',     i18nFR:'home_extra3',   i18nDE:'home_extra3',   targets:[{sel:'#home_extra3',               prop:'textContent'}] },
      { key:'stat_num_years',   label:'Statistique — Nombre (années)',  type:'text', i18nFR:'stat_num_years',   i18nDE:'stat_num_years',   targets:[{sel:'#statNumYears',   prop:'textContent'}] },
      { key:'stat_num_shows',   label:'Statistique — Nombre (spectacles)', type:'text', i18nFR:'stat_num_shows',   i18nDE:'stat_num_shows',   targets:[{sel:'#statNumShows',   prop:'textContent'}] },
      { key:'stat_num_members', label:'Statistique — Nombre (membres)', type:'text', i18nFR:'stat_num_members', i18nDE:'stat_num_members', targets:[{sel:'#statNumMembers', prop:'textContent'}] },
      { key:'stat_years',    label:'Statistique — Label années',    type:'text', i18nFR:'stat_years',   i18nDE:'stat_years',    targets:[{sel:'[data-i18n="stat_years"]',   prop:'textContent'}] },
      { key:'stat_shows',    label:'Statistique — Label spectacles', type:'text', i18nFR:'stat_shows',   i18nDE:'stat_shows',    targets:[{sel:'[data-i18n="stat_shows"]',   prop:'textContent'}] },
      { key:'stat_members',  label:'Statistique — Label membres',   type:'text', i18nFR:'stat_members', i18nDE:'stat_members',  targets:[{sel:'[data-i18n="stat_members"]', prop:'textContent'}] },
      { key:'home_img', label:'Image illustrative (comme About Us)', type:'image',
        hint:'Affiché dans le bloc image à droite du hero, style identique à la page À propos.',
        onApply(url) {
          const box = document.getElementById('homeImgBox');
          const bg  = document.getElementById('homeImgBg');
          const em  = document.getElementById('homeImgInitials');
          if (!box) return;
          if (url) {
            // Apply to the box so overflow:hidden clips it correctly
            box.style.backgroundImage    = `url(${url})`;
            box.style.backgroundSize     = 'contain';
            box.style.backgroundRepeat   = 'no-repeat';
            box.style.backgroundPosition = 'center';
            // Hide the inner gradient div and emoji
            if (bg) bg.style.display = 'none';
            if (em) em.style.display = 'none';
          } else {
            box.style.backgroundImage = '';
            if (bg) bg.style.display = '';
            if (em) em.style.display = '';
          }
        }
      },
      // Logo image / text fields are intentionally NOT exposed here —
      // the LIBER logo + text are baked into images/logo.jpg and renderLogo().

      // ─── Bannière (générique, page d'accueil) ─────────────────────
      { key:'challenge_label', label:'Bannière — Étiquette (petite ligne au-dessus du titre)',  type:'text',
        i18nFR:'challenge_label', i18nDE:'challenge_label',
        targets:[{sel:'[data-i18n="challenge_label"]', prop:'textContent'}] },
      { key:'challenge_title', label:'Bannière — Titre',  type:'text',
        i18nFR:'challenge_title', i18nDE:'challenge_title',
        targets:[{sel:'[data-i18n="challenge_title"]', prop:'textContent'}] },
      { key:'challenge_text',  label:'Bannière — Texte (plusieurs paragraphes — séparez par une ligne vide)',
        type:'textarea', rows:6,
        i18nFR:'challenge_text', i18nDE:'challenge_text',
        targets:[{sel:'[data-i18n="challenge_text"]', prop:'textContent'}] },
      { key:'challenge_btn',   label:'Bannière — Texte du bouton', type:'text',
        i18nFR:'challenge_btn', i18nDE:'challenge_btn',
        targets:[{sel:'[data-i18n="challenge_btn"]', prop:'textContent'}] },
      { key:'challenge_url',   label:'Bannière — URL du bouton', type:'text', singleLang:true,
        hint:"Collez l'URL ouverte par le bouton (Google Form, page externe, etc.).",
        onApply(url) { challengeUrl = url; refreshChallengeUI(); } },

      // ─── Bannière bons cadeaux (page d'accueil + spectacles) ─────
      { key:'voucher_label', label:'Bons cadeaux — Étiquette',  type:'text',
        i18nFR:'voucher_label', i18nDE:'voucher_label',
        targets:[{sel:'[data-i18n="voucher_label"]', prop:'textContent'}] },
      { key:'voucher_title', label:'Bons cadeaux — Titre',      type:'text',
        i18nFR:'voucher_title', i18nDE:'voucher_title',
        targets:[{sel:'[data-i18n="voucher_title"]', prop:'textContent'}] },
      { key:'voucher_text',  label:'Bons cadeaux — Texte (plusieurs paragraphes — séparez par une ligne vide)',
        type:'textarea', rows:6,
        i18nFR:'voucher_text', i18nDE:'voucher_text',
        targets:[{sel:'[data-i18n="voucher_text"]', prop:'textContent'}] },
      { key:'voucher_btn',   label:'Bons cadeaux — Texte du bouton', type:'text',
        i18nFR:'voucher_btn', i18nDE:'voucher_btn',
        targets:[{sel:'[data-i18n="voucher_btn"]', prop:'textContent'}] },
      { key:'voucher_url',   label:'Bons cadeaux — URL du bouton', type:'text', singleLang:true,
        hint:"URL ouverte par le bouton (page YesTicket des bons cadeaux, etc.).",
        onApply(url) { voucherUrl = url; refreshVoucherUI(); } },
    ]
  },
  about: {
    label:'👥 À propos',
    fields:[
      { key:'about_title',      label:'Titre de la section',   type:'text',     i18nFR:'about_title',      i18nDE:'about_title',      targets:[{sel:'[data-i18n="about_title"]',     prop:'textContent'}] },
      { key:'about_body',       label:'Texte (plusieurs paragraphes — séparez par une ligne vide)',
        type:'textarea', rows:10, i18nFR:'about_body', i18nDE:'about_body',
        hint:'Tapez tout le texte de "À propos". Pour créer un nouveau paragraphe, laissez une ligne vide.',
        onApply() { renderAboutBody(); } },
      { key:'members_title',    label:'Titre section membres', type:'text',     i18nFR:'members_title',    i18nDE:'members_title',    targets:[{sel:'[data-i18n="members_title"]',   prop:'textContent'}] },
      { key:'members_subtitle', label:'Sous-titre membres',    type:'text',     i18nFR:'members_subtitle', i18nDE:'members_subtitle', targets:[{sel:'[data-i18n="members_subtitle"]',prop:'textContent'}] },
      { key:'about_img', label:'Image illustrative (boîte About Us)', type:'image',
        hint:'Remplace le fond coloré. Laissez vide pour revenir au dégradé.',
        onApply(url) {
          const box = document.getElementById('aboutImgBox');
          const bg  = document.getElementById('aboutImgBg');
          const em  = document.getElementById('aboutImgEmoji');
          if (!box) return;
          if (url) {
            box.style.backgroundImage    = `url(${url})`;
            box.style.backgroundSize     = 'contain';
            box.style.backgroundRepeat   = 'no-repeat';
            box.style.backgroundPosition = 'center';
            if (bg) bg.style.display = 'none';
            if (em) em.style.display = 'none';
          } else {
            box.style.backgroundImage = '';
            if (bg) bg.style.display = '';
            if (em) em.style.display = '';
          }
        }
      },
    ]
  },
  courses: {
    label:'📚 Cours',
    fields:[
      { key:'courses_title',    label:'Titre de la page',       type:'text',     i18nFR:'courses_title',    i18nDE:'courses_title',    targets:[{sel:'[data-i18n="courses_title"]',   prop:'textContent'}] },
      { key:'courses_subtitle', label:'Sous-titre',             type:'textarea', i18nFR:'courses_subtitle', i18nDE:'courses_subtitle', targets:[{sel:'[data-i18n="courses_subtitle"]',prop:'textContent'}] },
      { key:'reg_section_title',label:'Inscriptions ouvertes — Titre',type:'text',  i18nFR:'reg_section_title',i18nDE:'reg_section_title',targets:[{sel:'[data-i18n="reg_section_title"]',prop:'textContent'}] },
      { key:'reg_section_desc', label:'Inscriptions ouvertes — Texte',type:'textarea',i18nFR:'reg_section_desc',i18nDE:'reg_section_desc',targets:[{sel:'[data-i18n="reg_section_desc"]', prop:'textContent'}] },
      { key:'reg_closed_title', label:'Inscriptions fermées — Titre', type:'text',
        i18nFR:'reg_closed_title', i18nDE:'reg_closed_title',
        targets:[{sel:'[data-i18n="reg_closed_title"]', prop:'textContent'}] },
      { key:'reg_closed_desc',  label:'Inscriptions fermées — Texte', type:'textarea', rows:3,
        i18nFR:'reg_closed_desc', i18nDE:'reg_closed_desc',
        targets:[{sel:'[data-i18n="reg_closed_desc"]', prop:'textContent'}] },
      { key:'google_form_url',  label:'URL Google Form (inscription)', type:'text', singleLang:true,
        hint:'Collez ici l\'URL de votre Google Form (viewform?embedded=true). Laissez vide pour afficher le placeholder.',
        onApply(url) { googleFormUrl = url.trim(); renderCourses(); }
      },
      { key:'courses_img', label:'Image illustrative (style About Us)', type:'image',
        hint:'Affiché dans le bloc image à droite du titre, style identique à la page À propos.',
        onApply(url) {
          const box = document.getElementById('coursesImgBox');
          const bg  = document.getElementById('coursesImgBg');
          const em  = document.getElementById('coursesImgEmoji');
          if (!box) return;
          if (url) {
            box.style.backgroundImage    = `url(${url})`;
            box.style.backgroundSize     = 'contain';
            box.style.backgroundRepeat   = 'no-repeat';
            box.style.backgroundPosition = 'center';
            if (bg) bg.style.display = 'none';
            if (em) em.style.display = 'none';
          } else {
            box.style.backgroundImage = '';
            if (bg) bg.style.display = '';
            if (em) em.style.display = '';
          }
        }
      },
    ]
  },
  shows: {
    label:'🎭 Spectacles',
    fields:[
      { key:'shows_title',        label:'Titre de la page',                type:'text',     i18nFR:'shows_title',         i18nDE:'shows_title',         targets:[{sel:'[data-i18n="shows_title"]',        prop:'textContent'}] },
      { key:'shows_subtitle',     label:'Sous-titre',                      type:'textarea', i18nFR:'shows_subtitle',      i18nDE:'shows_subtitle',      targets:[{sel:'[data-i18n="shows_subtitle"]',     prop:'textContent'}] },
      { key:'shows_upcoming',     label:'Titre "À venir"',                 type:'text',     i18nFR:'upcoming_title',      i18nDE:'upcoming_title',      targets:[{sel:'[data-i18n="upcoming_title"]',     prop:'textContent'}] },
      { key:'shows_videos_title', label:'Titre section vidéos',            type:'text',     i18nFR:'videos_title',        i18nDE:'videos_title',        targets:[{sel:'[data-i18n="videos_title"]',       prop:'textContent'}] },
      { key:'shows_gallery_title',label:'Titre galerie photos',            type:'text',     i18nFR:'gallery_title',       i18nDE:'gallery_title',       targets:[{sel:'[data-i18n="gallery_title"]',      prop:'textContent'}] },
    ]
  },
  contact: {
    label:'✉️ Contact',
    fields:[
      { key:'contact_pill',        label:'Badge "Contact" (petite étiquette)', type:'text',
        i18nFR:'contact_pill', i18nDE:'contact_pill',
        targets:[{sel:'[data-i18n="contact_pill"]', prop:'textContent'}] },
      { key:'contact_title',       label:'Titre de la page',          type:'text',     i18nFR:'contact_title',      i18nDE:'contact_title',      targets:[{sel:'[data-i18n="contact_title"]', prop:'textContent'}] },
      { key:'contact_desc',        label:'Texte introductif (sous le titre)', type:'textarea', rows:3,
        i18nFR:'contact_desc',       i18nDE:'contact_desc',       targets:[{sel:'[data-i18n="contact_desc"]',  prop:'textContent'}] },
      { key:'follow_us',           label:'Titre "Suivez-nous"', type:'text',
        i18nFR:'follow_us', i18nDE:'follow_us',
        targets:[{sel:'[data-i18n="follow_us"]', prop:'textContent'}] },
      { key:'contact_address_val', label:'Adresse (valeur)',          type:'text',     singleLang:true,             targets:[{sel:'#contactAddressVal',                               prop:'textContent'}] },
      { key:'contact_email_val',   label:'Email de contact',          type:'text',     singleLang:true,             targets:[{sel:'#contactEmailVal',                                 prop:'textContent'}] },
      { key:'newsletter_title',    label:'Newsletter — Titre',        type:'text',     i18nFR:'newsletter_title',   i18nDE:'newsletter_title',   targets:[{sel:'[data-i18n="newsletter_title"]', prop:'textContent'}] },
      { key:'newsletter_desc',     label:'Newsletter — Description',  type:'textarea', i18nFR:'newsletter_desc',    i18nDE:'newsletter_desc',    targets:[{sel:'[data-i18n="newsletter_desc"]',  prop:'textContent'}] },
      { key:'form_title',          label:'Bloc "Écrivez-nous" — Titre', type:'text',
        i18nFR:'form_title', i18nDE:'form_title',
        targets:[{sel:'[data-i18n="form_title"]', prop:'textContent'}] },
      { key:'contact_write_intro', label:'Bloc "Écrivez-nous" — Texte d\'introduction', type:'textarea', rows:3,
        i18nFR:'contact_write_intro', i18nDE:'contact_write_intro',
        targets:[{sel:'[data-i18n="contact_write_intro"]', prop:'textContent'}] },
    ]
  },
};

// ═══════════════════════════════════════════════════════════
// SECTION SWITCHING
// Each sidebar section can host BOTH a data CRUD widget AND a
// texts/images editor (rendered into adminTextFields_<page>).
// ═══════════════════════════════════════════════════════════
//
// Mapping: sidebar id  →  { data render, ADMIN_PAGES key for texts }
const _SECTION_MAP = {
  home:    { data: null,                content: 'home',    container: 'adminTextFields_home'    },
  members: { data: renderAdminMembers,  content: 'about',   container: 'adminTextFields_about'   },
  shows:   { data: renderAdminShows,    content: 'shows',   container: 'adminTextFields_shows'   },
  courses: { data: renderAdminCourses,  content: 'courses', container: 'adminTextFields_courses' },
  media:   { data: renderAdminMedia,    content: null,      container: null                      },
  contact: { data: renderAdminSubscribers, content: 'contact', container: 'adminTextFields_contact' },
};

function adminSection(id, btn) {
  document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('adminSec_'+id)?.classList.add('active');
  if (btn) btn.classList.add('active');
  const cfg = _SECTION_MAP[id]; if (!cfg) return;
  if (typeof cfg.data === 'function') cfg.data();
  if (cfg.content && cfg.container)   renderAdminContent(cfg.content, cfg.container);
}

// ═══════════════════════════════════════════════════════════
// CONTENT EDITOR
// ═══════════════════════════════════════════════════════════
function renderAdminContent(page, containerId) {
  containerId = containerId || 'adminContentFields';   // back-compat fallback
  const container = document.getElementById(containerId); if(!container) return;
  const pageDef = ADMIN_PAGES[page]; if(!pageDef){ container.innerHTML=''; return; }
  container.innerHTML = pageDef.fields.map(f=>_buildCard(f)).join('');
  pageDef.fields.forEach(f=>_populateField(f));
}

function _buildCard(f) {
  if (f.type==='image') return `
    <div class="admin-card">
      <h4>${f.label}</h4>
      ${f.hint?`<p style="font-size:.8rem;color:rgba(255,255,255,.4);margin-bottom:.8rem">${f.hint}</p>`:''}
      <div class="admin-img-preview" id="imgPrev_${f.key}">
        <div class="admin-img-overlay">📷 Aperçu</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr auto;gap:.6rem;align-items:end;margin-top:.8rem">
        <div class="lang-field">
          <label>URL de l'image</label>
          <input type="url" id="imgUrl_${f.key}" placeholder="https://…"
            oninput="_prevImg('${f.key}',this.value)" />
        </div>
        <label style="cursor:pointer">
          <span class="admin-save-btn" style="display:block;text-align:center">📁 Fichier</span>
          <input type="file" accept="image/*" style="display:none"
            onchange="_fileToUrl('${f.key}',this)" />
        </label>
      </div>
      <div style="display:flex;gap:.6rem;margin-top:.8rem;flex-wrap:wrap">
        <button class="admin-save-btn" onclick="_saveField('${f.key}')">💾 Appliquer</button>
        <button onclick="_clearImg('${f.key}')"
          style="background:none;border:none;color:rgba(255,255,255,.35);cursor:pointer;font-size:.82rem">✕ Supprimer</button>
      </div>
    </div>`;

  const isTA = f.type==='textarea';
  const tag  = isTA ? 'textarea' : 'input';
  // Optional `rows` hint on the field controls textarea height (e.g. 8 for multi-paragraph).
  const taExtra = isTA && f.rows ? ` rows="${f.rows}"` : (isTA ? ' rows="3"' : '');
  const attr = isTA ? taExtra : 'type="text"';

  if (f.singleLang || (!f.i18nFR && !f.i18nDE)) return `
    <div class="admin-card">
      <h4>${f.label}</h4>
      ${f.hint?`<p style="font-size:.8rem;color:rgba(255,255,255,.4);margin-bottom:.6rem">${f.hint}</p>`:''}
      <div class="lang-field">
        <${tag} id="fieldFR_${f.key}" ${attr} placeholder="Valeur…"></${tag}>
      </div>
      <button class="admin-save-btn" onclick="_saveField('${f.key}')" style="margin-top:.6rem">💾 Sauvegarder</button>
    </div>`;

  return `
    <div class="admin-card">
      <h4>${f.label}</h4>
      ${f.hint?`<p style="font-size:.8rem;color:rgba(255,255,255,.4);margin-bottom:.6rem">${f.hint}</p>`:''}
      <div class="bilingual-row">
        <div class="lang-field"><label>🇫🇷 Français</label>
          <${tag} id="fieldFR_${f.key}" ${attr} placeholder="Version française…"></${tag}></div>
        <div class="lang-field"><label>🇩🇪 Deutsch</label>
          <${tag} id="fieldDE_${f.key}" ${attr} placeholder="Deutsche Version…"></${tag}></div>
      </div>
      <button class="admin-save-btn" onclick="_saveField('${f.key}')" style="margin-top:.6rem">💾 Sauvegarder</button>
    </div>`;
}

function _populateField(f) {
  if (f.type==='image') {
    // Special-case single-lang fields stored outside the i18n bundle
    if (f.key==='google_form_url'){ const inp=document.getElementById('fieldFR_'+f.key); if(inp) inp.value=googleFormUrl||''; return; }
    if (f.key==='challenge_url'){   const inp=document.getElementById('fieldFR_'+f.key); if(inp) inp.value=challengeUrl||'';  return; }
    if (f.key==='voucher_url'){     const inp=document.getElementById('fieldFR_'+f.key); if(inp) inp.value=voucherUrl||'';    return; }
    const inp=document.getElementById('imgUrl_'+f.key); if(!inp) return;
    if (f.targets?.[0]) {
      const el=document.querySelector(f.targets[0].sel);
      if (el) { const bg=el.style.backgroundImage; const url=bg?bg.replace(/^url\(["']?/,'').replace(/["']?\)$/,''):''; if(url&&!url.startsWith('linear')) { inp.value=url; _prevImg(f.key,url); } }
    }
    return;
  }
  const frEl=document.getElementById('fieldFR_'+f.key);
  const deEl=document.getElementById('fieldDE_'+f.key);
  if (f.singleLang||(!f.i18nFR&&!f.i18nDE)) {
    // Read from DOM target
    if (frEl && f.targets?.[0]) { const el=document.querySelector(f.targets[0].sel); if(el) frEl.value=el.textContent||''; }
    return;
  }
  if (frEl && f.i18nFR) frEl.value=I18N.fr[f.i18nFR]||'';
  if (deEl && f.i18nDE) deEl.value=I18N.de[f.i18nDE]||'';
}

async function _saveField(key) {
  const f=_findField(key); if(!f) return;

  // ── Image fields ───────────────────────────────────────────
  if (f.type==='image') {
    const url=(document.getElementById('imgUrl_'+key)?.value||'').trim();
    f.onApply?.(url);
    if (!f.onApply && f.targets) f.targets.forEach(t=>_applyImageTarget(t.sel,url));
    // Persist under a __-prefixed key matching the field name.
    const ok = await saveContentKey('__' + key, url, null);
    if (ok) showToast('✅ Image appliquée!','success');
    return;
  }

  // ── Text / textarea fields ─────────────────────────────────
  const frEl=document.getElementById('fieldFR_'+key);
  const deEl=document.getElementById('fieldDE_'+key);
  const frVal=frEl?.value.trim()||'';
  const deVal=deEl?.value.trim()||frVal;

  // Special non-i18n single-lang fields
  if (key==='google_form_url') {
    googleFormUrl=frVal; renderCourses();
    if (await saveContentKey(KEY_GOOGLE_FORM_URL, frVal, null)) showToast('✅ URL Google Form mise à jour!','success');
    return;
  }
  if (key==='challenge_url') {
    challengeUrl = frVal;
    refreshChallengeUI();
    if (await saveContentKey(KEY_CHALLENGE_URL, frVal, null)) showToast('✅ URL du challenge mise à jour!','success');
    return;
  }
  if (key==='voucher_url') {
    voucherUrl = frVal;
    refreshVoucherUI();
    if (await saveContentKey(KEY_VOUCHER_URL, frVal, null)) showToast('✅ URL des bons cadeaux mise à jour!','success');
    return;
  }

  // Update i18n store + patch DOM
  if (f.i18nFR) I18N.fr[f.i18nFR]=frVal;
  if (f.i18nDE) I18N.de[f.i18nDE]=deVal;
  const live=currentLang==='de'?deVal:frVal;
  if (f.targets) f.targets.forEach(t=>{
    document.querySelectorAll(t.sel).forEach(el=>{ el[t.prop]=live; });
  });
  if (f.onApply) f.onApply(live);

  // Persist: i18n fields → use their i18n key. Single-lang fields → use __+key.
  const isI18n = !!(f.i18nFR);
  const storageKey = isI18n ? f.i18nFR : ('__' + key);
  const storeFr = isI18n ? frVal : frVal;
  const storeDe = isI18n ? deVal : null;
  if (await saveContentKey(storageKey, storeFr, storeDe)) {
    showToast(`✅ "${f.label}" sauvegardé!`,'success');
  }
}

function _findField(key) {
  for (const p of Object.values(ADMIN_PAGES)) { const f=p.fields.find(f=>f.key===key); if(f) return f; }
  return null;
}

// Image helpers
function _prevImg(key,url) {
  const box=document.getElementById('imgPrev_'+key); if(!box) return;
  let img=box.querySelector('img');
  if (url) {
    if (!img) { img=document.createElement('img'); img.style.cssText='width:100%;height:100%;object-fit:contain;padding:4px;position:absolute;inset:0;border-radius:inherit'; box.prepend(img); }
    img.src=url; img.onerror=()=>img.remove();
  } else if (img) img.remove();
}
function _clearImg(key) {
  const f=_findField(key); if(!f) return;
  const inp=document.getElementById('imgUrl_'+key); if(inp) inp.value='';
  _prevImg(key,'');
  f.onApply?.('');
  if(!f.onApply&&f.targets) f.targets.forEach(t=>_applyImageTarget(t.sel,''));
  showToast('🗑️ Image supprimée','success');
}
async function _fileToUrl(key,input) {
  const file=input.files[0]; if(!file) return;
  try {
    const url = await uploadMediaFile(file, key);
    const inp=document.getElementById('imgUrl_'+key); if(inp) inp.value=url;
    _prevImg(key,url);
    showToast('📁 Fichier chargé — cliquez Appliquer','success');
  } catch(err) { showToast('❌ Upload échoué: '+err.message,'error'); }
}
function _applyImageTarget(sel,url) {
  document.querySelectorAll(sel).forEach(el=>{
    el.style.backgroundImage=url?`url(${url})`:'';
    if(url){el.style.backgroundSize='contain';el.style.backgroundRepeat='no-repeat';el.style.backgroundPosition='center';}
  });
}

// ═══════════════════════════════════════════════════════════
// MEDIA — Videos & Gallery (admin)
// ═══════════════════════════════════════════════════════════
function renderAdminMedia() {
  const el=document.getElementById('adminMediaContent'); if(!el) return;

  const videoRows=videos.map(v=>`
    <div class="admin-card" style="margin-bottom:.8rem">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem">
        <div style="width:60px;height:40px;border-radius:8px;background:${v.bg};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.4rem">🎭</div>
        <div style="flex:1"><strong>${_esc(v.titleFR)}</strong></div>
        <button class="admin-delete-btn" onclick="_deleteVideo(${v.id})">✕</button>
      </div>
      <div class="bilingual-row">
        <div class="lang-field"><label>Titre FR</label><input type="text" id="vTFR_${v.id}" value="${_escAttr(v.titleFR)}" /></div>
        <div class="lang-field"><label>Titel DE</label><input type="text" id="vTDE_${v.id}" value="${_escAttr(v.titleDE)}" /></div>
        <div class="lang-field"><label>URL Vidéo (YouTube / Vimeo)</label>
          <input type="url" id="vUrl_${v.id}" value="${_escAttr(v.url)}" placeholder="https://youtube.com/watch?v=…" /></div>
        <div class="lang-field"><label>URL Miniature (image)</label>
          <input type="url" id="vThumb_${v.id}" value="${_escAttr(v.thumbnail)}" placeholder="https://…/thumb.jpg" /></div>
      </div>
      <button class="admin-save-btn" onclick="_saveVideo(${v.id})" style="margin-top:.6rem">💾 Sauvegarder</button>
    </div>`).join('');

  const photoRows=galleryPhotos.map(p=>`
    <div class="admin-card" style="margin-bottom:.8rem">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem">
        <div style="width:60px;height:40px;border-radius:8px;${p.url?`background:url(${p.url}) center/contain no-repeat rgba(255,255,255,.05)`:(`background:${p.bg}`)};flex-shrink:0"></div>
        <div style="flex:1"><strong>${_esc(p.captionFR)}</strong>
          <span style="font-size:.75rem;color:rgba(255,255,255,.35);margin-left:.4rem">(${p.cls||'normal'})</span></div>
        <button class="admin-delete-btn" onclick="_deletePhoto(${p.id})">✕</button>
      </div>
      <div class="bilingual-row">
        <div class="lang-field"><label>Légende FR</label><input type="text" id="pCFR_${p.id}" value="${_escAttr(p.captionFR)}" /></div>
        <div class="lang-field"><label>Bildunterschrift DE</label><input type="text" id="pCDE_${p.id}" value="${_escAttr(p.captionDE)}" /></div>
        <div class="lang-field"><label>URL de la photo</label>
          <input type="url" id="pUrl_${p.id}" value="${_escAttr(p.url)}" placeholder="https://…" oninput="_prevImg('pPrev_${p.id}',this.value)" /></div>
        <div class="lang-field"><label>Ou uploader</label>
          <label style="cursor:pointer"><span class="admin-save-btn" style="display:inline-block;font-size:.8rem;padding:.3rem .9rem">📁 Fichier</span>
          <input type="file" accept="image/*" style="display:none" onchange="_photoFileToUrl(${p.id},this)" /></label>
        </div>
      </div>
      <div class="admin-img-preview" id="pPrev_${p.id}" style="height:80px;margin-top:.4rem">
        ${p.url?`<img src="${p.url}" alt="${_escAttr(p.captionFR)}" style="width:100%;height:100%;object-fit:contain;padding:4px;position:absolute;inset:0;border-radius:inherit" />`:''}
        <div class="admin-img-overlay" style="font-size:.75rem">📷 Aperçu</div>
      </div>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;align-items:center">
        <label style="font-size:.78rem;color:rgba(255,255,255,.4)">Mise en page:</label>
        <select id="pCls_${p.id}" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:6px;color:#fff;padding:.25rem .5rem;font-family:inherit;font-size:.8rem;outline:none">
          <option value="" ${p.cls===''?'selected':''}>Normal</option>
          <option value="tall" ${p.cls==='tall'?'selected':''}>Haut (tall)</option>
          <option value="wide" ${p.cls==='wide'?'selected':''}>Large (wide)</option>
        </select>
      </div>
      <button class="admin-save-btn" onclick="_savePhoto(${p.id})" style="margin-top:.6rem">💾 Sauvegarder</button>
    </div>`).join('');

  el.innerHTML=`
    <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:1.2rem">🎬 Vidéos</h3>
    ${videoRows}
    <div class="admin-card" style="border:2px dashed rgba(255,255,255,.15);margin-bottom:2rem">
      <h4>➕ Ajouter une vidéo</h4>
      <div class="bilingual-row">
        <div class="lang-field"><label>Titre FR</label><input type="text" id="newVTFR" placeholder="Titre français" /></div>
        <div class="lang-field"><label>Titel DE</label><input type="text" id="newVTDE" placeholder="Deutschen Titel" /></div>
        <div class="lang-field"><label>URL Vidéo</label><input type="url" id="newVUrl" placeholder="https://youtube.com/…" /></div>
        <div class="lang-field"><label>URL Miniature</label><input type="url" id="newVThumb" placeholder="https://…/thumb.jpg" /></div>
      </div>
      <button class="admin-save-btn" onclick="_addVideo()" style="margin-top:.6rem">➕ Ajouter</button>
    </div>
    <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:1.2rem">🖼️ Galerie photos</h3>
    ${photoRows}
    <div class="admin-card" style="border:2px dashed rgba(255,255,255,.15)">
      <h4>➕ Ajouter une photo</h4>
      <div class="bilingual-row">
        <div class="lang-field"><label>Légende FR</label><input type="text" id="newPCFR" placeholder="Scène ouverte" /></div>
        <div class="lang-field"><label>Bildunterschrift DE</label><input type="text" id="newPCDE" placeholder="Offene Bühne" /></div>
        <div class="lang-field"><label>Mise en page</label>
          <select id="newPCls" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:6px;color:#fff;padding:.25rem .5rem;font-family:inherit;font-size:.8rem;outline:none">
            <option value="">Normal</option><option value="tall">Haut (tall)</option><option value="wide">Large (wide)</option>
          </select>
        </div>
      </div>
      <!-- Photo: URL + file upload + live preview -->
      <div style="margin-top:.8rem">
        <div class="admin-img-preview" id="newPImgPrev" style="height:100px;aspect-ratio:auto;max-width:200px">
          <div class="admin-img-overlay" style="font-size:.72rem">📷 Aperçu</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5rem;align-items:end;margin-top:.4rem;max-width:480px">
          <div class="lang-field"><label>URL Photo</label>
            <input type="url" id="newPUrl" placeholder="https://…"
              oninput="_prevImg('newPImgPrev',this.value)" /></div>
          <label style="cursor:pointer">
            <span class="admin-save-btn" style="display:block;font-size:.78rem;padding:.3rem .8rem;text-align:center">📁 Parcourir</span>
            <input type="file" accept="image/*" style="display:none" onchange="_newPhotoFile(this)" />
          </label>
        </div>
      </div>
      <button class="admin-save-btn" onclick="_addPhoto()" style="margin-top:.8rem">➕ Ajouter</button>
    </div>`;
}

/** Upload a file selected in the Add-photo form and stash its public URL in #newPUrl. */
async function _newPhotoFile(input) {
  const file = input.files[0]; if (!file) return;
  try {
    const url = await uploadMediaFile(file, 'gallery');
    const inp = document.getElementById('newPUrl'); if (inp) inp.value = url;
    _prevImg('newPImgPrev', url);
    showToast('📁 Photo chargée — cliquez Ajouter','success');
  } catch (err) { showToast('❌ Upload échoué: '+err.message,'error'); }
}

// Video CRUD
async function _saveVideo(id) {
  const v=videos.find(x=>x.id===id); if(!v) return;
  v.titleFR  =document.getElementById(`vTFR_${id}`)?.value.trim()||v.titleFR;
  v.titleDE  =document.getElementById(`vTDE_${id}`)?.value.trim()||v.titleDE;
  v.url      =document.getElementById(`vUrl_${id}`)?.value.trim()||'';
  v.thumbnail=document.getElementById(`vThumb_${id}`)?.value.trim()||'';
  const { error } = await sb.from('videos').update(_videoToDB(v)).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminMedia(); _renderVideos(); showToast('✅ Vidéo mise à jour!','success');
}
async function _deleteVideo(id) {
  if(!confirm('Supprimer cette vidéo ?')) return;
  const { error } = await sb.from('videos').delete().eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  videos=videos.filter(x=>x.id!==id); renderAdminMedia(); _renderVideos(); showToast('🗑️ Vidéo supprimée','success');
}
async function _addVideo() {
  const titleFR=document.getElementById('newVTFR')?.value.trim(); if(!titleFR){showToast('❌ Titre FR obligatoire','error');return;}
  const v = {
    titleFR, titleDE: document.getElementById('newVTDE')?.value.trim()||titleFR,
    url:       document.getElementById('newVUrl')?.value.trim()||'',
    thumbnail: document.getElementById('newVThumb')?.value.trim()||'',
    bg: 'linear-gradient(135deg,#FF3CAC,#784BA0)',
  };
  const { data, error } = await sb.from('videos').insert(_videoToDB(v)).select().single();
  if (error) { showToast('❌ '+error.message,'error'); return; }
  videos.push(_videoFromDB(data));
  renderAdminMedia(); _renderVideos(); showToast('✅ Vidéo ajoutée!','success');
}

// Photo CRUD
async function _savePhoto(id) {
  const p=galleryPhotos.find(x=>x.id===id); if(!p) return;
  p.captionFR=document.getElementById(`pCFR_${id}`)?.value.trim()||p.captionFR;
  p.captionDE=document.getElementById(`pCDE_${id}`)?.value.trim()||p.captionDE;
  p.url      =document.getElementById(`pUrl_${id}`)?.value.trim()||'';
  p.cls      =document.getElementById(`pCls_${id}`)?.value||'';
  const { error } = await sb.from('gallery_photos').update(_photoToDB(p)).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminMedia(); _renderGallery(); showToast('✅ Photo mise à jour!','success');
}
async function _deletePhoto(id) {
  if(!confirm('Supprimer cette photo ?')) return;
  const { error } = await sb.from('gallery_photos').delete().eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  galleryPhotos=galleryPhotos.filter(x=>x.id!==id); renderAdminMedia(); _renderGallery(); showToast('🗑️ Photo supprimée','success');
}
async function _addPhoto() {
  const captionFR=document.getElementById('newPCFR')?.value.trim(); if(!captionFR){showToast('❌ Légende FR obligatoire','error');return;}
  const p = {
    captionFR, captionDE: document.getElementById('newPCDE')?.value.trim()||captionFR,
    url: document.getElementById('newPUrl')?.value.trim()||'',
    cls: document.getElementById('newPCls')?.value||'',
    bg:  'linear-gradient(135deg,#FF3CAC,#784BA0)',
  };
  const { data, error } = await sb.from('gallery_photos').insert(_photoToDB(p)).select().single();
  if (error) { showToast('❌ '+error.message,'error'); return; }
  galleryPhotos.push(_photoFromDB(data));
  renderAdminMedia(); _renderGallery(); showToast('✅ Photo ajoutée!','success');
}
async function _photoFileToUrl(id,input) {
  const file=input.files[0]; if(!file) return;
  try {
    const url = await uploadMediaFile(file, 'gallery');
    const inp=document.getElementById(`pUrl_${id}`); if(inp) inp.value=url;
    _prevImg(`pPrev_${id}`,url);
    showToast('📁 Fichier chargé — cliquez Sauvegarder','success');
  } catch(err) { showToast('❌ Upload échoué: '+err.message,'error'); }
}

// ═══════════════════════════════════════════════════════════
// YESTICKET SYNC — pull events from the public iCal feed
// ═══════════════════════════════════════════════════════════
async function adminSyncYesTicket() {
  const btn    = document.getElementById('btnYesTicketSync');
  const status = document.getElementById('ytSyncStatus');
  if (btn) { btn.disabled = true; btn.style.opacity = '.5'; }
  if (status) status.textContent = '⏳ Synchronisation en cours…';
  try {
    const result = await syncShowsFromYesTicket();
    // Reload shows from the DB so the dashboard + public pages reflect the sync
    const { data, error } = await sb.from('shows').select('*').order('date', { ascending: true });
    if (error) throw error;
    shows = data.map(_showFromDB);
    renderAdminShows(); renderShows(); renderCalendar(); renderNextShowBanner();
    const msg = `✅ Sync OK · ${result.upserted} évén. importés, ${result.removed} supprimés.`;
    if (status) status.textContent = msg;
    showToast(msg, 'success');
  } catch (err) {
    console.error('[YesTicket] sync failed', err);
    if (status) status.textContent = '❌ ' + err.message;
    showToast('❌ Synchronisation YesTicket échouée : ' + err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = ''; }
  }
}

// ═══════════════════════════════════════════════════════════
// REGISTRATION TOGGLE
// ═══════════════════════════════════════════════════════════
/** Sync the 48hLIBERfilm challenge banner UI (admin toggle + public banner
 *  visibility + link button href) to the current `challengeOpen` / `challengeUrl`
 *  state. Safe to call any time. */
function refreshChallengeUI() {
  document.getElementById('adminChallengeToggle')?.classList.toggle('on', challengeOpen);
  const lbl = document.getElementById('adminChallengeLabel');
  if (lbl) lbl.textContent = challengeOpen ? '🟢 Bannière visible' : '🔴 Bannière masquée';
  document.getElementById('challengeBanner')?.classList.toggle('hidden', !challengeOpen);
  const btn = document.getElementById('challengeBtn');
  if (btn) btn.href = challengeUrl || '#';
}

/** Sync the newsletter signup UI (admin toggle + public newsletter box) to
 *  the current `newsletterOpen` value. Safe to call any time. */
function refreshNewsletterUI() {
  document.getElementById('adminNewsletterToggle')?.classList.toggle('on', newsletterOpen);
  const lbl = document.getElementById('adminNewsletterLabel');
  if (lbl) lbl.textContent = newsletterOpen ? '🟢 Newsletter ouverte' : '🔴 Newsletter fermée';
  // Hide the public box when disabled
  document.querySelector('.newsletter-box')?.classList.toggle('hidden', !newsletterOpen);
}

async function toggleNewsletter() {
  newsletterOpen = !newsletterOpen;
  refreshNewsletterUI();
  const ok = await saveContentKey(KEY_NEWSLETTER_OPEN, newsletterOpen ? 'true' : 'false', null);
  if (!ok) { newsletterOpen = !newsletterOpen; refreshNewsletterUI(); return; }
  showToast(`✅ Newsletter ${newsletterOpen ? 'visible' : 'masquée'}`, 'success');
}

/** Sync the gift-voucher banner UI (admin toggle + public banners on home
 *  AND shows page + button hrefs) to the current state. Safe to call any time. */
function refreshVoucherUI() {
  document.getElementById('adminVoucherToggle')?.classList.toggle('on', voucherOpen);
  const lbl = document.getElementById('adminVoucherLabel');
  if (lbl) lbl.textContent = voucherOpen ? '🟢 Bannière visible' : '🔴 Bannière masquée';
  document.querySelectorAll('.voucher-banner').forEach(b => b.classList.toggle('hidden', !voucherOpen));
  document.querySelectorAll('.voucher-btn').forEach(b => { b.href = voucherUrl || '#'; });
}

async function toggleVoucher() {
  voucherOpen = !voucherOpen;
  refreshVoucherUI();
  const ok = await saveContentKey(KEY_VOUCHER_OPEN, voucherOpen ? 'true' : 'false', null);
  if (!ok) { voucherOpen = !voucherOpen; refreshVoucherUI(); return; }
  showToast(`✅ Bannière bons cadeaux ${voucherOpen ? 'affichée' : 'masquée'}`, 'success');
}

async function toggleChallenge() {
  console.log('[LIBER] toggleChallenge — before:', { challengeOpen });
  challengeOpen = !challengeOpen;
  refreshChallengeUI();
  const ok = await saveContentKey(KEY_CHALLENGE_OPEN, challengeOpen ? 'true' : 'false', null);
  console.log('[LIBER] toggleChallenge — after:', { challengeOpen, savedToDb: ok });
  if (!ok) {
    // Revert visual state if the DB write failed
    challengeOpen = !challengeOpen;
    refreshChallengeUI();
    return;
  }
  showToast(`✅ Bannière ${challengeOpen ? 'affichée' : 'masquée'}`, 'success');
}

/** Sync the admin toggle's visual state + the public reg banner to the
 *  current `registrationsOpen` value. Safe to call any time (handles
 *  missing DOM nodes — e.g. before the admin page is rendered). */
function refreshRegistrationsUI() {
  document.getElementById('adminRegToggle')?.classList.toggle('on', registrationsOpen);
  const lbl = document.getElementById('adminRegLabel');
  if (lbl) lbl.textContent = registrationsOpen ? '🟢 Inscriptions ouvertes' : '🔴 Inscriptions fermées';
  document.getElementById('regOpenBanner')?.classList.toggle('hidden', !registrationsOpen);
}

async function toggleRegistrations() {
  registrationsOpen = !registrationsOpen;
  refreshRegistrationsUI();
  renderCourses();
  await saveContentKey(KEY_REG_OPEN, registrationsOpen ? 'true' : 'false', null);
  showToast(`✅ Inscriptions ${registrationsOpen ? 'ouvertes' : 'fermées'}`, 'success');
}

// ═══════════════════════════════════════════════════════════
// GENERAL — next show banner (quick edit from General tab)
// ═══════════════════════════════════════════════════════════
function saveNextShow() {
  // The actual next show is always computed from the shows array —
  // this just forces a re-render of the banners.
  renderNextShowBanner();
  showToast('✅ Bannière mise à jour depuis les spectacles!','success');
}

// ═══════════════════════════════════════════════════════════
// SHOWS CRUD
// ═══════════════════════════════════════════════════════════
// Yesticket-only mode: the admin can only VIEW the synced shows.
// Editing/adding/deleting is done via yesticket.org, then synced.
function renderAdminShows() {
  const el = document.getElementById('adminShowsList'); if (!el) return;
  if (!shows.length) {
    el.innerHTML = '<p style="color:rgba(255,255,255,.4);padding:1rem 0">Aucun spectacle. Cliquez sur 🔄 Synchroniser maintenant.</p>';
    return;
  }
  const sorted = [...shows].sort((a, b) => new Date(a.date) - new Date(b.date));
  el.innerHTML = sorted.map(s => `
    <div class="admin-row">
      <div class="admin-row-info">
        <strong>${_esc(s.titleFR)}</strong>
        <span>${s.date} · ${s.time} · ${_esc(s.venue)}</span>
      </div>
      ${s.tickets ? `<a class="admin-save-btn" href="${_escAttr(s.tickets)}" target="_blank" rel="noopener"
                       style="padding:.28rem .8rem;font-size:.78rem;text-decoration:none">🎟️ Voir</a>` : ''}
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════════
// MEMBERS CRUD
// ═══════════════════════════════════════════════════════════
const GRADIENTS=['linear-gradient(135deg,#FF3CAC,#784BA0)','linear-gradient(135deg,#FFD93D,#FF6B35)','linear-gradient(135deg,#00C9A7,#2B86C5)','linear-gradient(135deg,#784BA0,#2B86C5)','linear-gradient(135deg,#FF6B35,#FFD93D)','linear-gradient(135deg,#FF3CAC,#FF6B35)','linear-gradient(135deg,#2B86C5,#00C9A7)'];

function renderAdminMembers() {
  const el=document.getElementById('adminMembersListAdmin'); if(!el) return;
  el.innerHTML=members.map(m=>`
    <div class="admin-card" style="margin-bottom:1rem">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:56px;height:56px;border-radius:12px;${m.photo?`background:url(${m.photo}) center/contain no-repeat rgba(255,255,255,.05)`:(`background:${m.bg}`)};display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1.1rem;color:rgba(255,255,255,.9);flex-shrink:0">
          ${m.photo?'':(m.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase())}</div>
        <div style="flex:1"><strong>${_esc(m.name)}</strong><div style="font-size:.78rem;color:rgba(255,255,255,.4)">${_esc(m.role)}</div></div>
        <span style="font-size:.75rem;font-weight:700;color:${m.visible?'var(--teal)':'rgba(255,255,255,.3)'}">${m.visible?'👁':'🙈'}</span>
        <div class="toggle-switch ${m.visible?'on':''}" onclick="toggleMemberVisibility(${m.id},true)"></div>
        <button class="admin-delete-btn" onclick="_deleteMember(${m.id})">✕</button>
      </div>
      <div class="bilingual-row" style="grid-template-columns:1fr 1fr 1fr">
        <div class="lang-field"><label>Nom</label><input type="text" id="mName_${m.id}" value="${_escAttr(m.name)}" /></div>
        <div class="lang-field" style="grid-column:span 2"><label>Rôle</label><input type="text" id="mRole_${m.id}" value="${_escAttr(m.role)}" /></div>
        <div class="lang-field" style="grid-column:span 3"><label>Bio FR</label><textarea id="mBioFR_${m.id}" rows="3" placeholder="Biographie en français…">${_esc(m.bioFR)}</textarea></div>
        <div class="lang-field" style="grid-column:span 3"><label>Bio DE</label><textarea id="mBioDE_${m.id}" rows="3" placeholder="Biografie auf Deutsch…">${_esc(m.bioDE)}</textarea></div>
      </div>
      <!-- Photo upload -->
      <div style="margin-top:.8rem">
        <div class="admin-img-preview" id="mImgPrev_${m.id}" style="height:100px;aspect-ratio:auto;max-width:200px">
          ${m.photo?`<img src="${m.photo}" alt="${_escAttr(m.name)}" style="width:100%;height:100%;object-fit:contain;padding:4px;position:absolute;inset:0;border-radius:inherit" />`:''}
          <div class="admin-img-overlay" style="font-size:.72rem">Photo du membre</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5rem;align-items:end;margin-top:.4rem;max-width:400px">
          <div class="lang-field"><label>URL photo</label>
            <input type="url" id="mPhoto_${m.id}" value="${_escAttr(m.photo)}" placeholder="https://…"
              oninput="_prevImg('mImgPrev_${m.id}',this.value)" /></div>
          <label style="cursor:pointer">
            <span class="admin-save-btn" style="display:block;font-size:.78rem;padding:.3rem .8rem;text-align:center">📁</span>
            <input type="file" accept="image/*" style="display:none" onchange="_memberPhotoFile(${m.id},this)" />
          </label>
        </div>
      </div>
      <!-- Gradient picker (fallback when no photo) -->
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.8rem;align-items:center">
        ${GRADIENTS.map(g=>`<div onclick="_setMemberGrad(${m.id},'${g}')" style="width:24px;height:24px;border-radius:50%;background:${g};cursor:pointer;border:2px solid ${g===m.bg?'#fff':'transparent'};transition:border .2s;flex-shrink:0"></div>`).join('')}
        <span style="font-size:.72rem;color:rgba(255,255,255,.3);margin-left:.3rem">Couleur (si pas de photo)</span>
      </div>
      <button class="admin-save-btn" onclick="_saveMember(${m.id})" style="margin-top:.8rem">💾 Sauvegarder</button>
    </div>`).join('')+`
  <div class="admin-card" style="border:2px dashed rgba(255,255,255,.15)">
    <h4>➕ Ajouter un membre</h4>
    <div class="bilingual-row" style="grid-template-columns:1fr 1fr 1fr">
      <div class="lang-field"><label>Nom</label><input type="text" id="newMName" placeholder="Prénom Nom" /></div>
      <div class="lang-field" style="grid-column:span 2"><label>Rôle</label><input type="text" id="newMRole" placeholder="Comédien·ne" /></div>
      <div class="lang-field" style="grid-column:span 3"><label>Bio FR</label><textarea id="newMBioFR" rows="3" placeholder="Courte biographie en français…"></textarea></div>
      <div class="lang-field" style="grid-column:span 3"><label>Bio DE</label><textarea id="newMBioDE" rows="3" placeholder="Kurze Biografie auf Deutsch…"></textarea></div>
    </div>
    <!-- Photo: URL + file upload + live preview -->
    <div style="margin-top:.8rem">
      <div class="admin-img-preview" id="newMImgPrev" style="height:100px;aspect-ratio:auto;max-width:200px">
        <div class="admin-img-overlay" style="font-size:.72rem">Photo du membre</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr auto;gap:.5rem;align-items:end;margin-top:.4rem;max-width:400px">
        <div class="lang-field"><label>URL Photo</label>
          <input type="url" id="newMPhoto" placeholder="https://…"
            oninput="_prevImg('newMImgPrev',this.value)" /></div>
        <label style="cursor:pointer">
          <span class="admin-save-btn" style="display:block;font-size:.78rem;padding:.3rem .8rem;text-align:center">📁 Parcourir</span>
          <input type="file" accept="image/*" style="display:none" onchange="_newMemberPhotoFile(this)" />
        </label>
      </div>
    </div>
    <button class="admin-save-btn" onclick="_addMember()" style="margin-top:.8rem">➕ Ajouter</button>
  </div>`;
}

/** Upload a file selected in the Add-member form and stash the public URL in #newMPhoto. */
async function _newMemberPhotoFile(input) {
  const file = input.files[0]; if (!file) return;
  try {
    const url = await uploadMediaFile(file, 'members');
    const inp = document.getElementById('newMPhoto'); if (inp) inp.value = url;
    _prevImg('newMImgPrev', url);
    showToast('📁 Photo chargée — cliquez Ajouter','success');
  } catch (err) { showToast('❌ Upload échoué: '+err.message,'error'); }
}

async function _saveMember(id) {
  const m=members.find(x=>x.id===id); if(!m) return;
  m.name  = document.getElementById(`mName_${id}`)?.value.trim() || m.name;
  m.role  = document.getElementById(`mRole_${id}`)?.value.trim() || m.role;
  // Read raw values so multi-line bios keep their line breaks
  const bioFR = document.getElementById(`mBioFR_${id}`)?.value;
  const bioDE = document.getElementById(`mBioDE_${id}`)?.value;
  if (bioFR !== undefined) m.bioFR = bioFR.replace(/^\s+|\s+$/g, '');
  if (bioDE !== undefined) m.bioDE = bioDE.replace(/^\s+|\s+$/g, '');
  m.photo = document.getElementById(`mPhoto_${id}`)?.value.trim() || '';
  const { error } = await sb.from('members').update(_memberToDB(m)).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminMembers(); renderMembers();
  showToast(`✅ ${m.name} mis·e à jour!`,'success');
}
async function _setMemberGrad(id,g){
  const m=members.find(x=>x.id===id); if(!m) return;
  m.bg=g;
  const { error } = await sb.from('members').update({ bg: g }).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminMembers(); renderMembers();
}
async function _memberPhotoFile(id,input) {
  const file=input.files[0]; if(!file) return;
  try {
    const url = await uploadMediaFile(file, 'members');
    const inp=document.getElementById(`mPhoto_${id}`); if(inp) inp.value=url;
    _prevImg(`mImgPrev_${id}`,url);
    showToast('📁 Photo chargée — cliquez Sauvegarder','success');
  } catch(err) { showToast('❌ Upload échoué: '+err.message,'error'); }
}
async function _addMember() {
  const name=document.getElementById('newMName')?.value.trim(); if(!name){showToast('❌ Nom obligatoire','error');return;}
  const bioFR = (document.getElementById('newMBioFR')?.value || '').replace(/^\s+|\s+$/g, '');
  const bioDE = (document.getElementById('newMBioDE')?.value || '').replace(/^\s+|\s+$/g, '');
  const m = {
    name,
    role:  document.getElementById('newMRole')?.value.trim()||'Membre',
    bioFR, bioDE: bioDE || bioFR,
    photo: document.getElementById('newMPhoto')?.value.trim()||'',
    bg:    GRADIENTS[Math.floor(Math.random()*GRADIENTS.length)],
    visible: true, email: '',
  };
  const { data, error } = await sb.from('members').insert(_memberToDB(m)).select().single();
  if (error) { showToast('❌ '+error.message,'error'); return; }
  members.push(_memberFromDB(data));
  renderAdminMembers(); renderMembers(); showToast('✅ Membre ajouté!','success');
}
async function _deleteMember(id) {
  const m=members.find(x=>x.id===id); if(!m||!confirm(`Supprimer ${m.name} ?`)) return;
  const { error } = await sb.from('members').delete().eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  members=members.filter(x=>x.id!==id); renderAdminMembers(); renderMembers(); showToast('🗑️ Membre supprimé','success');
}

// ═══════════════════════════════════════════════════════════
// COURSES CRUD
// ═══════════════════════════════════════════════════════════
const COURSE_COLORS=['var(--teal)','var(--orange)','var(--pink)','var(--blue)','var(--yellow)','var(--purple)'];

function renderAdminCourses() {
  const el=document.getElementById('adminCoursesListAdmin'); if(!el) return;
  el.innerHTML=courses.map(c=>`
    <div class="admin-card" style="margin-bottom:1rem">
      <div style="display:flex;align-items:center;gap:.8rem;margin-bottom:1rem;padding-bottom:.8rem;border-bottom:3px solid ${c.color}">
        <span style="font-size:2rem;cursor:pointer" onclick="_promptCourseIcon(${c.id})">${c.icon}</span>
        <div style="flex:1"><strong>${_esc(c.titleFR)}</strong><div style="font-size:.78rem;color:rgba(255,255,255,.4)">${_esc(c.levelFR)}</div></div>
        <span title="${c.visible?'Visible sur le site':'Masqué sur le site'}"
          style="font-size:.75rem;font-weight:700;color:${c.visible?'var(--liber-yellow)':'rgba(255,255,255,.3)'}">${c.visible?'👁':'🙈'}</span>
        <div class="toggle-switch ${c.visible?'on':''}" title="Afficher / masquer ce cours sur le site"
          onclick="toggleCourseVisibility(${c.id})"></div>
        <button class="admin-delete-btn" onclick="_deleteCourse(${c.id})">✕</button>
      </div>
      <div class="bilingual-row">
        <div class="lang-field"><label>Titre FR</label><input type="text" id="cTFR_${c.id}" value="${_escAttr(c.titleFR)}" /></div>
        <div class="lang-field"><label>Titel DE</label><input type="text" id="cTDE_${c.id}" value="${_escAttr(c.titleDE)}" /></div>
        <div class="lang-field" style="grid-column:span 2">
          <label>Description FR <span style="font-weight:400;color:rgba(255,255,255,.4);font-size:.72rem">— ligne vide = nouveau paragraphe</span></label>
          <textarea id="cDFR_${c.id}" rows="10">${_esc(c.desc_fr)}</textarea>
        </div>
        <div class="lang-field" style="grid-column:span 2">
          <label>Beschreibung DE <span style="font-weight:400;color:rgba(255,255,255,.4);font-size:.72rem">— Leerzeile = neuer Absatz</span></label>
          <textarea id="cDDE_${c.id}" rows="10">${_esc(c.desc_de)}</textarea>
        </div>
        <div class="lang-field"><label>Niveau FR</label><input type="text" id="cLvlFR_${c.id}" value="${_escAttr(c.levelFR)}" placeholder="Débutant" /></div>
        <div class="lang-field"><label>Niveau DE</label><input type="text" id="cLvlDE_${c.id}" value="${_escAttr(c.levelDE)}" placeholder="Anfänger" /></div>
        <div class="lang-field"><label>Tags FR (virgules)</label><input type="text" id="cTagsFR_${c.id}" value="${_escAttr(c.tagsFR.join(', '))}" placeholder="10 séances, CHF 160" /></div>
        <div class="lang-field"><label>Tags DE (Komma)</label><input type="text" id="cTagsDE_${c.id}" value="${_escAttr(c.tagsDE.join(', '))}" placeholder="10 Sitzungen, CHF 160" /></div>
      </div>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.8rem;align-items:center">
        ${COURSE_COLORS.map(col=>`<div onclick="_setCourseColor(${c.id},'${col}')" style="width:22px;height:22px;border-radius:50%;background:${col};cursor:pointer;border:2px solid ${col===c.color?'#fff':'transparent'};transition:border .2s"></div>`).join('')}
        <span style="font-size:.72rem;color:rgba(255,255,255,.3);margin-left:.3rem">Couleur</span>
      </div>
      <button class="admin-save-btn" onclick="_saveCourse(${c.id})" style="margin-top:.8rem">💾 Sauvegarder</button>
    </div>`).join('')+`
  <div class="admin-card" style="border:2px dashed rgba(255,255,255,.15)">
    <h4>➕ Ajouter un cours</h4>
    <div class="bilingual-row">
      <div class="lang-field"><label>Titre FR</label><input type="text" id="newCTFR" placeholder="Cours Débutant·e" /></div>
      <div class="lang-field"><label>Titel DE</label><input type="text" id="newCTDE" placeholder="Anfängerkurs" /></div>
      <div class="lang-field" style="grid-column:span 2">
        <label>Description FR <span style="font-weight:400;color:rgba(255,255,255,.4);font-size:.72rem">— ligne vide = nouveau paragraphe</span></label>
        <textarea id="newCDFR" rows="10" placeholder="Décrivez le cours…&#10;&#10;Laissez une ligne vide pour créer un nouveau paragraphe."></textarea>
      </div>
      <div class="lang-field" style="grid-column:span 2">
        <label>Beschreibung DE <span style="font-weight:400;color:rgba(255,255,255,.4);font-size:.72rem">— Leerzeile = neuer Absatz</span></label>
        <textarea id="newCDDE" rows="10" placeholder="Beschreiben Sie den Kurs…&#10;&#10;Lassen Sie eine Leerzeile für einen neuen Absatz."></textarea>
      </div>
      <div class="lang-field"><label>Niveau FR</label><input type="text" id="newCLvlFR" placeholder="Débutant" /></div>
      <div class="lang-field"><label>Niveau DE</label><input type="text" id="newCLvlDE" placeholder="Anfänger" /></div>
      <div class="lang-field"><label>Tags FR (virgules)</label><input type="text" id="newCTagsFR" placeholder="10 séances, CHF 160" /></div>
      <div class="lang-field"><label>Tags DE (Komma)</label><input type="text" id="newCTagsDE" placeholder="10 Sitzungen, CHF 160" /></div>
      <div class="lang-field"><label>Icône</label><input type="text" id="newCIcon" value="🌱" maxlength="2" style="font-size:1.4rem;text-align:center;width:60px" /></div>
    </div>
    <button class="admin-save-btn" onclick="_addCourse()" style="margin-top:.8rem">➕ Ajouter</button>
  </div>`;
}

async function _saveCourse(id) {
  const c=courses.find(x=>x.id===id); if(!c) return;
  const parseTags = v => (v||'').split(',').map(t=>t.trim()).filter(Boolean);
  c.titleFR = document.getElementById(`cTFR_${id}`)?.value.trim()    || c.titleFR;
  c.titleDE = document.getElementById(`cTDE_${id}`)?.value.trim()    || c.titleDE;
  // Read raw value (preserve newlines for paragraph splitting); only trim the
  // leading/trailing whitespace, not the internal blank lines.
  c.desc_fr = (document.getElementById(`cDFR_${id}`)?.value ?? c.desc_fr).replace(/^\s+|\s+$/g, '');
  c.desc_de = (document.getElementById(`cDDE_${id}`)?.value ?? c.desc_de).replace(/^\s+|\s+$/g, '');
  c.levelFR = document.getElementById(`cLvlFR_${id}`)?.value.trim()  ?? c.levelFR;
  c.levelDE = document.getElementById(`cLvlDE_${id}`)?.value.trim()  ?? c.levelDE;
  c.tagsFR  = parseTags(document.getElementById(`cTagsFR_${id}`)?.value);
  c.tagsDE  = parseTags(document.getElementById(`cTagsDE_${id}`)?.value);
  const { error } = await sb.from('courses').update(_courseToDB(c)).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminCourses(); renderCourses(); showToast('✅ Cours mis à jour!','success');
}
async function _setCourseColor(id,color){
  const c=courses.find(x=>x.id===id); if(!c) return;
  c.color=color;
  const { error } = await sb.from('courses').update({ color }).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminCourses(); renderCourses();
}

/** Toggle whether a course is shown on the public site. */
async function toggleCourseVisibility(id) {
  const c = courses.find(x => x.id === id); if (!c) return;
  c.visible = !c.visible;
  const { error } = await sb.from('courses').update({ visible: c.visible }).eq('id', id);
  if (error) {
    c.visible = !c.visible;        // revert on failure
    showToast('❌ ' + error.message, 'error');
    return;
  }
  renderAdminCourses(); renderCourses();
  showToast(c.visible ? '👁 Cours affiché sur le site' : '🙈 Cours masqué du site', 'success');
}
async function _promptCourseIcon(id){
  const c=courses.find(x=>x.id===id); if(!c) return;
  const ic=prompt('Nouvel icône :',c.icon);
  if(!ic?.trim()) return;
  c.icon=ic.trim();
  const { error } = await sb.from('courses').update({ icon: c.icon }).eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  renderAdminCourses(); renderCourses();
}
async function _addCourse() {
  const titleFR=document.getElementById('newCTFR')?.value.trim(); if(!titleFR){showToast('❌ Titre FR obligatoire','error');return;}
  const parseTags = v => (v||'').split(',').map(t=>t.trim()).filter(Boolean);
  const titleDE  = document.getElementById('newCTDE')?.value.trim()||titleFR;
  const levelFR  = document.getElementById('newCLvlFR')?.value.trim()||'Tous niveaux';
  const levelDE  = document.getElementById('newCLvlDE')?.value.trim()||levelFR;
  const tagsFR   = parseTags(document.getElementById('newCTagsFR')?.value);
  const tagsDE   = parseTags(document.getElementById('newCTagsDE')?.value);
  const c = {
    icon:    document.getElementById('newCIcon')?.value.trim()||'⭐',
    titleFR, titleDE,
    desc_fr: (document.getElementById('newCDFR')?.value || '').replace(/^\s+|\s+$/g, ''),
    desc_de: (document.getElementById('newCDDE')?.value || '').replace(/^\s+|\s+$/g, ''),
    levelFR, levelDE,
    tagsFR,  tagsDE: tagsDE.length ? tagsDE : tagsFR,
    color:   COURSE_COLORS[Math.floor(Math.random()*COURSE_COLORS.length)],
    visible: true,
  };
  const { data, error } = await sb.from('courses').insert(_courseToDB(c)).select().single();
  if (error) { showToast('❌ '+error.message,'error'); return; }
  courses.push(_courseFromDB(data));
  renderAdminCourses(); renderCourses(); showToast('✅ Cours ajouté!','success');
}
async function _deleteCourse(id){
  const c=courses.find(x=>x.id===id); if(!c||!confirm(`Supprimer "${c.titleFR}" ?`)) return;
  const { error } = await sb.from('courses').delete().eq('id', id);
  if (error) { showToast('❌ '+error.message,'error'); return; }
  courses=courses.filter(x=>x.id!==id); renderAdminCourses(); renderCourses(); showToast('🗑️ Cours supprimé','success');
}

// ═══════════════════════════════════════════════════════════
// NEWSLETTER SUBSCRIBERS — view + CSV export (admin only)
// ═══════════════════════════════════════════════════════════
let _adminSubscribers = [];

async function renderAdminSubscribers() {
  const listEl  = document.getElementById('adminSubscribersList');
  const countEl = document.getElementById('subscribersCount');
  if (!listEl) return;
  listEl.innerHTML = '<p style="color:rgba(255,255,255,.4);padding:.5rem 0">⏳ Chargement…</p>';

  const { data, error } = await sb
    .from('newsletter_subscribers')
    .select('id, email, subscribed_at, unsubscribed_at')
    .order('subscribed_at', { ascending: false });

  if (error) {
    listEl.innerHTML = `<p style="color:#ff8a8a;padding:.5rem 0">❌ ${_esc(error.message)}</p>`;
    if (countEl) countEl.textContent = '';
    return;
  }

  _adminSubscribers = data || [];
  if (countEl) countEl.textContent = `(${_adminSubscribers.length})`;

  if (!_adminSubscribers.length) {
    listEl.innerHTML = '<p style="color:rgba(255,255,255,.4);padding:.5rem 0">Aucun abonné pour l\'instant.</p>';
    return;
  }

  // Compact table rendering
  listEl.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:.85rem">
      <thead>
        <tr style="color:rgba(255,255,255,.5);text-align:left;border-bottom:1px solid rgba(255,255,255,.1)">
          <th style="padding:.5rem .4rem">Email</th>
          <th style="padding:.5rem .4rem;width:140px">Inscrit le</th>
          <th style="padding:.5rem .4rem;width:80px"></th>
        </tr>
      </thead>
      <tbody>
        ${_adminSubscribers.map(s => `
          <tr style="border-bottom:1px solid rgba(255,255,255,.05);${s.unsubscribed_at?'opacity:.4':''}">
            <td style="padding:.5rem .4rem">${_esc(s.email)}${s.unsubscribed_at?' <span style="font-size:.7rem">(désabonné·e)</span>':''}</td>
            <td style="padding:.5rem .4rem;color:rgba(255,255,255,.6)">${new Date(s.subscribed_at).toLocaleDateString('fr-FR')}</td>
            <td style="padding:.5rem .4rem"><button class="admin-delete-btn" onclick="_deleteSubscriber(${s.id})">✕</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

async function _deleteSubscriber(id) {
  const sub = _adminSubscribers.find(x => x.id === id);
  if (!sub || !confirm(`Supprimer l'abonné·e « ${sub.email} » ?`)) return;
  const { error } = await sb.from('newsletter_subscribers').delete().eq('id', id);
  if (error) { showToast('❌ ' + error.message, 'error'); return; }
  showToast('🗑️ Abonné·e supprimé·e', 'success');
  renderAdminSubscribers();
}

/** Download the current subscribers list as a CSV file. */
function exportSubscribersCSV() {
  if (!_adminSubscribers.length) { showToast('❌ Aucun abonné à exporter', 'error'); return; }
  const rows = [['email','subscribed_at','unsubscribed_at']];
  for (const s of _adminSubscribers) {
    rows.push([s.email, s.subscribed_at, s.unsubscribed_at || '']);
  }
  const csv = rows.map(r => r.map(v => {
    const str = String(v).replace(/"/g, '""');
    return /[",\n]/.test(str) ? `"${str}"` : str;
  }).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `liber-newsletter-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  showToast(`⬇️ ${_adminSubscribers.length} abonné·es exporté·es`, 'success');
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function _esc(s)    { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function _escAttr(s){ return (s||'').replace(/"/g,'&quot;'); }
