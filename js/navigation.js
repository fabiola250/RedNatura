document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'contenido-principal';

  if (main && !document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link';
    skipLink.href = '#contenido-principal';
    skipLink.textContent = 'Saltar al contenido';
    document.body.prepend(skipLink);
  }

  const navLinks = navbar.querySelector('.nav-links');
  if (navLinks) {
    navLinks.id = navLinks.id || 'menu-principal';
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', navLinks.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span class="nav-toggle__icon" aria-hidden="true"><i></i><i></i><i></i></span><span>Menú</span>';
    navbar.querySelector('.container').insertBefore(toggle, navLinks);

    const cerrarMenu = () => {
      navbar.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const abierto = navbar.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(abierto));
    });
    navLinks.addEventListener('click', event => {
      if (event.target.closest('a')) cerrarMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        cerrarMenu();
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) cerrarMenu();
    });
  }

  const updateNavbar = () => navbar.classList.toggle('is-scrolled', window.scrollY > 24);
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
});
