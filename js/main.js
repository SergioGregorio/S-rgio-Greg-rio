/**
 * Lógica principal do Portfólio
 * Autor: Sérgio Gregório Jr.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. SISTEMA DE TEMA (AUTO + MANUAL)
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para atualizar o texto do botão
    const updateButtonText = (isDark) => {
        if(themeToggle) themeToggle.innerText = isDark ? '☀️ Claro' : '🌙 Escuro';
    };

    // 1. Verifica se tem preferência salva no LocalStorage
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Verifica a preferência do SISTEMA Operacional
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Lógica de decisão inicial
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        updateButtonText(true);
    } else {
        body.classList.remove('dark-mode');
        updateButtonText(false);
    }

    // Evento de clique no botão
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Atualiza texto e salva escolha do usuário
            updateButtonText(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    /* =========================================
       2. CARROSSEL DE PROJETOS
       ========================================= */
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardWidth = track.querySelector('.project-card').offsetWidth;
            track.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const cardWidth = track.querySelector('.project-card').offsetWidth;
            track.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
        });
    }

    /* =========================================
       3. ANIMAÇÕES DE SCROLL (REVEAL)
       ========================================= */
    // Seleciona elementos que queremos animar ao rolar
    const revealElements = document.querySelectorAll('section h2, .section-subtitle, .about-card, .skills-wrapper, .carousel-container, .hero-btns');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-element'); // Adiciona classe base CSS
        scrollObserver.observe(el);
    });

    // Animação especial para a Hero (entrada inicial)
    const heroContent = document.querySelector('.hero');
    if(heroContent) {
        heroContent.classList.add('hero-enter');
    }
});

/* =========================================
       4. MENU MOBILE
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        // Abrir/Fechar menu ao clicar no hambúrguer
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }