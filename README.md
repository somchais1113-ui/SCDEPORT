# Somchai Sompiew Portfolio

A lightweight HTML, CSS and JavaScript portfolio for packaging and graphic design. It is ready for GitHub Pages and does not require a framework, database or paid hosting.

## Included

- Responsive home page
- Project category filters
- Reusable project detail page
- Project data stored in one editable file
- Optimized WebP sample images
- GitHub Pages deployment workflow
- Thai upload and editing guide
- Accessibility and reduced-motion support

## Quick preview

You may open `index.html` directly in a browser. For the closest result to GitHub Pages, run a local web server from this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish with GitHub Pages

1. Create a new public GitHub repository.
2. Upload every file and folder from this package to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push a change or run the included workflow manually.
6. GitHub will provide the public portfolio URL after deployment finishes.

The included workflow is located at `.github/workflows/deploy.yml`.

## Main files

| File | Purpose |
| --- | --- |
| `index.html` | Home page and project grid |
| `project.html` | Reusable detail page driven by `?id=project-slug` |
| `data/projects.js` | Titles, categories, descriptions and image paths |
| `assets/css/main.css` | Entire visual system and responsive layout |
| `assets/js/app.js` | Project grid, filters and mobile menu |
| `assets/js/project.js` | Individual project page rendering |
| `UPLOAD_GUIDE_TH.md` | Detailed Thai editing instructions |

## Contact currently configured

- Name: Somchai Sompiew
- Email: Somchai.s1113@gmail.com

## Important

The three included case studies use demo content and generated sample visuals. Replace both the text and images with actual portfolio work before publishing professionally.

Pure GitHub Pages cannot receive image uploads from a public web form. In this version, images are uploaded through the GitHub repository. A future admin dashboard requires external storage such as Supabase or Cloudinary.
