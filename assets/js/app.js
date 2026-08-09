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
  let activeCategoryId = allCategoryId;

  if (!portfolio || !grid || !filters) return;

  function currentLanguage() {
    return document.body.dataset.language === "th" ? "th" : "en";
  }

  function translated(english, thai) {
    return currentLanguage() === "th" ? thai : english;
  }

  function categoryLabel(category) {
    if (!category) return translated("All disciplines", "ทุกศาสตร์การออกแบบ");
    return currentLanguage() === "th" && category.labelTh ? category.labelTh : category.label;
  }

  function northeastIcon() {
    return '<svg class="ui-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false"><path d="M5 15 15 5M7 5h8v8"/></svg>';
  }

  /* Brand names are proper nouns and are never transliterated or translated —
     "Quantum" and "Kioku" must read identically in both languages. */
  function displayBrandGroupsSeed() {
    return [
      { id: "quantum", label: "Quantum", order: 1 },
      { id: "kioku", label: "Kioku", order: 2 },
      { id: "other-display", label: translated("Other Displays", "งานดิสเพลย์อื่น ๆ"), order: 3, empty: true }
    ];
  }

  function requestedCategoryId() {
    const categoryId = new URLSearchParams(window.location.search).get("category");
    return portfolio.categoryById(categoryId) ? categoryId : allCategoryId;
  }

  function filterMarkup(activeCategoryId) {
    const filterItems = [
      { id: allCategoryId, label: translated("All", "ทั้งหมด") },
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
          >${portfolio.escapeHtml(category.id === allCategoryId ? category.label : categoryLabel(category))}</button>
        `;
      })
      .join("");
  }

  function projectMarkup(project, index) {
    const category = portfolio.categoryById(project.category);
    const resolvedCategoryLabel = category ? categoryLabel(category) : project.sector;
    const sectorLabel = currentLanguage() === "th" && project.sectorTh ? project.sectorTh : project.sector;
    const sectorNoteText = currentLanguage() === "th" && project.sectorNoteTh ? project.sectorNoteTh : project.sectorNote;
    const sectorNoteMarkup = sectorNoteText
      ? `<span class="project-meta-note">${portfolio.escapeHtml(sectorNoteText)}</span>`
      : "";
    const projectNumber = String(project.order).padStart(2, "0");
    const brand = project.brandLabel || project.brand || "";
    const brandMarkup = brand
      ? `<span class="project-brand-label">${portfolio.escapeHtml(brand)} Brand</span>`
      : "";
    const cardTag = currentLanguage() === "th" && project.cardTagTh ? project.cardTagTh : project.cardTag;
    const cardTagMarkup = cardTag
      ? `<span class="project-format-badge">${portfolio.escapeHtml(cardTag)}</span>`
      : "";

    return `
      <article class="project-card" style="--card-index: ${Number(index) || 0}">
        <a href="project.html?id=${encodeURIComponent(project.slug)}">
          <div class="project-image">
            ${cardTagMarkup}
            <img
              src="${portfolio.escapeHtml(project.cover)}"
              alt="${portfolio.escapeHtml(project.coverAlt)}"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
            >
            <span class="view-pill icon-link">${translated("View case", "ดูโปรเจกต์")} ${northeastIcon()}</span>
            <span class="project-hover-overlay" aria-hidden="true">
              <span class="project-hover-copy">
                <span class="project-hover-title">${portfolio.escapeHtml(project.title)}</span>
                <span class="project-hover-meta">${portfolio.escapeHtml(sectorLabel)} / ${portfolio.escapeHtml(project.year)}</span>
                <span class="project-hover-arrow">${northeastIcon()}</span>
              </span>
            </span>
          </div>
          <div class="project-meta">
            <div>
              <p>${projectNumber} / ${portfolio.escapeHtml(sectorLabel)}</p>
              ${sectorNoteMarkup}
              ${brandMarkup}
              <h3>${portfolio.escapeHtml(project.title)}</h3>
            </div>
            <p class="project-card-summary">${portfolio.escapeHtml(translated(project.summary, project.summaryTh || project.summary))}</p>
            <p class="project-meta-category">${portfolio.escapeHtml(resolvedCategoryLabel)}</p>
          </div>
        </a>
      </article>
    `;
  }

  function emptyDisplayCard(group, index) {
    const projectNumber = String(index).padStart(2, "0");
    return `
      <article class="project-card project-card--empty" style="--card-index: ${Number(index) || 0}">
        <div class="project-card__static">
          <div class="project-image project-image--empty" aria-hidden="true"></div>
          <div class="project-meta">
            <div>
              <p>${projectNumber} / ${translated("Display & Retail", "ดิสเพลย์และพื้นที่ขาย")}</p>
              <span class="project-brand-label">${portfolio.escapeHtml(group.label)}</span>
            </div>
            <p class="project-card-summary">${translated("Reserved for future display work outside the current named brand groups.", "พื้นที่สำรองสำหรับงานดิสเพลย์อื่น ๆ ที่จะเพิ่มในภายหลัง")}</p>
            <p class="project-meta-category">${translated("Display", "ดิสเพลย์")}</p>
          </div>
        </div>
      </article>
    `;
  }

  function groupedDisplayMarkup(projects) {
    const grouped = new Map();

    displayBrandGroupsSeed().forEach(function (group) {
      grouped.set(group.id, {
        id: group.id,
        label: group.label,
        order: group.order,
        projects: [],
        empty: Boolean(group.empty)
      });
    });

    projects.forEach(function (project) {
      const key = project.brand || "other-display";
      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          label: project.brandLabel || project.brand || translated("Other Displays", "งานดิสเพลย์อื่น ๆ"),
          order: Number(project.brandOrder) || 999,
          projects: [],
          empty: false
        });
      }
      grouped.get(key).projects.push(project);
    });

    const sections = Array.from(grouped.values())
      .sort(function (a, b) { return a.order - b.order; })
      .map(function (group, groupIndex) {
        return `
          <section class="project-brand-group project-brand-group--display" aria-label="${portfolio.escapeHtml(group.label)}">
            <header class="project-brand-group__header">
              <p>
                <span>${String(groupIndex + 1).padStart(2, "0")} / ${translated("Brand group", "กลุ่มแบรนด์")}</span>
                <span class="project-brand-group__name">${portfolio.escapeHtml(group.label)}</span>
              </p>
            </header>
            <div class="project-brand-grid">
              ${group.projects.length ? group.projects.map(projectMarkup).join("") : emptyDisplayCard(group, groupIndex + 4)}
            </div>
          </section>`;
      })
      .join("");

    return `<div class="display-brand-groups display-brand-groups--home">${sections}</div>`;
  }

  function renderProjects(categoryId) {
    const visibleProjects = categoryId === allCategoryId
      ? portfolio.projects
      : portfolio.projects.filter((project) => project.category === categoryId);

    if (!visibleProjects.length) {
      grid.innerHTML = `<p class="notice">${translated("No projects in this category yet.", "ยังไม่มีโปรเจกต์ในหมวดนี้")}</p>`;
    } else if (categoryId === "display-retail") {
      grid.innerHTML = groupedDisplayMarkup(visibleProjects);
    } else {
      grid.innerHTML = visibleProjects.map(projectMarkup).join("");
    }

    if (filterSummary) {
      const category = portfolio.categoryById(categoryId);
      const label = categoryLabel(category);
      const projectWord = currentLanguage() === "th"
        ? "โปรเจกต์"
        : visibleProjects.length === 1 ? "project" : "projects";
      filterSummary.textContent = `${String(visibleProjects.length).padStart(2, "0")} ${projectWord} · ${label}`;
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
    } catch {
      // Direct file previews can restrict History API changes in some browsers.
    }
  }

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = currentLanguage() === "th"
      ? menuButton.dataset.i18nMenuTh
      : menuButton.dataset.i18nMenuEn;
  }

  const initialCategoryId = requestedCategoryId();
  activeCategoryId = initialCategoryId;
  filters.innerHTML = filterMarkup(initialCategoryId);
  renderProjects(initialCategoryId);
  if (menuButton) closeMenu();

  filters.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;

    const categoryId = button.dataset.filter || allCategoryId;
    activeCategoryId = categoryId;
    setActiveFilter(categoryId);
    transitionProjects(categoryId);
    updateShareableUrl(categoryId);
  });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      const language = currentLanguage();
      menuButton.textContent = isOpen
        ? language === "th" ? menuButton.dataset.i18nCloseTh : menuButton.dataset.i18nCloseEn
        : language === "th" ? menuButton.dataset.i18nMenuTh : menuButton.dataset.i18nMenuEn;
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.addEventListener("portfolio:languagechange", function () {
    filters.innerHTML = filterMarkup(activeCategoryId);
    renderProjects(activeCategoryId);
    if (menuButton && menuButton.getAttribute("aria-expanded") !== "true") closeMenu();
  });
})();
