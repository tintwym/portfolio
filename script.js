document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-menu');

    const syncMenuState = () => {
        if (!mobileMenu || !navLinks) return;
        const open = navLinks.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileMenu.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-open', open);
    };

    const wireSmoothLink = (linkId) => {
        const link = document.getElementById(linkId);
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.charAt(0) !== '#') return;

        link.addEventListener('click', (e) => {
            const id = href.slice(1);
            const target = document.getElementById(id);
            if (!target) return;

            e.preventDefault();
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start',
            });
            try {
                history.replaceState(null, '', href);
            } catch {
                /* ignore */
            }

            if (navLinks && navLinks.contains(link)) {
                navLinks.classList.remove('active');
                syncMenuState();
            }
        });
    };

    [
        'brand-home-link',
        'work-link',
        'skills-link',
        'contact-link',
        'hire-link',
        'portfolio-cta-link',
    ].forEach(wireSmoothLink);

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            syncMenuState();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                syncMenuState();
                mobileMenu.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                syncMenuState();
            }
        });
    }

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.alert(
                'Thanks for your message. This form is a demo on the static site — email tintwaiyanmin.sg@gmail.com or use LinkedIn for a real response. You can connect the form to Formspree, Netlify Forms, or EmailJS when you host it.'
            );
        });
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.08 }
        );

        document.querySelectorAll('.project-card, .skill-category, .resume-highlight').forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});
