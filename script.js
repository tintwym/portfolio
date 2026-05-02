document.addEventListener('DOMContentLoaded', () => {
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

    /* Friend's pattern: id on each header anchor, preventDefault + scrollIntoView({ behavior: 'smooth' }). */
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
        'home-link',
        'about-link',
        'portfolio-link',
        'contact-link',
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
});
