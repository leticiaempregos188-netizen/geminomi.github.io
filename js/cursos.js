// JavaScript específico para as páginas de cursos

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const toggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (toggle && navContainer) {
        toggle.addEventListener('click', function() {
            navContainer.classList.toggle('open');
            // Alterar ícone do menu
            toggle.textContent = navContainer.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link, .cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navContainer) navContainer.classList.remove('open');
            if (toggle) toggle.textContent = '☰';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navContainer && toggle && 
            !navContainer.contains(e.target) && 
            !toggle.contains(e.target) && 
            navContainer.classList.contains('open')) {
            navContainer.classList.remove('open');
            toggle.textContent = '☰';
        }
    });

    // Controle dos módulos (abrir/fechar)
    document.querySelectorAll('.modulo-titulo').forEach(titulo => {
        titulo.addEventListener('click', () => {
            const modulo = titulo.parentElement;
            modulo.classList.toggle('ativo');
           
            // Alterna o ícone
            const icon = titulo.querySelector('span');
            if (modulo.classList.contains('ativo')) {
                icon.textContent = '▼';
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.textContent = '▶';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Marcar aula como concluída
    document.querySelectorAll('.aula').forEach(aula => {
        aula.addEventListener('click', function() {
            // Remove a classe 'ativa' de todas as aulas
            document.querySelectorAll('.aula').forEach(a => {
                a.classList.remove('ativa');
            });
            
            // Adiciona a classe 'ativa' à aula clicada
            this.classList.add('ativa');
            
            // Marca como concluída
            if (!this.classList.contains('aula-concluida')) {
                this.classList.add('aula-concluida');
                const numero = this.querySelector('.aula-numero');
                if (numero && numero.textContent !== '✓') {
                    numero.textContent = '✓';
                }
                
                // Atualiza a barra de progresso
                atualizarProgresso();
            }
        });
    });

    // Função para atualizar a barra de progresso
    function atualizarProgresso() {
        const totalAulas = document.querySelectorAll('.aula').length;
        const aulasConcluidas = document.querySelectorAll('.aula-concluida').length;
        
        if (totalAulas > 0) {
            const progresso = (aulasConcluidas / totalAulas) * 100;
            const progressoBar = document.querySelector('.progresso-bar');
            
            if (progressoBar) {
                progressoBar.style.width = `${progresso}%`;
                
                // Atualizar texto de progresso
                const progressoText = document.querySelector('.aula-cabecalho p:last-child');
                if (progressoText) {
                    progressoText.textContent = `Progresso: ${aulasConcluidas}/${totalAulas} aulas concluídas (${Math.round(progresso)}%)`;
                }
            }
        }
    }

    // Inicializar progresso
    atualizarProgresso();

    // Smooth scroll para seções internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar efeito de hover nas imagens
    const imagens = document.querySelectorAll('.passo-imagem img');
    imagens.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animação ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animação específica para passos
                if (entry.target.classList.contains('passo')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementosAnimados = document.querySelectorAll('.passo, .modulos-lista, .materiais-aula, .desenho-resultado');
    elementosAnimados.forEach(elemento => {
        // Configurar estado inicial para animação
        if (elemento.classList.contains('passo')) {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(20px)';
            elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        observer.observe(elemento);
    });

    // Efeito de digitação no título (opcional)
    const tituloCurso = document.querySelector('.aula-cabecalho h1');
    if (tituloCurso && !sessionStorage.getItem('tituloAnimado')) {
        const textoOriginal = tituloCurso.textContent;
        tituloCurso.textContent = '';
        
        let i = 0;
        const velocidade = 50; // ms por caractere
        
        function digitar() {
            if (i < textoOriginal.length) {
                tituloCurso.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(digitar, velocidade);
            } else {
                sessionStorage.setItem('tituloAnimado', 'true');
            }
        }
        
        // Iniciar animação após um pequeno delay
        setTimeout(digitar, 500);
    }

    // Adicionar data atual ao rodapé
    const anoAtual = new Date().getFullYear();
    const copyright = document.querySelector('.copyright p');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace(/2025/, anoAtual.toString());
    }

    // Controle do header ao scroll
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
});