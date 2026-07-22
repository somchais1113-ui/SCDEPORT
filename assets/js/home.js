(function () {
  "use strict";

  const portfolio = window.Portfolio;
  if (!portfolio) return;

  const categoryGrid = document.querySelector("[data-category-grid]");
  const featuredGrid = document.querySelector("[data-featured-grid]");

  if (categoryGrid) {
    categoryGrid.innerHTML = portfolio.categories
      .map(function (category) {
        const projectCount = portfolio.projectsByCategory(category.id).length;
        return `
          <a class="category-card" href="category.html?category=${encodeURIComponent(category.id)}">
            <figure class="category-card__media image-frame">
              <img src="${portfolio.escapeHtml(category.cover)}" alt="${portfolio.escapeHtml(category.alt)}" loading="lazy" width="1200" height="900">
            </figure>
            <div class="category-card__body">
              <span class="index-label">${portfolio.escapeHtml(category.number)}</span>
              <div>
                <h3>${portfolio.escapeHtml(category.name)}</h3>
                <p>${portfolio.escapeHtml(category.shortDescription)}</p>
                <span class="text-link">View ${String(projectCount).padStart(2, "0")} project <span aria-hidden="true">↗</span></span>
              </div>
            </div>
          </a>
        `;
      })
      .join("");
  }

  if (featuredGrid) {
    featuredGrid.innerHTML = portfolio.projects
      .slice(0, 3)
      .map(function (project, index) {
        const category = portfolio.categoryById(project.category);
        return `
          <a class="project-card ${index === 0 ? "project-card--wide" : ""}" href="project.html?id=${encodeURIComponent(project.id)}">
            <figure class="project-card__media image-frame">
              <img src="${portfolio.escapeHtml(project.cover)}" alt="${portfolio.escapeHtml(project.coverAlt)}" loading="lazy" width="1200" height="900">
            </figure>
            <div class="project-card__body">
              <p class="eyebrow">${portfolio.escapeHtml(category ? category.name : "Project")} · ${portfolio.escapeHtml(project.year)}</p>
              <h3>${portfolio.escapeHtml(project.title)}</h3>
              <p>${portfolio.escapeHtml(project.subtitle)}</p>
            </div>
          </a>
        `;
      })
      .join("");
  }
})();
