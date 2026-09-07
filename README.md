# Somchai Sompiew Portfolio — v76

Static HTML, CSS and JavaScript portfolio. This revision updates the supplied Vercel source; no hosting migration or deployment is included.

## Changes

- 22 original explanatory SVG diagrams complete the printing and engraving sections.
- Four workflow diagrams complete the homepage leadership and production sections.
- Thai and English copy now follows the supplied images across eleven project entries, homepage carousels, profile and object study.
- Generic template images and four empty display slots are removed from active galleries. Original files remain in the source.
- Existing HTML routes and project slugs are preserved.

## Start here

- `index.html`: landing page
- `home.html`: portfolio
- `craft.html`: process index
- `craft-detail.html?id=offset`: example process detail
- `data/projects.js`: project content and gallery paths
- `data/craft.js`: process content, captions and technical sources
- `docs/REVIEW_V76_TH.md`: Thai review and remaining factual checks
- `tools/generate_process_assets.py`: regenerate original SVG diagrams with Python 3
- `tools/validate_portfolio.cjs`: static checks with Node.js

## Local preview and validation

Run `python3 -m http.server 8080` from this directory, then open the local address shown by the server.
Run `node tools/validate_portfolio.cjs` for JavaScript syntax, local references, project data and process-template checks.

## Existing Vercel project

Review the facts listed in `docs/REVIEW_V76_TH.md`, then use the existing project’s normal upload or repository workflow. Keep `index.html`, the other HTML files, `assets/` and `data/` at the same relative level. This revision needs no new packages or framework migration. Existing Vercel settings have not been inspected or changed.

Process diagrams are simplified educational references, not photographs or evidence of completed work. Historical documents describe earlier revisions; use the v76 review for current changes.
