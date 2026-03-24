document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Glow (Desktop Only)
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Check if device has a fine pointer (mouse vs touch)
    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smooth performance
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        });
        
        // Enhance glow when hovering over interactive/premium elements
        const interactables = document.querySelectorAll('a, button, .pillar-card, .problem-card, .solution-item, .exp-box, .stat-card');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '800px';
                cursorGlow.style.height = '800px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 70%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '600px';
                cursorGlow.style.height = '600px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, rgba(0, 0, 0, 0) 70%)';
            });
        });
    }

    // 2. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Account for fixed navbar height in scroll offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
