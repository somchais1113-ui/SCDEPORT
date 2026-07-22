(function () {
  "use strict";

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? [...window.PORTFOLIO_PROJECTS].sort((a, b) => a.order - b.order)
    : [];

  const grid = document.querySelector("#project-grid");
  const filters = document.querySelector("#project-filters");
  const menuButton = document.querySelector("#menu-button");
  const nav = document.querySelector("#site-nav");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function projectMarkup(project, index) {
    const categories = project.categories.join(" · ");
    const projectNumber = String(index + 1).padStart(2, "0");

    return `
      <article class="project-card">
        <a href="project.html?id=${encodeURIComponent(project.slug)}">
          <div class="project-image">
            <img
              src="${escapeHtml(project.cover)}"
              alt="${escapeHtml(project.alt)}"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
            />
            <span class="view-pill">View case ↗</span>
          </div>
          <div class="project-meta">
            <div>
              <p>${projectNumber} / ${escapeHtml(project.sector)}</p>
              <h3>${escapeHtml(project.title)}</h3>
            </div>
            <p>${escapeHtml(categories)}</p>
          </div>
        </a>
      </article>
    `;
  }

  function renderProjects(category) {
    if (!grid) return;

    const visible =
      category === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(category));

    grid.innerHTML = visible.length
      ? visible.map(projectMarkup).join("")
      : '<p class="notice">No projects in this category yet.</p>';
  }

  if (filters) {
    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;

      filters.querySelectorAll("button[data-filter]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      renderProjects(button.dataset.filter || "All");
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "Close" : "Menu";
    });

    nav.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    });
  }

  renderProjects("All");
})();
