document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-menu');

    if (!mobileMenu || !navLinks) return;

    const syncMenuState = () => {
        const open = navLinks.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileMenu.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-open', open);
    };

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        syncMenuState();
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            syncMenuState();
        });
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
});