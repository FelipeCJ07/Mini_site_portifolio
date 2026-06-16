// script.js - Portfólio Felipe Caires Jaques

const GITHUB_USER = 'FelipeCJ07';

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', 'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051', Java: '#b07219', 'C#': '#178600',
};

document.addEventListener('DOMContentLoaded', () => {

  // --- Ano no rodapé ---
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // --- Observer de fade-in reutilizável ---
  const appearObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  function observeFade(el) {
    el.classList.add('fade-in');
    appearObserver.observe(el);
  }

  document.querySelectorAll('section, .project-card, .skill-category, form').forEach(observeFade);

  // --- Repositórios do GitHub (dinâmico) ---
  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function repoCard(r) {
    const el = document.createElement('article');
    el.className = 'project-card repo-card';
    const lang = r.language;
    const langHtml = lang
      ? `<span class="lang"><span class="lang-dot" style="background:${LANG_COLORS[lang] || '#888'}"></span>${escapeHtml(lang)}</span>`
      : '';
    const topics = (r.topics || []).slice(0, 4).map(t => `<span>${escapeHtml(t)}</span>`).join('');
    const homepage = r.homepage
      ? `<a href="${r.homepage}" target="_blank" rel="noopener noreferrer" class="project-link">Demo <i class="fas fa-external-link-alt"></i></a>`
      : '';
    el.innerHTML = `
      <div class="project-info">
        <h4><i class="fas fa-folder-open"></i> ${escapeHtml(r.name)}</h4>
        <p>${r.description ? escapeHtml(r.description) : 'Sem descrição.'}</p>
        <div class="project-tech">${topics}</div>
        <div class="repo-meta">
          ${langHtml}
          <span class="stars"><i class="fas fa-star"></i> ${r.stargazers_count}</span>
        </div>
        <div class="repo-links">
          <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">Ver no GitHub <i class="fab fa-github"></i></a>
          ${homepage}
        </div>
      </div>`;
    return el;
  }

  async function loadRepos() {
    const grid = document.getElementById('repos-grid');
    if (!grid) return;
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error('GitHub API');
      let repos = await res.json();
      repos = repos.filter(r => !r.fork && r.name.toLowerCase() !== GITHUB_USER.toLowerCase());
      repos.sort((a, b) =>
        (b.stargazers_count - a.stargazers_count) ||
        (new Date(b.updated_at) - new Date(a.updated_at))
      );
      grid.innerHTML = '';
      if (!repos.length) {
        grid.innerHTML = '<p class="repos-loading">Nenhum repositório público encontrado.</p>';
        return;
      }
      repos.forEach(r => {
        const card = repoCard(r);
        grid.appendChild(card);
        observeFade(card);
      });
    } catch (err) {
      grid.innerHTML = `<p class="repos-loading">Não foi possível carregar os repositórios agora. ` +
        `<a href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" rel="noopener noreferrer">Ver todos no GitHub</a>.</p>`;
    }
  }
  loadRepos();

  // --- Formulário de contato (via mailto) ---
  const form = document.getElementById('form-contato');
  const formStatus = document.querySelector('.form-status');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      [nameError, emailError, messageError].forEach(el => el.textContent = '');
      formStatus.textContent = '';
      formStatus.classList.remove('success', 'error');

      let valid = true;
      if (!name) { nameError.textContent = 'Digite seu nome.'; valid = false; }
      if (!email) { emailError.textContent = 'Digite seu e-mail.'; valid = false; }
      else if (!validateEmail(email)) { emailError.textContent = 'E-mail inválido.'; valid = false; }
      if (!message) { messageError.textContent = 'Digite sua mensagem.'; valid = false; }

      if (!valid) {
        formStatus.textContent = 'Corrija os campos destacados.';
        formStatus.classList.add('error');
        return;
      }

      const subject = encodeURIComponent(`Contato do portfólio — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:Felipe_Caires_Jaques@protonmail.com?subject=${subject}&body=${body}`;
      formStatus.textContent = 'Abrindo seu aplicativo de e-mail…';
      formStatus.classList.add('success');
      form.reset();
    });
  }

  // --- Barras de progresso ---
  const skillSection = document.getElementById('habilidades');
  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.progress-bar').forEach(bar => {
          const w = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = w; }, 100);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    skillObserver.observe(skillSection);
  }

  // --- Scroll spy ---
  const navLinks = document.querySelectorAll('nav a');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-50% 0px -49% 0px' });
  document.querySelectorAll('section').forEach(s => spyObserver.observe(s));

  // --- Efeito máquina de escrever ---
  const tw = document.querySelector('.typewriter-text');
  if (tw) {
    const text = tw.textContent;
    tw.textContent = '';
    let i = 0;
    (function type() {
      if (i < text.length) {
        tw.textContent += text.charAt(i++);
        setTimeout(type, 90);
      } else {
        tw.style.borderRight = 'none';
      }
    })();
  }
});
