# Somchai Sompiew — Graphic & Packaging Design Portfolio

A fast, framework-free portfolio prepared for GitHub Pages. The visual system uses a clean white background, strong typography and a compact cobalt / orange / lime accent palette.

## Included

- Six work categories: Advertising, Packaging Design, Product Design, Display & Retail, Campaign and Other Creative Works
- Category pages with project listings
- Individual project pages with multi-image galleries and a click-to-expand lightbox
- Six original concept mockups plus cropped gallery details
- Responsive layouts for desktop, tablet and mobile
- WebP images, lazy loading and no external font or JavaScript dependencies
- GitHub Pages deployment workflow
- Thai upload guide in `docs/UPLOAD_GUIDE_TH.md`

## Quick start

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Folder structure

```text
Somchai-Sompiew-Portfolio/
├── index.html                     # Homepage and category overview
├── category.html                  # Category page (?category=...)
├── project.html                   # Project detail (?id=...)
├── 404.html
├── data/
│   ├── categories.js              # Category titles, descriptions and covers
│   └── projects.js                # Projects, copy and gallery image lists
├── assets/
│   ├── css/main.css
│   ├── js/
│   │   ├── shared.js
│   │   ├── home.js
│   │   ├── category.js
│   │   └── project.js
│   └── images/
│       ├── categories/<category>/cover.webp
│       └── projects/<category>/<project>/
│           ├── cover.webp
│           ├── gallery-01.webp
│           ├── gallery-02.webp
│           └── gallery-03.webp
├── docs/UPLOAD_GUIDE_TH.md
├── .github/workflows/deploy.yml
├── .nojekyll
├── favicon.svg
├── site.webmanifest
└── robots.txt
```

## Editing content

- Edit category names and descriptions in `data/categories.js`.
- Add, remove or reorder projects in `data/projects.js`.
- Store project images inside the matching project folder.
- Keep IDs and folder names lowercase with hyphens, for example `coffee-packaging`.

The included images and case-study copy are clearly labelled concept placeholders. Replace them with Somchai’s completed work before publishing the final portfolio.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push to the `main` branch. The included workflow will deploy the site.

## Contact configured in the site

- Somchai Sompiew
- Somchai.s1113@gmail.com
