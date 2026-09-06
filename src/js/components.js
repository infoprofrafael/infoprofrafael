// // Arquivo: components.js

// class SiteHeader extends HTMLElement {
//   connectedCallback() {
//     // Aqui você define o HTML do seu cabeçalho padrão para todas as páginas
//     this.innerHTML = `
//       <header class="site-header" style="background: var(--surface-1, #ffffff); border-bottom: 1px solid var(--line, #dee2e6); padding: 16px 0; position: sticky; top: 0; z-index: 100;">
//         <div class="container" style="max-width: 900px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
          
//           <!-- Logo / Marca -->
//           <a href="index.html" class="brand" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
//             <span style="background: var(--brand, #3b82f6); color: white; padding: 8px 12px; border-radius: 8px; font-weight: bold; font-family: monospace; font-size: 1.2rem;">RG</span>

//             <!-- Inserindo imagem na logo <img src="assets/logo.png" alt="Logo Rafael Guimarães" style="height: 40px; width: auto; border-radius: 8px;"> -->
            
//             <span style="display: flex; flex-direction: column; color: var(--ink-dark, #212529);">
//               <strong style="font-size: 1.1rem; line-height: 1.1;">Rafael Guimarães</strong>
//               <span style="font-size: 0.8rem; color: var(--ink, #495057);">Matemática: Apostilas Interativas</span>
//             </span>
//           </a>

//           <!-- Menu de Navegação (Você pode adicionar mais módulos aqui depois) -->
//           <nav style="display: flex; gap: 20px;">
//             <a href="geometria.html" style="text-decoration: none; color: var(--ink, #495057); font-weight: 500; transition: 0.2s;">Geometria Espacial</a>
//             <a href="combinatoria.html" style="text-decoration: none; color: var(--brand, #3b82f6); font-weight: bold; transition: 0.2s;">Combinatória</a>
//           </nav>
          
//         </div>
//       </header>
//     `;
//   }
// }



// // Registra a nova tag HTML para o navegador reconhecer
// customElements.define('site-header', SiteHeader);

/* ============================================================
   components.js
   Contém os componentes reutilizáveis do site (Web Components).
   Basta importar este arquivo em qualquer página e usar a tag
   <site-header></site-header> no HTML.
   ============================================================ */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    
    // HTML do cabeçalho, extraído das páginas existentes
    this.innerHTML = `
      <header class="site-header">
        <div class="container">
          <a href="../../matematica/index.html" class="brand">
            <span class="brand-badge">RG</span>
            <span class="brand-text">
              <strong>Rafael Guimarães</strong>
              <span>Matemática Interativa</span>
            </span>
          </a>
          <ul class="nav-links">
            <li><a href="../../matematica/index.html">Início</a></li>
            <li><a href="#fundamental">Ensino Fundamental</a></li>
            <li><a href="#medio">Ensino Médio</a></li>
          </ul>
          <div class="header-actions">
          <a href="../index.html" class="btn btn-ghost btn-sm">← Voltar às Aulas</a>
            <button id="theme-toggle" type="button" class="icon-btn" aria-label="Alternar tema">
              <svg id="theme-toggle-dark-icon" class="hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              <svg id="theme-toggle-light-icon" class="hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.951.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
      </header>
    `;

    this.setupThemeToggle();
  }

  // Controla a lógica do botão de dark mode
  setupThemeToggle() {
    const toggleBtn = this.querySelector('#theme-toggle');
    const darkIcon = this.querySelector('#theme-toggle-dark-icon');
    const lightIcon = this.querySelector('#theme-toggle-light-icon');

    // Mostra o ícone certo dependendo do tema atual
    const updateIcon = (isDark) => {
      darkIcon.classList.toggle('hidden', !isDark);
      lightIcon.classList.toggle('hidden', isDark);
    };

    // Ao carregar a página, aplica o tema salvo anteriormente (se houver)
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    document.body.classList.toggle('dark-mode', isDark);
    updateIcon(isDark);

    // Ao clicar no botão, alterna entre claro e escuro
    toggleBtn.addEventListener('click', () => {
      const nowDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
      updateIcon(nowDark);
    });
  }
}

// Registra a tag <site-header> para o navegador reconhecer
customElements.define('site-header', SiteHeader);