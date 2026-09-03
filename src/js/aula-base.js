(function initAulaBase() {
  // Configuração do Tema Claro/Escuro
  const btn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  const isDark = () => document.documentElement.classList.contains('dark');
  const syncIcons = () => {
    if (!darkIcon || !lightIcon) return;
    darkIcon.classList.toggle('hidden', !isDark());
    lightIcon.classList.toggle('hidden', isDark());
  };

  if (btn) {
    syncIcons();
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('color-theme', isDark() ? 'dark' : 'light');
      syncIcons();
    });
  }

  // Configuração do Menu Mobile
  const menuBtn = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();