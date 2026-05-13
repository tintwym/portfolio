document.addEventListener('DOMContentLoaded', () => {
    const skipLink = document.querySelector('.skip-link');
    const mainEl = document.getElementById('main-content');
    if (skipLink && mainEl) {
        skipLink.addEventListener('click', () => {
            window.setTimeout(() => {
                try {
                    mainEl.focus({ preventScroll: true });
                } catch {
                    mainEl.focus();
                }
            }, 0);
        });
    }

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
        'nav-about',
        'nav-experience',
        'nav-education',
        'nav-skills',
        'nav-projects',
        'nav-contact',
        'hire-link',
        'hero-contact-link',
        'hero-projects-link',
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
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    }
});
