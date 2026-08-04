# 👨‍💻 Portfólio — Felipe Caires Jaques

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Portfólio pessoal (one-page) de **Felipe Caires Jaques** — desenvolvedor em transição de
> carreira para **Inteligência Artificial e Dados**, com foco em avaliação de qualidade de
> IA, testes de chatbots e análise de dados.
>
> Visual escuro e cinematográfico, **bilíngue PT/EN**, feito com HTML, CSS e JavaScript
> puro — sem frameworks, sem build e sem dependências.

🔗 **Acesse:** https://felipecj07.github.io/Mini_site_portifolio/

---

## ✨ O que tem no site

- 🎬 **Apresentação em tela cheia** com o nome, a área de atuação e chamadas diretas
- 🖼️ **Projetos em destaque** — um painel por projeto, com a imagem real da aplicação,
  a stack usada e links para a demo ao vivo e o código
- 🔄 **Todos os repositórios** listados automaticamente pela API do GitHub, com linguagem,
  tópicos e estrelas — nunca fica desatualizado
- 🙋 **Sobre** e **Skills** organizadas por área (desenvolvimento, IA & dados, ferramentas)
- ✉️ **Contato** com formulário (abre o e-mail via `mailto`) e links de GitHub e LinkedIn
- 🌍 **Bilíngue PT/EN**, com detecção do idioma do navegador e escolha memorizada
- ♿ **Acessível (WCAG AA)** — contraste conferido, navegação por teclado, skip-link,
  HTML semântico e foco visível
- 📱 **Responsivo de 320px a 4K** e com `prefers-reduced-motion` respeitado

## 🛠️ Tecnologias

HTML5 · CSS3 (custom properties, grid, `clamp()`) · JavaScript vanilla · GitHub REST API ·
Google Fonts (Anton + Inter) · ícones em SVG inline

## 🚀 Rodando localmente

O site busca os repositórios via `fetch`, então sirva os arquivos em vez de abrir o
`index.html` pelo `file://`:

```bash
python -m http.server 8000
```

Depois acesse <http://localhost:8000>.

## 📂 Estrutura

```
├── index.html              # estrutura semântica (sem texto — só marcadores data-i18n)
├── favicon.svg
├── sitemap.xml
├── .nojekyll               # impede o Jekyll de processar o site no Pages
└── assets/
    ├── css/style.css       # design system + layout + responsivo
    ├── img/og-cover.png    # card 1200x630 para preview em redes sociais
    └── js/
        ├── i18n.js         # 👈 TODOS os textos do site (PT e EN)
        └── main.js         # nav, menu, animações, repositórios, formulário
```

## ✏️ Como editar o conteúdo

### Textos

**Todo** o texto do site vive em [`assets/js/i18n.js`](assets/js/i18n.js), em dois
dicionários (`pt` e `en`). O `index.html` não contém texto — os elementos são marcados com:

| Atributo | O que faz |
|---|---|
| `data-i18n="chave"` | preenche o `textContent` |
| `data-i18n-html="chave"` | preenche o `innerHTML` (permite `<strong>`, `<br>`) |
| `data-i18n-attr="attr:chave"` | preenche atributos (`alt`, `placeholder`, `aria-label`) |

Para mudar uma frase, edite as duas versões (`pt` e `en`) da mesma chave. Para adicionar um
texto novo, crie a chave nos dois dicionários e referencie no HTML.

> O `i18n.js` é carregado de forma **síncrona** no `<head>` de propósito: assim o idioma é
> aplicado antes do primeiro paint e não há "flash" de conteúdo não traduzido.

### Cor de destaque

Troque uma linha em [`assets/css/style.css`](assets/css/style.css):

```css
:root {
  --accent: #FCAF17;     /* cor de destaque */
  --accent-ink: #0a0a0a; /* cor do texto EM CIMA do accent */
}
```

Se escolher um accent escuro, ajuste `--accent-ink` para um tom claro para manter o
contraste AA.

### Projetos em destaque

Os 5 painéis ficam em `index.html` (bloco `<section id="projetos">`). Cada painel tem
imagem, tags e links fixos no HTML; **apenas o nome e o pitch** vêm do `i18n.js`
(chaves `proj.*`). Os demais repositórios aparecem sozinhos na seção de repositórios —
não precisa mexer em nada.

## 🌐 Deploy (GitHub Pages)

Site estático servido direto da branch `main`, pasta raiz (`/`) — **não há build nem
GitHub Action**. Todo push na `main` republica o site em cerca de um minuto.

Todos os caminhos internos são **relativos** (`assets/…`, `favicon.svg`), então o site
funciona tanto em `usuario.github.io/repo/` quanto em um domínio próprio.

> **Nota:** o `robots.txt` só é respeitado na raiz do domínio
> (`felipecj07.github.io/robots.txt`), que pertence ao repositório de perfil — por isso
> ele não existe aqui. O `sitemap.xml` funciona normalmente.

## 📄 Licença

Distribuído sob a licença **MIT**. Veja [LICENSE](LICENSE).
