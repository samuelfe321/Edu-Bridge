(() => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      status.textContent = res.ok ? 'Sent!' : 'Error.';
      status.classList.remove('visually-hidden');
      form.reset();
    } catch {
      status.textContent = 'Failed.';
      status.classList.remove('visually-hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send';
    }
  });

  // Nav Highlight
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('nav a');
    let current = 'home';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    links.forEach(l => {
      l.removeAttribute('aria-current');
      if (l.getAttribute('href') === `#${current}`) l.setAttribute('aria-current', 'page');
    });
  });
})();