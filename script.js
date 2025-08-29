// Sistema de tabs da sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar a[data-target]');
    const sections = document.querySelectorAll('.content section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active de todos os links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Remove active de todas as seções
            sections.forEach(s => s.classList.remove('active'));
            
            // Adiciona active ao link clicado
            this.classList.add('active');
            
            // Mostra a seção correspondente
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});

// Menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    const body = document.body;
    
    // Criar overlay se não existir
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);
    }

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Previne scroll do body quando menu está aberto
        if (menu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Fechar menu ao clicar em links
    // const menuLinks = document.querySelectorAll('.menu a');
    // menuLinks.forEach(link => {
    //     link.addEventListener('click', closeMenu);
    // });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Fechar menu ao redimensionar tela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1105) {
            closeMenu();
        }
    });
});

// Carrossel de notícias
const slides = document.querySelectorAll('.slide');
let current = 0;
let slideInterval;

function nextSlide() {
    if (slides.length === 0) return;
    
    const prev = slides[current];
    prev.classList.remove('active');
    prev.classList.add('prev');

    current = (current + 1) % slides.length;
    slides[current].classList.add('active');

    setTimeout(() => prev.classList.remove('prev'), 500);
    resetInterval();
}

function prevSlide() {
    if (slides.length === 0) return;
    
    const prev = slides[current];
    prev.classList.remove('active');
    prev.classList.add('prev');

    current = (current - 1 + slides.length) % slides.length;
    slides[current].classList.add('active');

    setTimeout(() => prev.classList.remove('prev'), 500);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Inicializa o carrossel quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Adicionar event listeners para as setas
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
});

// Pausa o carrossel quando o usuário passa o mouse sobre ele
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            resetInterval();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os links principais do menu (itens de primeiro nível)
    const dropdownLinks = document.querySelectorAll('.menu .dropdown > .menu-link');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Em telas pequenas, intercepta o clique para abrir/fechar submenu
            if (window.innerWidth <= 1105) {
                e.preventDefault(); // evita navegação imediata
                const parent = this.parentElement;
                
                // Alterna a classe open neste item
                if (parent.classList.contains('open')) {
                    parent.classList.remove('open');
                } else {
                    // Fecha outros dropdowns abertos
                    document.querySelectorAll('.menu .dropdown.open').forEach(item => {
                        item.classList.remove('open');
                    });
                    parent.classList.add('open');
                }
            }
        });
    });
    

    /* Ajuste: fecha o menu mobile ao clicar em links que NÃO são cabeçalhos de submenu */
    const allMenuLinks = document.querySelectorAll('.menu a');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');

    function closeMenuWrapper() {
        // Se estiver em mobile e menu aberto, fecha
        if (menu && menu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    allMenuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Em mobile, verifica se o link faz parte de um submenu (dentro de .dropdown-content)
            const isSubLink = this.closest('.dropdown-content') !== null;
            const isParent = this.parentElement.classList.contains('dropdown');
            const hasSubmenu = this.nextElementSibling && this.nextElementSibling.classList && this.nextElementSibling.classList.contains('dropdown-content');

            // Se o link não abre submenu (ou é link de submenu), fecha o menu
            if (window.innerWidth <= 1105 && (isSubLink || !hasSubmenu)) {
                closeMenuWrapper();
            }
        });
    });
});
