// JavaScript principal para funcionalidades do site

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            // Alterar ícone do menu
            toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Fecha menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu) menu.classList.remove('open');
            if (toggle) toggle.textContent = '☰';
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (menu && toggle && 
            !menu.contains(e.target) && 
            !toggle.contains(e.target) && 
            menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.textContent = '☰';
        }
    });

    // Funcionalidade de arrastar para rolagem horizontal dos cursos
    const cursosScroll = document.getElementById('cursosScroll');
    
    if (cursosScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        cursosScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            cursosScroll.style.cursor = 'grabbing';
            startX = e.pageX - cursosScroll.offsetLeft;
            scrollLeft = cursosScroll.scrollLeft;
        });

        cursosScroll.addEventListener('mouseleave', () => {
            isDown = false;
            cursosScroll.style.cursor = 'grab';
        });

        cursosScroll.addEventListener('mouseup', () => {
            isDown = false;
            cursosScroll.style.cursor = 'grab';
        });

        cursosScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cursosScroll.offsetLeft;
            const walk = (x - startX) * 2;
            cursosScroll.scrollLeft = scrollLeft - walk;
        });

        // Também funciona com toque em dispositivos móveis
        cursosScroll.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - cursosScroll.offsetLeft;
            scrollLeft = cursosScroll.scrollLeft;
        });

        cursosScroll.addEventListener('touchend', () => {
            isDown = false;
        });

        cursosScroll.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - cursosScroll.offsetLeft;
            const walk = (x - startX) * 2;
            cursosScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // Formulário de contato
    const contatoForm = document.getElementById('contatoForm');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(contatoForm);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.nome || !data.email || !data.mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simulação de envio
            alert(`Obrigada, ${data.nome}! Sua mensagem foi enviada com sucesso.\nAssunto: ${data.assunto || 'Sem assunto'}\n\nEm breve entrarei em contato!`);
            
            // Resetar formulário
            contatoForm.reset();
            
            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animação de elementos ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.card, .curso-card, .section-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Atualizar ano no copyright
    const copyrightElement = document.querySelector('footer');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        const copyrightText = `© ${currentYear} Geminomi ジ - Todos os direitos reservados`;
        
        // Verificar se já tem o ano atual
        if (!copyrightElement.textContent.includes(currentYear.toString())) {
            copyrightElement.innerHTML = copyrightElement.innerHTML.replace(
                /© \d{4}/,
                `© ${currentYear}`
            );
        }
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe ao header ao fazer scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'saturate(180%) blur(10px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.6)';
            header.style.backdropFilter = 'saturate(140%) blur(8px)';
        }
        
        lastScrollTop = scrollTop;
    });
});