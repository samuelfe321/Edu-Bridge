window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav a');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });

  links.forEach(link => {
    link.removeAttribute('aria-current');
    if (link.getAttribute('href').includes(current)) {
      link.setAttribute('aria-current', 'page');
    }
  });
});