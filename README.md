# Somchai Sompiew Portfolio

A lightweight portfolio for graphic and packaging design, prepared for GitHub Pages. This revision adds a dedicated landing page and a restrained editorial motion system while keeping project imagery as the visual focus.

## Included

- Full-screen introduction at `index.html` before entering the portfolio
- Main portfolio at `home.html`
- Neutral gallery palette using warm white, graphite and restrained grey-green accents
- Editorial motion: masked image reveals, staggered typography, scroll reveals and quiet page transitions
- Motion respects `prefers-reduced-motion`
- Eight categories: Advertising, Packaging Design, Product Design, Display, Campaign, Editorial Design, Character Design and Other Creative
- Editorial Design includes the “Margins & Matter” sample project with a cover and five gallery views
- Character Design includes the “Pocket Parade” sample project with a cover and four gallery views
- Category filter → project → ten-image gallery flow
- Animated filter changes and responsive mobile navigation
- Responsive desktop, tablet and mobile layouts
- WebP mockup images and lazy loading
- Thai upload and code guides in `docs/`
- Display projects grouped by brand, with separate Quantum and Kioku folders and sections
- One-file responsive preview tool at `PREVIEW.html`

## Main structure

```text
Somchai-Sompiew-Portfolio/
├── index.html                     # Landing page
├── home.html                      # Main portfolio
├── project.html                   # Reusable project detail page
├── PREVIEW.html
├── STRUCTURE.md
├── data/
│   ├── categories.js
│   └── projects.js
├── assets/
│   ├── css/main.css
│   ├── js/
│   │   ├── shared.js
│   │   ├── motion.js
│   │   ├── app.js
│   │   └── project.js
│   └── images/
└── docs/
    ├── CODE_OVERVIEW_TH.md
    ├── MOTION_UPDATE_TH.md
    ├── NEUTRAL_GALLERY_UPDATE_TH.md
    ├── UPLOAD_GUIDE_TH.md
    └── DISPLAY_BRAND_STRUCTURE_TH.md
```

## Preview

Open `PREVIEW.html`, or run a local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. The public entry point is the landing page. Use `home.html` to open the main portfolio directly.

## Publish on GitHub Pages

1. Upload everything inside this folder to the repository root.
2. Open **Settings → Pages**.
3. Select the branch and root folder used by the repository.
4. Open the published URL; GitHub Pages will start at `index.html`.

## Contact configured

- Somchai Sompiew
- Somchai.s1113@gmail.com

The included project copy and mockups are concept placeholders. Replace them with completed work before the final public launch.
