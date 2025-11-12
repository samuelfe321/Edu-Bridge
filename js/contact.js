document.getElementById('contact-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    // Simulate API
    await new Promise(r => setTimeout(r, 1000));
    status.textContent = 'Message sent successfully!';
    status.classList.remove('visually-hidden');
    e.target.reset();
  } catch {
    status.textContent = 'Failed to send. Try again.';
    status.classList.remove('visually-hidden');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});