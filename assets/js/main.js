/**
 * main.js — comportamento do portfólio.
 * Carregado com `defer`, portanto o DOM já está pronto quando este código roda.
 *
 * Blocos: idioma · nav · menu mobile · reveal on scroll · parallax ·
 *         scroll spy · repositórios do GitHub · formulário · voltar ao topo.
 */

const GITHUB_USER = 'FelipeCJ07';
const CONTACT_EMAIL = 'Felipe_Caires_Jaques@protonmail.com';

/* Cores oficiais de linguagem do GitHub (as que aparecem nos repositórios). */
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051',
  Java: '#b07219',
  'C#': '#178600',
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ------------------------------------------------------------- idioma ---- */
I18N.init();

$$('[data-lang-btn]').forEach((btn) => {
  btn.addEventListener('click', () => I18N.set(btn.dataset.langBtn));
});

/* ---------------------------------------------------------------- ano ---- */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ---------------------------------------------------- nav sólida ao rolar - */
const nav = $('#nav');
const toTop = $('#to-top');

function onScrollChrome() {
  const y = window.scrollY;
  if (nav) nav.classList.toggle('is-solid', y > 40);
  if (toTop) toTop.classList.toggle('is-visible', y > window.innerHeight * 0.8);
}
onScrollChrome();

/* --------------------------------------------------- parallax sutil ------ */
const heroBg = $('.hero__bg');
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    onScrollChrome();
    if (heroBg && !prefersReducedMotion) {
      // Move o fundo a ~18% da velocidade do scroll, só enquanto o hero é visível.
      const y = Math.min(window.scrollY, window.innerHeight);
      heroBg.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    }
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });

/* -------------------------------------------------------- menu mobile ---- */
const burger = $('#burger');
const mobile = $('#mobile-menu');

function setMenu(open) {
  if (!burger || !mobile) return;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', I18N.t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
  document.body.classList.toggle('is-locked', open);

  if (open) {
    mobile.hidden = false;
    requestAnimationFrame(() => mobile.classList.add('is-open'));
    const first = $('a', mobile);
    if (first) first.focus();
  } else {
    mobile.classList.remove('is-open');
    const hide = () => { mobile.hidden = true; };
    prefersReducedMotion ? hide() : setTimeout(hide, 280);
  }
}

if (burger && mobile) {
  burger.addEventListener('click', () => {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  $$('a', mobile).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });
}

/* O aria-label do burger depende do idioma: reaplica ao trocar. */
document.addEventListener('langchange', () => {
  if (!burger) return;
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-label', I18N.t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
});

/* ---------------------------------------------------- reveal on scroll --- */
const revealObserver =
  'IntersectionObserver' in window && !prefersReducedMotion
    ? new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
    : null;

function observeReveal(el) {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add('is-visible');
}
$$('.reveal').forEach(observeReveal);

/* Rede de segurança: nada pode ficar invisível se o observer falhar
   (acontece em webviews internos de apps como o LinkedIn). */
setTimeout(() => {
  $$('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
}, 2500);

/* ------------------------------------------ imagens de painel quebradas -- */
$$('.panel__media img').forEach((img) => {
  img.addEventListener('error', () => img.classList.add('is-broken'), { once: true });
});

/* --------------------------------------------------------- scroll spy --- */
const navLinks = $$('.nav__links a');
if (navLinks.length && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  ['projetos', 'sobre', 'skills', 'contato'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
}

/* ------------------------------------------- repositórios (GitHub API) --- */
const reposGrid = $('#repos-grid');
let reposCache = null;

function icon(id) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#${id}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.appendChild(use);
  return svg;
}

/** Só aceita http(s) — evita esquemas perigosos vindos do campo `homepage`. */
function safeUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}

function buildCard(repo) {
  const card = document.createElement('article');
  card.className = 'card';

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.appendChild(icon('i-folder'));
  title.appendChild(document.createTextNode(repo.name));

  const desc = document.createElement('p');
  desc.className = 'card__desc';
  desc.textContent = repo.description || I18N.t('repos.noDescription');

  const meta = document.createElement('div');
  meta.className = 'card__meta';

  if (repo.language) {
    const lang = document.createElement('span');
    lang.className = 'card__lang';
    const dot = document.createElement('span');
    dot.className = 'card__dot';
    dot.style.background = LANG_COLORS[repo.language] || '#888';
    lang.append(dot, document.createTextNode(repo.language));
    meta.appendChild(lang);
  }

  const stars = document.createElement('span');
  stars.className = 'card__stars';
  stars.appendChild(icon('i-star'));
  stars.appendChild(document.createTextNode(String(repo.stargazers_count)));
  meta.appendChild(stars);

  const links = document.createElement('div');
  links.className = 'card__links';

  const repoLink = document.createElement('a');
  repoLink.href = repo.html_url;
  repoLink.target = '_blank';
  repoLink.rel = 'noopener noreferrer';
  repoLink.append(document.createTextNode(I18N.t('repos.view')), icon('i-github'));
  links.appendChild(repoLink);

  const demo = repo.homepage ? safeUrl(repo.homepage) : null;
  if (demo) {
    const demoLink = document.createElement('a');
    demoLink.href = demo;
    demoLink.target = '_blank';
    demoLink.rel = 'noopener noreferrer';
    demoLink.append(document.createTextNode(I18N.t('repos.demo')), icon('i-external'));
    links.appendChild(demoLink);
  }

  card.append(title, desc, meta, links);
  return card;
}

function renderRepos() {
  if (!reposGrid || !reposCache) return;
  reposGrid.textContent = '';

  if (!reposCache.length) {
    const p = document.createElement('p');
    p.className = 'cards__status';
    p.textContent = I18N.t('repos.empty');
    reposGrid.appendChild(p);
    return;
  }
  const frag = document.createDocumentFragment();
  reposCache.forEach((r) => frag.appendChild(buildCard(r)));
  reposGrid.appendChild(frag);
}

function renderReposError() {
  if (!reposGrid) return;
  reposGrid.textContent = '';
  const p = document.createElement('p');
  p.className = 'cards__status';
  p.textContent = `${I18N.t('repos.error')} `;
  const a = document.createElement('a');
  a.href = `https://github.com/${GITHUB_USER}?tab=repositories`;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = I18N.t('repos.errorLink');
  p.appendChild(a);
  reposGrid.appendChild(p);
}

async function loadRepos() {
  if (!reposGrid) return;
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      { signal: ctrl.signal }
    );
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`GitHub API respondeu ${res.status}`);

    const repos = await res.json();
    reposCache = repos
      .filter((r) => !r.fork && r.name.toLowerCase() !== GITHUB_USER.toLowerCase())
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at) - new Date(a.updated_at)
      );
    renderRepos();
  } catch {
    renderReposError();
  } finally {
    reposGrid.setAttribute('aria-busy', 'false');
  }
}
loadRepos();

/* Re-renderiza os cards (textos "Ver no GitHub", "Demo"…) ao trocar de idioma. */
document.addEventListener('langchange', () => {
  if (reposCache) renderRepos();
});

/* ---------------------------------------------------------- formulário --- */
const form = $('#contact-form');
const status = $('#form-status');

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
    };
    const errors = {
      name: $('#name-error'),
      email: $('#email-error'),
      message: $('#message-error'),
    };

    Object.values(errors).forEach((el) => { el.textContent = ''; });
    status.textContent = '';
    status.classList.remove('is-ok', 'is-error');

    let valid = true;
    if (!fields.name) { errors.name.textContent = I18N.t('contact.errName'); valid = false; }
    if (!fields.email) { errors.email.textContent = I18N.t('contact.errEmail'); valid = false; }
    else if (!isEmail(fields.email)) { errors.email.textContent = I18N.t('contact.errEmailInvalid'); valid = false; }
    if (!fields.message) { errors.message.textContent = I18N.t('contact.errMessage'); valid = false; }

    if (!valid) {
      status.textContent = I18N.t('contact.errFix');
      status.classList.add('is-error');
      return;
    }

    const subject = encodeURIComponent(`${I18N.t('contact.mailSubject')} — ${fields.name}`);
    const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    status.textContent = I18N.t('contact.opening');
    status.classList.add('is-ok');
    form.reset();
  });
}

/* ------------------------------------------------------- voltar ao topo -- */
if (toTop) {
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}
