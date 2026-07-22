(function () {
  "use strict";

  const portfolio = window.Portfolio;
  const root = document.querySelector("[data-category-page]");
  if (!portfolio || !root) return;

  const categoryId = new URLSearchParams(window.location.search).get("category");
  const category = portfolio.categoryById(categoryId);

  if (!category) {
    portfolio.setTitle("Category not found");
    root.innerHTML = `
      <section class="empty-state shell">
        <p class="eyebrow">404 / Category not found</p>
        <h1>This category is not available.</h1>
        <a class="button button--primary" href="index.html#work">Back to all work</a>
      </section>
    `;
    return;
  }

  const projects = portfolio.projectsByCategory(category.id);
  const currentIndex = portfolio.categories.findIndex((item) => item.id === category.id);
  const nextCategory = portfolio.categories[(currentIndex + 1) % portfolio.categories.length];

  portfolio.setTitle(category.name);
  root.innerHTML = `
    <section class="category-hero shell">
      <div class="category-hero__copy">
        <a class="back-link" href="index.html#work"><span aria-hidden="true">←</span> All categories</a>
        <p class="eyebrow">${portfolio.escapeHtml(category.number)} / Graphic design category</p>
        <h1>${portfolio.escapeHtml(category.name)}</h1>
        <p class="lede">${portfolio.escapeHtml(category.description)}</p>
        <p class="meta-line">${String(projects.length).padStart(2, "0")} concept project · New work can be added in the data file</p>
      </div>
      <figure class="category-hero__media image-frame">
        <img src="${portfolio.escapeHtml(category.cover)}" alt="${portfolio.escapeHtml(category.alt)}" width="1200" height="900">
      </figure>
    </section>

    <section class="section shell" aria-labelledby="category-projects-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 id="category-projects-title">Projects in ${portfolio.escapeHtml(category.name)}</h2>
        </div>
        <p>Open a project to see the full image gallery, brief and design response.</p>
      </div>
      <div class="category-project-grid">
        ${projects
          .map(function (project) {
            return `
              <a class="project-card project-card--category" href="project.html?id=${encodeURIComponent(project.id)}">
                <figure class="project-card__media image-frame">
                  <img src="${portfolio.escapeHtml(project.cover)}" alt="${portfolio.escapeHtml(project.coverAlt)}" loading="lazy" width="1200" height="900">
                </figure>
                <div class="project-card__body">
                  <p class="eyebrow">${portfolio.escapeHtml(project.client)} · ${portfolio.escapeHtml(project.year)}</p>
                  <h3>${portfolio.escapeHtml(project.title)}</h3>
                  <p>${portfolio.escapeHtml(project.subtitle)}</p>
                  <span class="text-link">View case study <span aria-hidden="true">↗</span></span>
                </div>
              </a>
            `;
          })
          .join("")}
      </div>
    </section>

    <section class="next-block shell">
      <p class="eyebrow">Next category</p>
      <a href="category.html?category=${encodeURIComponent(nextCategory.id)}">
        <span>${portfolio.escapeHtml(nextCategory.name)}</span>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  `;
})();
