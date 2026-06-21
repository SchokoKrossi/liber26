/**
 * js/auth.js — Admin-only authentication via Supabase Auth.
 *
 * There is no public registration. The login modal is hidden from
 * casual visitors and only opens when:
 *   • the URL ends with #login (or #admin), OR
 *   • the user presses Ctrl+Shift+L anywhere on the site.
 *
 * Row-level security in Postgres still enforces that only the
 * profile with role='admin' can mutate content tables.
 */

async function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pwd   = document.getElementById('loginPassword').value;
  if (!email || !pwd) { showToast('❌ Remplissez tous les champs', 'error'); return; }

  const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
  if (error || !data?.user) {
    showToast('❌ Identifiants incorrects', 'error');
    return;
  }

  await _hydrateCurrentUser(data.user);

  // Only admins are allowed to use this site's authenticated UI.
  if (currentUser?.role !== 'admin') {
    await sb.auth.signOut();
    currentUser = null;
    showToast('❌ Accès réservé aux administrateurs.', 'error');
    return;
  }

  closeModal('loginModal');
  // Clean the #login hash from the URL bar (we'll set #admin after navigation)
  if (location.hash === '#login') {
    history.replaceState(null, '', location.pathname + location.search);
  }
  updateAuthUI();
  showToast(`✅ Bienvenue, ${currentUser?.name || email}!`, 'success');
  setTimeout(() => showPage('admin'), 500);
}

async function logoutUser() {
  await sb.auth.signOut();
  currentUser = null;
  updateAuthUI();
  showPage('home');
  showToast('👋 Déconnexion réussie', 'success');
}

/** Change the current admin's password.
 *  Two-field confirmation + 8-char minimum, then auto-logout so the next
 *  login uses the new credentials. */
async function changeAdminPassword() {
  const p1 = document.getElementById('newAdminPwd1')?.value || '';
  const p2 = document.getElementById('newAdminPwd2')?.value || '';

  if (!p1 || !p2)      { showToast('❌ Veuillez remplir les deux champs', 'error'); return; }
  if (p1.length < 8)   { showToast('❌ Le mot de passe doit faire au moins 8 caractères', 'error'); return; }
  if (p1 !== p2)       { showToast('❌ Les deux mots de passe ne correspondent pas', 'error'); return; }
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('❌ Vous devez être connecté·e en admin', 'error'); return;
  }

  const { error } = await sb.auth.updateUser({ password: p1 });
  if (error) { showToast('❌ ' + error.message, 'error'); return; }

  showToast('✅ Mot de passe changé — reconnexion requise', 'success');
  const f1 = document.getElementById('newAdminPwd1'); if (f1) f1.value = '';
  const f2 = document.getElementById('newAdminPwd2'); if (f2) f2.value = '';
  // Sign out after a moment so the toast is visible, forcing re-login with the new password
  setTimeout(() => logoutUser(), 1500);
}

/** Show/hide nav items depending on login state.
 *  - Logged out: everything stays hidden (no public login button).
 *  - Logged in as admin: greeting + Admin button + logout button. */
function updateAuthUI() {
  const loggedIn = !!currentUser && currentUser.role === 'admin';
  document.getElementById('loginBtn') ?.classList.add('hidden');        // always hidden
  document.getElementById('adminBtn') ?.classList.toggle('hidden', !loggedIn);
  document.getElementById('logoutBtn')?.classList.toggle('hidden', !loggedIn);
  // Admin email greeting was intentionally removed — only the Admin and 🚪 buttons stay.
}

/** Restore Supabase session on page load. */
async function restoreSession() {
  const { data } = await sb.auth.getSession();
  if (data?.session?.user) {
    await _hydrateCurrentUser(data.session.user);
    updateAuthUI();
  }
}

/** Fetch the profile row (role, name) for an authenticated user. */
async function _hydrateCurrentUser(authUser) {
  const { data: profile } = await sb.from('profiles').select('*').eq('id', authUser.id).single();
  currentUser = {
    id:    authUser.id,
    email: authUser.email,
    name:  profile?.name || authUser.user_metadata?.name || authUser.email,
    role:  profile?.role || 'member',
  };
}

// ═══════════════════════════════════════════════════════════
// HIDDEN ADMIN-LOGIN TRIGGERS
// ═══════════════════════════════════════════════════════════

/** Open the login modal if the URL hash is #login.
 *  Note: #admin now navigates to the admin page (handled in router.js)
 *  so we only treat #login as the modal trigger. */
function _maybeOpenLoginFromHash() {
  const h = (location.hash || '').toLowerCase();
  if (h === '#login') {
    console.log('[LIBER] Login hash detected — opening modal');
    // Wait a tick so the modal element is guaranteed to be in the DOM
    // (in case this fires before the body is fully parsed).
    setTimeout(() => {
      const modal = document.getElementById('loginModal');
      if (!modal) { console.warn('[LIBER] loginModal element not found'); return; }
      openModal('loginModal');
    }, 0);
  }
}

// Fire as early as possible — covers the case where the page is opened
// directly with the hash in the URL bar.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _maybeOpenLoginFromHash);
} else {
  _maybeOpenLoginFromHash();
}
// Also handle later hash changes (e.g. admin types #login while already on the page)
window.addEventListener('hashchange', _maybeOpenLoginFromHash);

// Keyboard shortcut: Ctrl+Shift+L (or Cmd+Shift+L on Mac) opens the modal
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
    e.preventDefault();
    console.log('[LIBER] Login shortcut pressed');
    openModal('loginModal');
  }
});

// Triple-click on the footer "🎭 LIBER" logo also opens the modal.
// Uses event delegation so it works even though the footer is rendered
// once but the logo element is re-rendered by renderLogo().
let _footerClickCount = 0;
let _footerClickTimer = null;
document.addEventListener('click', e => {
  const logo = e.target.closest('.footer-logo');
  if (!logo) return;
  _footerClickCount++;
  clearTimeout(_footerClickTimer);
  _footerClickTimer = setTimeout(() => { _footerClickCount = 0; }, 600);
  if (_footerClickCount >= 3) {
    _footerClickCount = 0;
    console.log('[LIBER] Footer triple-click — opening login modal');
    openModal('loginModal');
  }
});
