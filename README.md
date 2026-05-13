# Personal portfolio (static site)

A responsive, SEO-friendly portfolio built with **HTML, CSS, and vanilla JavaScript**. Theme tokens live in CSS variables so you can adjust slate, navy accent, and neutrals in one place (`:root` in `style.css`).

## Project structure

```text
portfolio/
├── index.html          # All sections & content
├── style.css           # Layout, theme, responsive rules
├── script.js           # Mobile nav, smooth scroll, form demo, reveal-on-scroll
├── favicon.svg
├── Junior Backend Developer.pdf   # CV download (replace with your file)
└── images/
    ├── profile.png
    ├── shopping-cart-isometric.svg
    ├── home-mart-isometric.svg
    └── movieverse-isometric.svg
```

## Local preview

From this folder, start any static file server (double-clicking `index.html` may block some assets depending on the browser).

```bash
cd /path/to/portfolio
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

Alternatively, with Node:

```bash
npx --yes serve -l 8080
```

## Customizing content

1. Replace `Junior Backend Developer.pdf` with your latest CV and update the `href` / `download` attributes on the hero **Download CV** button in `index.html` if the filename changes.
2. Swap `images/profile.png` for your professional headshot (keep similar aspect ratio or adjust `.hero-image-frame` in CSS).
3. Update meta tags (`<title>`, `<meta name="description">`, Open Graph) in `index.html` for your name and summary.
4. Paste additional roles, dates, and certifications from your résumé into **Experience** and **Education**—the template uses honest placeholders where the PDF was not available in-repo.

## Contact form (production)

The form currently shows a demo `alert`. To go live, wire it to one of:

- [Formspree](https://formspree.io/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/) (when deployed on Netlify)
- [EmailJS](https://www.emailjs.com/)

## Deployment

### GitHub Pages

1. Push this repository to GitHub.
2. Repository **Settings → Pages**.
3. **Build and deployment**: Source = **Deploy from a branch**, branch = `main` (or `master`), folder = **`/ (root)`** if `index.html` is at the repo root.
4. Your site will be available at `https://<username>.github.io/<repo>/`.

If the site lives in a subpath, set asset paths accordingly (relative paths as used here work for project sites).

### Netlify

1. Drag-and-drop the project folder in the [Netlify Drop](https://app.netlify.com/drop) UI, or connect the Git repo.
2. **Build command**: leave empty (static HTML). **Publish directory**: `.` (root).
3. Optional: enable **Forms** on the contact form and add `data-netlify="true"` plus a hidden input per Netlify docs.

### Vercel

1. Import the repo in [Vercel](https://vercel.com/).
2. Framework preset: **Other** (no build step), output = project root containing `index.html`.
3. Deploy; Vercel serves static files by default.

## Future upgrades (ideas)

- **Blog / writing** — MDX or a lightweight static generator (Eleventy, Astro) for case studies.
- **Testimonials** — carousel or quote cards with LinkedIn recommendations.
- **Certifications wall** — logos + verify links next to Education.
- **Deep case studies** — one page per project with architecture diagrams and metrics.
- **Media kit** — downloadable one-pager for press or speaking (PDF + brand assets).

## Accessibility & performance notes

- Skip link, semantic landmarks (`<main>`, `<nav>`, `<section>` with `aria-labelledby`).
- `prefers-reduced-motion` respected for scroll behavior and reveal animations.
- Lazy-loaded project art; hero image uses `fetchpriority="high"`.

## License

All rights reserved — update this section if you open-source the site.
