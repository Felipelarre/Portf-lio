// ====== Variáveis Globais ======
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const backToTopButton = document.getElementById('back-to-top');
    const typingElement = document.getElementById('typing');
    const contactForm = document.getElementById('contactForm');

    // ====== Função de Inicialização ======
    document.addEventListener('DOMContentLoaded', () => {
      // Inicializa particles.js
      if (window.particlesJS) {
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#6366f1"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#6366f1",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }

      // Define o ano atual no rodapé
      const currentYearSpan = document.getElementById('currentYear');
      if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
      }

      // Carrega o tema salvo no localStorage
      loadTheme();
      // Inicia o efeito de digitação
      startTypingEffect();
      
      // Ativa links do menu
      activateMenuLinks();
    });

    // ====== Efeito de Digitação ======
    const phrases = ["Desenvolvedor Front-End", "UI/UX Designer", "Criador de Experiências Digitais"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 100;
      } else {
        typingSpeed = isDeleting ? 50 : 100;
      }

      setTimeout(type, typingSpeed);
    }

    function startTypingEffect() {
      if (typingElement) {
        type();
      }
    }

    // ====== Navegação Responsiva (Menu Hamburguer) ======
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Ativar links do menu
    function activateMenuLinks() {
      const links = navLinks.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          // Remove a classe ativa de todos os links
          links.forEach(l => l.classList.remove('active'));
          
          // Adiciona a classe ativa ao link clicado
          link.classList.add('active');
          
          // Fecha o menu mobile após clicar
          navLinks.classList.remove('show');
          menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
          
          // Rola suavemente para a seção
          const targetId = link.getAttribute('href');
          if (targetId !== '#') {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
              window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }

    // ====== Tema Claro/Escuro ======
    themeToggle.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleIcon(newTheme);
    });

    function loadTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeToggleIcon(savedTheme);
    }

    function updateThemeToggleIcon(theme) {
      const icon = themeToggle.querySelector('i');
      if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }

    // ====== Botão Voltar ao Topo ======
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    

    // ====== Formulário de Contato ======
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Coleta os dados do formulário
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Validação dos campos obrigatórios
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Por favor, preencha os campos Nome e Mensagem!');
      return;
    }

    // Construção da mensagem para WhatsApp
    const whatsappMessage = `Novo Contato do Portfólio!\n\nNome: ${formData.name}\nE-mail: ${formData.email}\nAssunto: ${formData.subject}\nMensagem: ${formData.message}`;
    
    // Codificação da mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Número de WhatsApp (Brasil, Pernambuco)
    const whatsappNumber = '5581992315619';
    
    // Geração do link do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');

    // Exibe mensagem de sucesso
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    submitBtn.style.background = '#10b981';
    submitBtn.disabled = true;

    // Reset após 3 segundos
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });
}