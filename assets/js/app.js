(function () {
  "use strict";

  const portfolio = window.SomchaiPortfolio;
  const grid = document.querySelector("#project-grid");
  const filters = document.querySelector("#project-filters");
  const filterSummary = document.querySelector("#filter-summary");
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#site-nav");
  const allCategoryId = "all";
  let filterTimer = null;

  if (!portfolio || !grid || !filters) return;

  function requestedCategoryId() {
    const categoryId = new URLSearchParams(window.location.search).get("category");
    return portfolio.categoryById(categoryId) ? categoryId : allCategoryId;
  }

  function filterMarkup(activeCategoryId) {
    const filterItems = [
      { id: allCategoryId, label: "All" },
      ...portfolio.categories
    ];

    return filterItems
      .map(function (category) {
        const isActive = category.id === activeCategoryId;
        return `
          <button
            type="button"
            data-filter="${portfolio.escapeHtml(category.id)}"
            aria-pressed="${String(isActive)}"
          >${portfolio.escapeHtml(category.label)}</button>
        `;
      })
      .join("");
  }

  function projectMarkup(project, index) {
    const category = portfolio.categoryById(project.category);
    const categoryLabel = category ? category.label : project.sector;
    const projectNumber = String(project.order).padStart(2, "0");

    return `
      <article class="project-card" style="--card-index: ${Number(index) || 0}">
        <a href="project.html?id=${encodeURIComponent(project.slug)}">
          <div class="project-image">
            <img
              src="${portfolio.escapeHtml(project.cover)}"
              alt="${portfolio.escapeHtml(project.coverAlt)}"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
            >
            <span class="view-pill">View case ↗</span>
          </div>
          <div class="project-meta">
            <div>
              <p>${projectNumber} / ${portfolio.escapeHtml(project.sector)}</p>
              <h3>${portfolio.escapeHtml(project.title)}</h3>
            </div>
            <p>${portfolio.escapeHtml(categoryLabel)}</p>
          </div>
        </a>
      </article>
    `;
  }

  function renderProjects(categoryId) {
    const visibleProjects = categoryId === allCategoryId
      ? portfolio.projects
      : portfolio.projects.filter((project) => project.category === categoryId);

    grid.innerHTML = visibleProjects.length
      ? visibleProjects.map(projectMarkup).join("")
      : '<p class="notice">No projects in this category yet.</p>';

    if (filterSummary) {
      const category = portfolio.categoryById(categoryId);
      const categoryLabel = category ? category.label : "All disciplines";
      const projectWord = visibleProjects.length === 1 ? "project" : "projects";
      filterSummary.textContent = `${String(visibleProjects.length).padStart(2, "0")} ${projectWord} · ${categoryLabel}`;
    }

    window.requestAnimationFrame(function () {
      grid.classList.remove("is-filtering-out");
      if (window.PortfolioMotion) window.PortfolioMotion.refresh(grid);
    });
  }

  function transitionProjects(categoryId) {
    window.clearTimeout(filterTimer);
    grid.classList.add("is-filtering-out");
    filterTimer = window.setTimeout(function () {
      renderProjects(categoryId);
    }, 180);
  }

  function setActiveFilter(categoryId) {
    filters.querySelectorAll("button[data-filter]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === categoryId));
    });
  }

  function updateShareableUrl(categoryId) {
    const url = new URL(window.location.href);

    if (categoryId === allCategoryId) {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", categoryId);
    }

    url.hash = "work";

    try {
      window.history.replaceState({}, "", url);
    } catch (error) {
      // Direct file previews can restrict History API changes in some browsers.
    }
  }

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  }

  const initialCategoryId = requestedCategoryId();
  filters.innerHTML = filterMarkup(initialCategoryId);
  renderProjects(initialCategoryId);

  filters.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;

    const categoryId = button.dataset.filter || allCategoryId;
    setActiveFilter(categoryId);
    transitionProjects(categoryId);
    updateShareableUrl(categoryId);
  });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "Close" : "Menu";
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }
})();
