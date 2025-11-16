function oauthLogin(provider) {
  speak(`Signing in with ${provider}`);
  // Real: window.location = `/api/auth/${provider}`;
  setTimeout(() => alert(`Signed in with ${provider}!`), 800);
}

const modal     = document.getElementById('resetModal');
const closeBtn  = modal.querySelector('.modal-close');
const forgot    = document.getElementById('forgotLink');
const resetForm = document.getElementById('resetForm');

forgot?.addEventListener('click', e => {
  e.preventDefault();
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('resetEmail').focus();
  speak('Enter your email');
});

closeBtn?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
modal?.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });

resetForm?.addEventListener('submit', e => {
  e.preventDefault();
  const email = resetForm.resetEmail.value.trim();
  if (!email.includes('@')) return alert('Invalid email');
  alert(`Reset link sent to ${email}`);
  speak(`Link sent to ${email}`);
  modal.setAttribute('aria-hidden', 'true');
  resetForm.reset();
});

document.getElementById("loginEmail")?.focus();