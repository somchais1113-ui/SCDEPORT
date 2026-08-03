# Portfolio Structure and Code Map

## Visitor flow

```text
index.html (landing page)
  ↓ Enter portfolio
home.html (main portfolio)
  ↓ choose a category filter
filtered project grid
  ↓ Display projects are separated into Quantum / Kioku brand groups
  ↓ open a project
project.html?id=<project-slug>
  ↓ shared.js matches the slug with data/projects.js
multi-image project gallery
```

The interface stays neutral and the animation is intentionally restrained so the work remains dominant.

## Folder structure

```text
Somchai-Sompiew-Portfolio/
├── PREVIEW.html                    # Responsive preview tool
├── STRUCTURE.md                    # This code and folder map
├── index.html                      # Public landing page
├── home.html                       # Main portfolio and project grid
├── project.html                    # Reusable project detail page
├── 404.html
├── data/
│   ├── categories.js               # Category ids, labels and folder names
│   └── projects.js                 # All project content and image paths
├── assets/
│   ├── css/
│   │   └── main.css                # Layout, neutral palette and animation styles
│   ├── js/
│   │   ├── shared.js               # Shared data access, escaping and metadata
│   │   ├── motion.js               # Intro, scroll reveal and page transitions
│   │   ├── app.js                  # Filters, cards, URL state and mobile menu
│   │   └── project.js              # Project page and gallery renderer
│   └── images/
│       ├── hero/
│       │   └── writing-culture.webp
│       └── projects/<category>/<brand>/<project>/  # Brand layer is used for Display
├── docs/
│   ├── CODE_OVERVIEW_TH.md
│   ├── MOTION_UPDATE_TH.md
│   ├── NEUTRAL_GALLERY_UPDATE_TH.md
│   ├── UPLOAD_GUIDE_TH.md
│   └── DISPLAY_BRAND_STRUCTURE_TH.md
├── favicon.svg
├── site.webmanifest
└── robots.txt
```

## Which file controls what

| Need to change | Edit this file |
| --- | --- |
| Landing page text and composition | `index.html` |
| Homepage headline, About and Approach | `home.html` |
| Colours, spacing, typography and responsive layout | `assets/css/main.css` |
| Animation timing and reveal behaviour | `assets/js/motion.js` and the motion section in `assets/css/main.css` |
| Category ids and filter-button labels | `data/categories.js` |
| Project title, category, description and images | `data/projects.js` |
| Shared content helpers and dynamic metadata | `assets/js/shared.js` |
| Project-grid behaviour and category filtering | `assets/js/app.js` |
| Project-detail and gallery rendering | `assets/js/project.js` |
| Image files | `assets/images/projects/<category>/<project>/` or `assets/images/projects/display-retail/<brand>/<project>/` |

## Preview the code

Open `PREVIEW.html` directly. It provides:

- Landing, portfolio and project pages
- Desktop, tablet and mobile widths
- A button to open the selected page in a separate browser tab
- Project choices generated automatically from `data/projects.js`

For a local web-server preview:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/PREVIEW.html
```
