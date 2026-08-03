(function () {
  "use strict";

  const portfolio = window.SomchaiPortfolio;
  const view = document.querySelector("[data-category-page]");
  const address = document.querySelector('[data-page-address="category"]');
  if (!portfolio || !view) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("category") || params.get("id") || "advertising";
  const category = portfolio.categoryById(requestedId);

  function icon() {
    return '<svg class="ui-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false"><path d="M5 15 15 5M7 5h8v8"/></svg>';
  }

  function card(project) {
    const number = String(project.order).padStart(2, "0");
    return `
      <article class="category-project-card">
        <a href="project.html?id=${encodeURIComponent(project.slug)}">
          <figure class="category-project-card__image">
            <img src="${portfolio.escapeHtml(project.cover)}" alt="${portfolio.escapeHtml(project.coverAlt)}" width="1200" height="900" loading="lazy" decoding="async" draggable="false">
          </figure>
          <div class="category-project-card__meta">
            <p>${number} / ${portfolio.escapeHtml(project.year)}</p>
            <h2>${portfolio.escapeHtml(project.title)}</h2>
            <span class="icon-link">View case ${icon()}</span>
          </div>
          <p class="category-project-card__summary">${portfolio.escapeHtml(project.summary)}</p>
        </a>
      </article>`;
  }

  if (!category) {
    view.innerHTML = `
      <section class="category-page-hero category-page-shell">
        <p class="eyebrow"><span></span> Category not found</p>
        <h1>Nothing in this category.</h1>
        <a class="button-link icon-link" href="home.html#work"><span>Return to all work</span>${icon()}</a>
      </section>`;
    return;
  }

  const projects = portfolio.projects.filter(function (project) {
    return project.category === category.id;
  });

  portfolio.setPageMeta(category.label, "Selected " + category.label + " projects by Somchai Sompiew.");

  if (address) {
    address.innerHTML = `<a href="home.html">Home</a><span>/</span><a href="home.html#work">Work</a><span>/</span><strong>${portfolio.escapeHtml(category.label)}</strong>`;
  }

  view.innerHTML = `
    <section class="category-page-hero category-page-shell">
      <p class="eyebrow"><span></span> Work / Selected category</p>
      <div class="category-page-heading">
        <h1>${portfolio.escapeHtml(category.label)}</h1>
        <p>${String(projects.length).padStart(2, "0")} selected ${projects.length === 1 ? "project" : "projects"}. A focused view of the work, visual system and production thinking in this discipline.</p>
      </div>
    </section>
    <section class="category-page-projects category-page-shell" aria-label="${portfolio.escapeHtml(category.label)} projects">
      ${projects.length ? projects.map(card).join("") : '<p class="notice">No projects in this category yet.</p>'}
    </section>`;

  if (window.PortfolioMotion) window.PortfolioMotion.refresh(view);
})();
