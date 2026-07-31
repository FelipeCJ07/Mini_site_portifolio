/**
 * i18n.js — fonte única de todos os textos do site (PT / EN).
 * ---------------------------------------------------------------------------
 * Para editar qualquer texto do portfólio, edite APENAS este arquivo.
 * O index.html não contém texto: os elementos são marcados com
 *   data-i18n="chave"            -> preenche textContent
 *   data-i18n-html="chave"       -> preenche innerHTML (permite <strong>, <br>)
 *   data-i18n-attr="attr:chave"  -> preenche atributos (aria-label, placeholder…)
 *                                   vários separados por ";"
 *
 * Este script é carregado de forma SÍNCRONA no <head> e aplicado antes do
 * primeiro paint, evitando "flash" de conteúdo não traduzido.
 */

const STRINGS = {
  pt: {
    /* ---------- <head> / SEO ---------- */
    'meta.title': 'Felipe Caires Jaques — Desenvolvedor & Entusiasta de IA',
    'meta.description':
      'Portfólio de Felipe Caires Jaques — desenvolvedor em transição para IA e dados. Projetos em Python, TypeScript, JavaScript e integração com LLMs.',

    /* ---------- Acessibilidade ---------- */
    'a11y.skip': 'Pular para o conteúdo principal',
    'a11y.menuOpen': 'Abrir menu de navegação',
    'a11y.menuClose': 'Fechar menu de navegação',
    'a11y.top': 'Voltar ao topo',
    'a11y.langGroup': 'Selecionar idioma',
    'a11y.langPt': 'Mudar para Português',
    'a11y.langEn': 'Mudar para Inglês',
    'a11y.nav': 'Navegação principal',
    'a11y.home': 'Ir para o início',

    /* ---------- Navegação ---------- */
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',
    'nav.skills': 'Skills',
    'nav.experience': 'Experiência',
    'nav.contact': 'Contato',

    /* ---------- Hero ---------- */
    'hero.eyebrow': 'Portfólio',
    'hero.name': 'Felipe<br>Caires Jaques',
    'hero.nameFlat': 'Felipe Caires Jaques',
    'hero.tagline': 'Desenvolvedor & Entusiasta de IA / Dados',
    'hero.blurb':
      'Em transição de carreira para <strong>Inteligência Artificial</strong>, construindo projetos reais que unem dados, automação e LLMs.',
    'hero.ctaProjects': 'Ver Projetos',
    'hero.ctaContact': 'Fale Comigo',
    'hero.scroll': 'Role para baixo',

    /* ---------- Projetos em destaque ---------- */
    'projects.eyebrow': 'Trabalho selecionado',
    'projects.title': 'Projetos em Destaque',
    'projects.live': 'Ver ao vivo',
    'projects.code': 'Código',
    'projects.noDemo': 'Sem demo ao vivo',

    'proj.aiqe.name': 'AI Quality Evaluator',
    'proj.aiqe.pitch':
      'Avaliador de respostas de IA (Claude, Gemini, GPT) com rubrica ponderada de qualidade: precisão, segurança e alucinação. Modo demo + ao vivo.',
    'proj.pitchcraft.name': 'PitchCraft AI',
    'proj.pitchcraft.pitch':
      'Plataforma de inteligência comercial que gera narrativas de vendas, propostas e apresentações personalizadas por perfil de cliente.',
    'proj.burnout.name': 'BurnoutCheck IA',
    'proj.burnout.pitch':
      'Check-in de bem-estar multimodal com Gemini e detecção facial via OpenCV, em notebook Colab com interface Gradio.',
    'proj.creditcard.name': 'Validador de Cartões',
    'proj.creditcard.pitch':
      'Identifica a bandeira e valida números de cartão com o algoritmo de Luhn. React/Vite mais uma versão Python com 13 testes unitários.',
    'proj.conversor.name': 'Conversor Universal',
    'proj.conversor.pitch':
      'Conversor de unidades em JavaScript puro: 7 categorias, conversão em tempo real, histórico local e modo claro/escuro.',

    /* ---------- Newswire (repositórios) ---------- */
    'repos.eyebrow': 'Direto do GitHub',
    'repos.title': 'Todos os Repositórios',
    'repos.description':
      'Lista atualizada automaticamente via API do GitHub — nome, descrição, linguagem, tópicos e estrelas.',
    'repos.loading': 'Carregando repositórios…',
    'repos.empty': 'Nenhum repositório público encontrado.',
    'repos.error': 'Não foi possível carregar os repositórios agora.',
    'repos.errorLink': 'Ver todos no GitHub',
    'repos.noDescription': 'Sem descrição.',
    'repos.view': 'Ver no GitHub',
    'repos.demo': 'Demo',

    /* ---------- Sobre ---------- */
    'about.eyebrow': 'Quem sou',
    'about.title': 'Sobre',
    'about.p1':
      'Sou <strong>Felipe Caires Jaques</strong>, de São Paulo, em transição de carreira para <strong>Inteligência Artificial e Dados</strong> — com foco em <strong>avaliação de qualidade de IA</strong>, testes de chatbots e análise de dados.',
    'about.p2':
      'Aprendo na prática construindo projetos de verdade: de ferramentas de IA multimodal e automação com LLMs a aplicações web completas e validadores com testes. Trabalho com <strong>Python</strong>, <strong>TypeScript</strong>, <strong>JavaScript</strong> e <strong>React</strong>.',
    'about.p3':
      'Gosto de avaliar, testar e melhorar o comportamento de sistemas de IA — unindo curiosidade técnica, atenção a detalhes e foco em qualidade.',
    'about.photoAlt': 'Retrato de Felipe Caires Jaques',
    'about.location': 'São Paulo, Brasil',

    /* ---------- Skills ---------- */
    'skills.eyebrow': 'Ferramentas',
    'skills.title': 'Skills & Stack',
    'skills.description':
      'O que eu uso para construir e avaliar soluções — do front-end à inteligência artificial.',
    'skills.dev': 'Desenvolvimento',
    'skills.ai': 'IA & Dados',
    'skills.tools': 'Ferramentas',
    'skill.aiEval': 'Avaliação de Qualidade de IA',
    'skill.prompt': 'Prompt Engineering',
    'skill.llm': 'Integração de LLMs',
    'skill.dataAnalysis': 'Análise de Dados',
    'skill.apis': 'APIs REST',
    'skill.buildTools': 'Vite / Build tools',

    /* ---------- Experiência ---------- */
    'exp.eyebrow': 'Trajetória',
    'exp.title': 'Experiência',
    /* TODO: preencher — não havia dados de experiência no repositório original.
       Substitua os 3 blocos abaixo pelos seus cargos reais (ou apague a seção
       inteira do index.html se preferir não exibi-la). */
    'exp.1.role': 'TODO: preencher — Cargo',
    'exp.1.org': 'TODO: Empresa / Projeto',
    'exp.1.period': 'TODO: 20XX — Atual',
    'exp.1.bullet1': 'TODO: preencher — principal responsabilidade ou entrega.',
    'exp.1.bullet2': 'TODO: preencher — resultado concreto (número, impacto).',
    'exp.2.role': 'TODO: preencher — Cargo',
    'exp.2.org': 'TODO: Empresa / Projeto',
    'exp.2.period': 'TODO: 20XX — 20XX',
    'exp.2.bullet1': 'TODO: preencher — principal responsabilidade ou entrega.',
    'exp.2.bullet2': 'TODO: preencher — resultado concreto (número, impacto).',
    'exp.3.role': 'TODO: preencher — Formação ou Curso',
    'exp.3.org': 'TODO: Instituição',
    'exp.3.period': 'TODO: 20XX — 20XX',
    'exp.3.bullet1': 'TODO: preencher — foco de estudo.',
    'exp.3.bullet2': 'TODO: preencher — projeto ou certificação relevante.',

    /* ---------- Contato ---------- */
    'contact.eyebrow': 'Próximo passo',
    'contact.title': 'Vamos Conversar',
    'contact.description':
      'Interessado em colaborar, contratar ou trocar uma ideia? Me manda uma mensagem.',
    'contact.emailCta': 'Enviar e-mail',
    'contact.formName': 'Seu nome completo',
    'contact.formEmail': 'Seu melhor e-mail',
    'contact.formMessage': 'Escreva sua mensagem…',
    'contact.formNameLabel': 'Seu nome',
    'contact.formEmailLabel': 'Seu e-mail',
    'contact.formMessageLabel': 'Sua mensagem',
    'contact.submit': 'Enviar Mensagem',
    'contact.errName': 'Digite seu nome.',
    'contact.errEmail': 'Digite seu e-mail.',
    'contact.errEmailInvalid': 'E-mail inválido.',
    'contact.errMessage': 'Digite sua mensagem.',
    'contact.errFix': 'Corrija os campos destacados.',
    'contact.opening': 'Abrindo seu aplicativo de e-mail…',
    'contact.mailSubject': 'Contato do portfólio',
    'contact.or': 'Ou me encontre em',

    /* ---------- Footer ---------- */
    'footer.tagline': 'Desenvolvedor & Entusiasta de IA / Dados',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.built': 'Feito com HTML, CSS e JavaScript puro.',
  },

  en: {
    /* ---------- <head> / SEO ---------- */
    'meta.title': 'Felipe Caires Jaques — Developer & AI Enthusiast',
    'meta.description':
      'Portfolio of Felipe Caires Jaques — developer transitioning into AI and data. Projects in Python, TypeScript, JavaScript and LLM integration.',

    /* ---------- Accessibility ---------- */
    'a11y.skip': 'Skip to main content',
    'a11y.menuOpen': 'Open navigation menu',
    'a11y.menuClose': 'Close navigation menu',
    'a11y.top': 'Back to top',
    'a11y.langGroup': 'Select language',
    'a11y.langPt': 'Switch to Portuguese',
    'a11y.langEn': 'Switch to English',
    'a11y.nav': 'Main navigation',
    'a11y.home': 'Go to top',

    /* ---------- Navigation ---------- */
    'nav.projects': 'Work',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',

    /* ---------- Hero ---------- */
    'hero.eyebrow': 'Portfolio',
    'hero.name': 'Felipe<br>Caires Jaques',
    'hero.nameFlat': 'Felipe Caires Jaques',
    'hero.tagline': 'Developer & AI / Data Enthusiast',
    'hero.blurb':
      'Transitioning into <strong>Artificial Intelligence</strong>, building real projects that bring together data, automation and LLMs.',
    'hero.ctaProjects': 'View Projects',
    'hero.ctaContact': 'Get in Touch',
    'hero.scroll': 'Scroll down',

    /* ---------- Featured projects ---------- */
    'projects.eyebrow': 'Selected work',
    'projects.title': 'Featured Projects',
    'projects.live': 'View live',
    'projects.code': 'Source',
    'projects.noDemo': 'No live demo',

    'proj.aiqe.name': 'AI Quality Evaluator',
    'proj.aiqe.pitch':
      'Evaluates AI answers (Claude, Gemini, GPT) against a weighted quality rubric: accuracy, safety and hallucination. Demo and live modes.',
    'proj.pitchcraft.name': 'PitchCraft AI',
    'proj.pitchcraft.pitch':
      'Sales intelligence platform that generates sales narratives, proposals and presentations tailored to each customer profile.',
    'proj.burnout.name': 'BurnoutCheck AI',
    'proj.burnout.pitch':
      'Multimodal wellbeing check-in powered by Gemini and OpenCV face detection, in a Colab notebook with a Gradio interface.',
    'proj.creditcard.name': 'Credit Card Validator',
    'proj.creditcard.pitch':
      'Detects the card brand and validates numbers with the Luhn algorithm. React/Vite plus a Python version with 13 unit tests.',
    'proj.conversor.name': 'Universal Converter',
    'proj.conversor.pitch':
      'Unit converter in vanilla JavaScript: 7 categories, real-time conversion, local history and light/dark mode.',

    /* ---------- Newswire (repositories) ---------- */
    'repos.eyebrow': 'Straight from GitHub',
    'repos.title': 'All Repositories',
    'repos.description':
      'Automatically kept up to date through the GitHub API — name, description, language, topics and stars.',
    'repos.loading': 'Loading repositories…',
    'repos.empty': 'No public repositories found.',
    'repos.error': 'Could not load the repositories right now.',
    'repos.errorLink': 'See them all on GitHub',
    'repos.noDescription': 'No description.',
    'repos.view': 'View on GitHub',
    'repos.demo': 'Demo',

    /* ---------- About ---------- */
    'about.eyebrow': 'Who I am',
    'about.title': 'About',
    'about.p1':
      "I'm <strong>Felipe Caires Jaques</strong>, based in São Paulo, transitioning into <strong>Artificial Intelligence and Data</strong> — focused on <strong>AI quality evaluation</strong>, chatbot testing and data analysis.",
    'about.p2':
      'I learn by building real things: from multimodal AI tools and LLM automation to full web applications and tested validators. I work with <strong>Python</strong>, <strong>TypeScript</strong>, <strong>JavaScript</strong> and <strong>React</strong>.',
    'about.p3':
      'I enjoy evaluating, testing and improving how AI systems behave — combining technical curiosity, attention to detail and a focus on quality.',
    'about.photoAlt': 'Portrait of Felipe Caires Jaques',
    'about.location': 'São Paulo, Brazil',

    /* ---------- Skills ---------- */
    'skills.eyebrow': 'Toolbox',
    'skills.title': 'Skills & Stack',
    'skills.description':
      'What I use to build and evaluate solutions — from the front-end to artificial intelligence.',
    'skills.dev': 'Development',
    'skills.ai': 'AI & Data',
    'skills.tools': 'Tools',
    'skill.aiEval': 'AI Quality Evaluation',
    'skill.prompt': 'Prompt Engineering',
    'skill.llm': 'LLM Integration',
    'skill.dataAnalysis': 'Data Analysis',
    'skill.apis': 'REST APIs',
    'skill.buildTools': 'Vite / Build tools',

    /* ---------- Experience ---------- */
    'exp.eyebrow': 'Track record',
    'exp.title': 'Experience',
    /* TODO: fill in — no experience data existed in the original repository. */
    'exp.1.role': 'TODO: fill in — Role',
    'exp.1.org': 'TODO: Company / Project',
    'exp.1.period': 'TODO: 20XX — Present',
    'exp.1.bullet1': 'TODO: fill in — main responsibility or deliverable.',
    'exp.1.bullet2': 'TODO: fill in — concrete result (number, impact).',
    'exp.2.role': 'TODO: fill in — Role',
    'exp.2.org': 'TODO: Company / Project',
    'exp.2.period': 'TODO: 20XX — 20XX',
    'exp.2.bullet1': 'TODO: fill in — main responsibility or deliverable.',
    'exp.2.bullet2': 'TODO: fill in — concrete result (number, impact).',
    'exp.3.role': 'TODO: fill in — Education or Course',
    'exp.3.org': 'TODO: Institution',
    'exp.3.period': 'TODO: 20XX — 20XX',
    'exp.3.bullet1': 'TODO: fill in — field of study.',
    'exp.3.bullet2': 'TODO: fill in — relevant project or certification.',

    /* ---------- Contact ---------- */
    'contact.eyebrow': 'Next step',
    'contact.title': "Let's Talk",
    'contact.description':
      'Interested in collaborating, hiring or just exchanging ideas? Send me a message.',
    'contact.emailCta': 'Send an email',
    'contact.formName': 'Your full name',
    'contact.formEmail': 'Your best email',
    'contact.formMessage': 'Write your message…',
    'contact.formNameLabel': 'Your name',
    'contact.formEmailLabel': 'Your email',
    'contact.formMessageLabel': 'Your message',
    'contact.submit': 'Send Message',
    'contact.errName': 'Please enter your name.',
    'contact.errEmail': 'Please enter your email.',
    'contact.errEmailInvalid': 'Invalid email address.',
    'contact.errMessage': 'Please write a message.',
    'contact.errFix': 'Please fix the highlighted fields.',
    'contact.opening': 'Opening your email app…',
    'contact.mailSubject': 'Portfolio contact',
    'contact.or': 'Or find me on',

    /* ---------- Footer ---------- */
    'footer.tagline': 'Developer & AI / Data Enthusiast',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with plain HTML, CSS and JavaScript.',
  },
};

const SUPPORTED = Object.keys(STRINGS);
const FALLBACK = 'pt';
const STORAGE_KEY = 'fcj-lang';

/** Idioma salvo > idioma do navegador > PT. */
function detectLang() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* localStorage bloqueado (modo privado / cookies desativados) */
  }
  if (stored && SUPPORTED.includes(stored)) return stored;

  const navLangs = navigator.languages || [navigator.language || ''];
  for (const raw of navLangs) {
    const base = String(raw).toLowerCase().split('-')[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return FALLBACK;
}

const I18N = {
  lang: FALLBACK,

  /** Traduz uma chave; cai no PT e, por último, na própria chave. */
  t(key) {
    const dict = STRINGS[this.lang] || STRINGS[FALLBACK];
    return dict[key] ?? STRINGS[FALLBACK][key] ?? key;
  },

  /** Aplica as traduções a uma raiz (documento inteiro por padrão). */
  apply(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = this.t(el.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = this.t(el.dataset.i18nHtml);
    });
    root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s && s.trim());
        if (attr && key) el.setAttribute(attr, this.t(key));
      });
    });
  },

  /** Troca o idioma, persiste e reaplica tudo. */
  set(lang) {
    if (!SUPPORTED.includes(lang)) return;
    this.lang = lang;

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = this.t('meta.title');

    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', value);
    };
    setMeta('meta[name="description"]', this.t('meta.description'));
    setMeta('meta[property="og:title"]', this.t('meta.title'));
    setMeta('meta[property="og:description"]', this.t('meta.description'));
    setMeta('meta[property="og:locale"]', lang === 'pt' ? 'pt_BR' : 'en_US');
    setMeta('meta[name="twitter:title"]', this.t('meta.title'));
    setMeta('meta[name="twitter:description"]', this.t('meta.description'));

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignora: apenas não persiste */
    }

    this.apply();
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const active = btn.dataset.langBtn === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  },

  init() {
    this.set(detectLang());
  },
};

window.I18N = I18N;
