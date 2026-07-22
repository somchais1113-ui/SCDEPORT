(function () {
  "use strict";

  const portfolio = window.Portfolio;
  const root = document.querySelector("[data-project-page]");
  if (!portfolio || !root) return;

  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = portfolio.projectById(projectId);

  if (!project) {
    portfolio.setTitle("Project not found");
    root.innerHTML = `
      <section class="empty-state shell">
        <p class="eyebrow">404 / Project not found</p>
        <h1>This project is not available.</h1>
        <a class="button button--primary" href="index.html#work">Back to all work</a>
      </section>
    `;
    return;
  }

  const category = portfolio.categoryById(project.category);
  const next = portfolio.nextProject(project.id);
  portfolio.setTitle(project.title);

  root.innerHTML = `
    <article>
      <header class="project-hero shell">
        <div class="project-hero__topline">
          <a class="back-link" href="category.html?category=${encodeURIComponent(project.category)}"><span aria-hidden="true">←</span> ${portfolio.escapeHtml(category ? category.name : "Category")}</a>
          <span class="meta-line">${portfolio.escapeHtml(project.year)} · ${portfolio.escapeHtml(project.location)}</span>
        </div>
        <div class="project-hero__title">
          <div>
            <p class="eyebrow">${portfolio.escapeHtml(category ? category.name : "Project")}</p>
            <h1>${portfolio.escapeHtml(project.title)}</h1>
          </div>
          <p class="lede">${portfolio.escapeHtml(project.subtitle)}</p>
        </div>
        <figure class="project-cover image-frame">
          <img src="${portfolio.escapeHtml(project.cover)}" alt="${portfolio.escapeHtml(project.coverAlt)}" width="1400" height="1050">
        </figure>
      </header>

      <section class="project-overview shell" aria-label="Project overview">
        <div>
          <p class="eyebrow">Challenge</p>
          <p class="project-overview__text">${portfolio.escapeHtml(project.challenge)}</p>
        </div>
        <div>
          <p class="eyebrow">Design response</p>
          <p class="project-overview__text">${portfolio.escapeHtml(project.solution)}</p>
        </div>
        <dl class="project-facts">
          <div><dt>Client</dt><dd>${portfolio.escapeHtml(project.client)}</dd></div>
          <div><dt>Year</dt><dd>${portfolio.escapeHtml(project.year)}</dd></div>
          <div><dt>Services</dt><dd>${project.services.map(portfolio.escapeHtml).join("<br>")}</dd></div>
        </dl>
      </section>

      <section class="project-gallery shell" aria-labelledby="gallery-title">
        <div class="section-heading section-heading--compact">
          <div>
            <p class="eyebrow">Image gallery</p>
            <h2 id="gallery-title">Selected views</h2>
          </div>
          <p>Click any image to view it larger.</p>
        </div>
        <div class="gallery-grid">
          ${project.gallery
            .map(function (image, index) {
              return `
                <figure class="gallery-item ${index === 0 ? "gallery-item--wide" : ""}">
                  <button type="button" data-lightbox-open data-src="${portfolio.escapeHtml(image.src)}" data-alt="${portfolio.escapeHtml(image.alt)}" data-caption="${portfolio.escapeHtml(image.caption)}">
                    <img src="${portfolio.escapeHtml(image.src)}" alt="${portfolio.escapeHtml(image.alt)}" loading="lazy" width="1400" height="1050">
                    <span class="gallery-item__expand" aria-hidden="true">↗</span>
                  </button>
                  <figcaption>${portfolio.escapeHtml(image.caption)}</figcaption>
                </figure>
              `;
            })
            .join("")}
        </div>
      </section>

      <aside class="concept-note shell">
        <p class="eyebrow">Template note</p>
        <p>${portfolio.escapeHtml(project.note)}</p>
      </aside>

      ${
        next
          ? `
            <section class="next-block shell">
              <p class="eyebrow">Next project</p>
              <a href="project.html?id=${encodeURIComponent(next.id)}">
                <span>${portfolio.escapeHtml(next.title)}</span>
                <span aria-hidden="true">→</span>
              </a>
            </section>
          `
          : ""
      }
    </article>
  `;

  const dialog = document.querySelector("[data-lightbox]");
  const dialogImage = document.querySelector("[data-lightbox-image]");
  const dialogCaption = document.querySelector("[data-lightbox-caption]");

  if (dialog && dialogImage && dialogCaption) {
    root.addEventListener("click", function (event) {
      const trigger = event.target.closest("[data-lightbox-open]");
      if (!trigger) return;
      dialogImage.src = trigger.dataset.src;
      dialogImage.alt = trigger.dataset.alt;
      dialogCaption.textContent = trigger.dataset.caption;
      dialog.showModal();
    });

    dialog.querySelector("[data-lightbox-close]").addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }
})();
