/* =========================================================
   PROF. RAFAEL GUIMARÃES — SCRIPT
   ========================================================= */

/* ---------- Tema claro/escuro ---------- */
(function themeToggleSetup() {
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const isDark = () => document.documentElement.classList.contains('dark');
  const syncIcons = () => {
    darkIcon.classList.toggle('hidden', !isDark());
    lightIcon.classList.toggle('hidden', isDark());
  };
  syncIcons();

  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', isDark() ? 'dark' : 'light');
    syncIcons();
  });
})();

/* ---------- Menu mobile ---------- */
(function mobileMenuSetup() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  const openMenu = () => { nav.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); };

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
})();

/* ---------- Revelação ao rolar a tela ---------- */
(function scrollRevealSetup() {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!targets.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- Botão flutuante do WhatsApp (some enquanto o hero está visível) ---------- */
(function floatingWhatsappSetup() {
  const hero = document.getElementById('hero');
  const waButton = document.getElementById('whatsapp-floating');
  if (!hero || !waButton) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        waButton.classList.toggle('visible', !entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(hero);
})();

/* ---------- Quadro-negro do hero: giz vira código ---------- */
(function chalkboardSetup() {
  const mathEl = document.querySelector('[data-board-math]');
  const codeEl = document.querySelector('[data-board-code]');
  if (!mathEl || !codeEl) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pairs = [
    { math: 'f(x) = x² + 2x − 3', code: 'function f(x) { return x**2 + 2*x - 3; }' },
    { math: 'a² + b² = c²', code: 'hipotenusa = Math.sqrt(a**2 + b**2)' },
    { math: 'log₂(8) = 3', code: 'Math.log2(8) // 3' }
  ];

  if (prefersReduced) {
    mathEl.textContent = pairs[0].math;
    codeEl.textContent = pairs[0].code;
    return;
  }

  let pairIndex = 0;

  function typeText(el, text, speed, onDone) {
    let i = 0;
    (function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(step, speed);
      } else if (onDone) {
        onDone();
      }
    })();
  }

  function eraseText(el, speed, onDone) {
    let text = el.textContent;
    (function step() {
      text = text.slice(0, -1);
      el.textContent = text;
      if (text.length > 0) {
        setTimeout(step, speed);
      } else if (onDone) {
        onDone();
      }
    })();
  }

  function cycle() {
    const pair = pairs[pairIndex];
    typeText(mathEl, pair.math, 65, () => {
      setTimeout(() => {
        typeText(codeEl, pair.code, 28, () => {
          setTimeout(() => {
            eraseText(codeEl, 12, () => {
              eraseText(mathEl, 30, () => {
                pairIndex = (pairIndex + 1) % pairs.length;
                setTimeout(cycle, 300);
              });
            });
          }, 2200);
        });
      }, 350);
    });
  }

  cycle();
})();
