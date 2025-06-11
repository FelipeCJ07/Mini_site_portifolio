// script.js - Mini-Site Portfólio FCJ - Sênior com Cores de Tecnologia

document.addEventListener("DOMContentLoaded", () => {

  // --- Atualiza o ano no rodapé ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Validação e Envio de Formulário (Simulado) ---
  const form = document.getElementById("form-contato");
  const formStatus = document.querySelector(".form-status");

  if (form) { // Garante que o formulário existe na página
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      let isValid = true;
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageTextarea = form.querySelector('textarea[name="message"]');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // Limpa mensagens de erro e status anteriores
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formStatus.textContent = '';
      formStatus.classList.remove('success', 'error');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageTextarea.value.trim();

      // Validação de Nome
      if (!name) {
        nameError.textContent = 'Por favor, digite seu nome.';
        isValid = false;
      }

      // Validação de E-mail
      if (!email) {
        emailError.textContent = 'Por favor, digite seu e-mail.';
        isValid = false;
      } else if (!validateEmail(email)) {
        emailError.textContent = 'Por favor, insira um e-mail válido.';
        isValid = false;
      }

      // Validação de Mensagem
      if (!message) {
        messageError.textContent = 'Por favor, digite sua mensagem.';
        isValid = false;
      }

      if (!isValid) {
        formStatus.textContent = 'Por favor, corrija os erros no formulário.';
        formStatus.classList.add('error');
        return;
      }

      // Simulação de envio assíncrono
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      formStatus.textContent = 'Enviando sua mensagem...';

      await new Promise(resolve => setTimeout(resolve, 2500)); // Simula atraso de rede

      // Simulação de sucesso/erro (você conectaria a um backend aqui)
      const simulationSuccess = true; // Mude para false para testar o erro

      if (simulationSuccess) {
        console.log("Formulário simulado enviado com sucesso!");
        formStatus.textContent = "Mensagem enviada com sucesso! Em breve entrarei em contato.";
        formStatus.classList.add('success');
        form.reset();
      } else {
        console.error("Erro simulado no envio do formulário.");
        formStatus.textContent = "Houve um erro ao enviar sua mensagem. Tente novamente.";
        formStatus.classList.add('error');
      }

      submitButton.disabled = false;
      submitButton.textContent = 'Enviar Mensagem';
    });
  }


  // Validação de e-mail (regex aprimorada)
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // --- Efeito fade-in para seções ao rolar (IntersectionObserver) ---
  const faders = document.querySelectorAll("section, .project-card, .skill-category, form");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add("fade-in");
    appearOnScroll.observe(fader);
  });

  // --- Animação das Barras de Progresso de Habilidades ---
  const skillSection = document.getElementById('habilidades');
  const progressBars = document.querySelectorAll('.progress-bar');

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const width = bar.style.width; // Obtém a largura definida no CSS inline
          bar.style.width = '0%'; // Reseta a largura para animar novamente se visível
          setTimeout(() => { // Pequeno delay para garantir a animação
            bar.style.width = width;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }


  // --- Scroll Spy para Navegação Ativa ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -49% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // --- Efeito de Máquina de Escrever no Título Principal ---
  const typewriterElement = document.querySelector('.typewriter-text');
  if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      } else {
        typewriterElement.style.borderRight = 'none';
      }
    }
    setTimeout(typeWriter, 500);
  }


  // --- Carrossel de Testemunhos (Removido, pois não está no HTML atual) ---
  // Se você decidir adicionar uma seção de testemunhos no futuro, precisará
  // reintroduzir o código JS do carrossel aqui.

});