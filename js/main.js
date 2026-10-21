/**
 * ==============================================================================
 * PORTFÓLIO ESCOLAR - SCRIPT PRINCIPAL (JAVASCRIPT PURO / VANILLA JS)
 * ==============================================================================
 * Este arquivo controla todas as interações do site:
 * 1. Alternador de Tema Escuro e Claro com salvamento automático (localStorage)
 * 2. Menu Hambúrguer para celulares
 * 3. Destaque dinâmico dos links do menu ao rolar a página (ScrollSpy)
 * 4. Filtro por categoria na galeria de projetos
 * 5. Janela modal (popup) com detalhes ampliados dos projetos
 * 6. Validação completa do formulário de contato com alerta visual de sucesso
 * 7. Botão de voltar ao topo
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------------
   * 1. ALTERNADOR DE TEMA (MODO ESCURO / MODO CLARO)
   * ---------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Ícones SVG para Lua (escuro) e Sol (claro)
  const moonIconSvg = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
  const sunIconSvg = `
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  `;

  // Verifica se o usuário já escolheu um tema anteriormente no navegador
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.innerHTML = sunIconSvg;
  } else {
    themeIcon.innerHTML = moonIconSvg;
  }

  // Alterna o tema ao clicar no botão
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    if (isLight) {
      themeIcon.innerHTML = sunIconSvg;
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      themeIcon.innerHTML = moonIconSvg;
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });


  /* ----------------------------------------------------------------------------
   * 2. MENU HAMBÚRGUER (DISPOSITIVOS MÓVEIS / CELULARES)
   * ---------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu móvel ao clicar em qualquer link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });


  /* ----------------------------------------------------------------------------
   * 3. DESTAQUE DO MENU CONFORME A ROLAGEM DA PÁGINA (SCROLLSPY)
   * ---------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Adiciona sombra ao cabeçalho quando rolar para baixo
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Identifica qual seção está visível na tela
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  });


  /* ----------------------------------------------------------------------------
   * 4. FILTRO DE PROJETOS NA GALERIA
   * ---------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove classe ativa de todos e adiciona no botão clicado
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });


  /* ----------------------------------------------------------------------------
   * 5. MODAL INTERATIVO DE DETALHES DO PROJETO
   * ---------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSecondaryBtn = document.getElementById('modal-secondary-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalActionBtn = document.getElementById('modal-action-btn');

  // Dados detalhados dos projetos demonstrativos
  const projectsData = {
    calc: {
      title: 'EduCalc: Calculadora Escolar Inteligente',
      img: 'assets/projeto1.jpg',
      desc: 'Um protótipo demonstrativo criado para simplificar o cálculo de fórmulas matemáticas escolares, funções trigonométricas e álgebra com interface visual moderna.',
      features: [
        'Cálculo instantâneo de expressões numéricas e algébricas.',
        'Interface com suporte a botões rápidos para fórmulas comuns.',
        'Design limpo com contraste otimizado para o aprendizado dos alunos.',
        'Criado com JavaScript puro para manipulação de fórmulas no navegador.'
      ],
      demoNote: 'Este é um projeto demonstrativo de exemplo escolar.'
    },
    blog: {
      title: 'AstroTech: Portal de Ciências e Tecnologia',
      img: 'assets/projeto2.jpg',
      desc: 'Portal criado para divulgar descobertas espaciais, projetos de robótica e notícias científicas da feira de ciências da escola.',
      features: [
        'Layout com CSS Grid totalmente responsivo para tablets e celulares.',
        'Tipografia agradável para leitura prolongada de artigos.',
        'Filtragem de postagens por categorias científicas.',
        'Acessibilidade com alto contraste e navegação por teclado.'
      ],
      demoNote: 'Artigos e imagens demonstrativas geradas para o trabalho escolar.'
    },
    quiz: {
      title: 'QuizMania: Desafio Escolar de Conhecimentos',
      img: 'assets/projeto3.jpg',
      desc: 'Jogo de perguntas e respostas com sistema de pontuação, cronômetro regressivo e feedback imediato de acertos e erros.',
      features: [
        'Temporizador em tempo real para cada questão.',
        'Cálculo e exibição de pontuação final com ranking no navegador (LocalStorage).',
        'Sons visuais e animações interativas a cada acerto.',
        'Perguntas interdisciplinares sobre história, geografia e ciências.'
      ],
      demoNote: 'Jogo didático projetado para estudo e revisão de matérias.'
    }
  };

  // Abrir Modal
  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project');
      const data = projectsData[projectId];

      if (data) {
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;

        // Limpa e preenche os tópicos de recursos
        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
          const li = document.createElement('li');
          li.textContent = feat;
          modalFeatures.appendChild(li);
        });

        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Evita rolar a página de fundo
      }
    });
  });

  // Função para fechar o Modal
  const closeModal = () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modalSecondaryBtn.addEventListener('click', closeModal);

  // Fecha se clicar no fundo escuro fora do cartão
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  // Fecha se pressionar a tecla ESC no teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Ação demonstrativa do botão do modal
  modalActionBtn.addEventListener('click', () => {
    alert('📌 Nota do Trabalho Escolar:\n\nEsta é uma demonstração de exemplo fictício. Quando você desenvolver um projeto real, você poderá substituir este botão pelo link direto do seu site publicado no GitHub ou Vercel!');
  });


  /* ----------------------------------------------------------------------------
   * 6. VALIDAÇÃO DO FORMULÁRIO DE CONTATO COM FEEDBACK VISUAL
   * ---------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const toastAlert = document.getElementById('toast-alert');
  const toastMessage = document.getElementById('toast-message');

  // Expressão regular simples para testar validade do e-mail
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Função auxiliar para exibir/ocultar erros nos campos
  const setFieldError = (input, errorId, hasError) => {
    const errorElem = document.getElementById(errorId);
    if (hasError) {
      input.classList.add('is-invalid');
      if (errorElem) errorElem.classList.add('visible');
    } else {
      input.classList.remove('is-invalid');
      if (errorElem) errorElem.classList.remove('visible');
    }
  };

  // Limpa o erro assim que o usuário começar a digitar
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('is-invalid');
      const errorMsg = field.parentElement.querySelector('.form-error-msg');
      if (errorMsg) errorMsg.classList.remove('visible');
    });
  });

  // Função para exibir o alerta flutuante (Toast)
  const showToast = (text) => {
    toastMessage.textContent = text;
    toastAlert.classList.add('show');
    setTimeout(() => {
      toastAlert.classList.remove('show');
    }, 4500);
  };

  // Manipulador de envio do formulário
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    let isValid = true;

    // Validação do Nome (mínimo 3 caracteres)
    if (nameInput.value.trim().length < 3) {
      setFieldError(nameInput, 'name-error', true);
      isValid = false;
    } else {
      setFieldError(nameInput, 'name-error', false);
    }

    // Validação do E-mail
    if (!isValidEmail(emailInput.value.trim())) {
      setFieldError(emailInput, 'email-error', true);
      isValid = false;
    } else {
      setFieldError(emailInput, 'email-error', false);
    }

    // Validação do Assunto
    if (subjectInput.value.trim().length < 3) {
      setFieldError(subjectInput, 'subject-error', true);
      isValid = false;
    } else {
      setFieldError(subjectInput, 'subject-error', false);
    }

    // Validação da Mensagem (mínimo 10 caracteres)
    if (messageInput.value.trim().length < 10) {
      setFieldError(messageInput, 'message-error', true);
      isValid = false;
    } else {
      setFieldError(messageInput, 'message-error', false);
    }

    // Se houver algum erro, foca no primeiro campo inválido
    if (!isValid) {
      const firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Se estiver tudo correto: simula envio profissional com estado de carregamento
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = 'Enviar Mensagem';
      
      // Limpa os campos após o envio
      contactForm.reset();

      // Exibe a mensagem de sucesso
      showToast('Mensagem enviada com sucesso! Obrigado pelo contato.');
    }, 800);
  });


  /* ----------------------------------------------------------------------------
   * 7. BOTÃO DE VOLTAR AO TOPO DA PÁGINA
   * ---------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top-btn');

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
