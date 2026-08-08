(function () {
  "use strict";

  const portfolio = window.SomchaiPortfolio;
  const view = document.querySelector("[data-category-page]");
  const address = document.querySelector('[data-page-address="category"]');
  if (!portfolio || !view) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("category") || params.get("id") || "advertising";
  const category = portfolio.categoryById(requestedId);

  /* ----------------------------------------------------------------
     Language helpers — the toggle in the header dispatches
     "portfolio:languagechange" (see assets/js/motion.js)
     ---------------------------------------------------------------- */
  function currentLanguage() {
    return document.body.dataset.language === "th" ? "th" : "en";
  }

  function t(english, thai) {
    return currentLanguage() === "th" ? thai : english;
  }

  function categoryLabel(item) {
    if (!item) return "";
    return currentLanguage() === "th" && item.labelTh ? item.labelTh : item.label;
  }

  function brandLabel(project) {
    if (currentLanguage() === "th" && project.brandLabelTh) return project.brandLabelTh;
    return project.brandLabel || project.brand || "";
  }

  function projectSummary(project) {
    return currentLanguage() === "th" && project.summaryTh ? project.summaryTh : project.summary;
  }

  function projectWord(count) {
    if (currentLanguage() === "th") return "โปรเจกต์";
    return count === 1 ? "project" : "projects";
  }

  function icon() {
    return '<svg class="ui-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false"><path d="M5 15 15 5M7 5h8v8"/></svg>';
  }

  /* Brand groups shown on the Display category page. */
  function displayBrandGroupsSeed() {
    return [
      /* Brand names stay in Latin script in both languages. */
      { id: "quantum", label: "Quantum", order: 1 },
      { id: "kioku", label: "Kioku", order: 2 },
      { id: "other-display", label: t("Other Displays", "งานดิสเพลย์อื่น ๆ"), order: 3, empty: true }
    ];
  }

  function card(project, index) {
    const number = String(index + 1).padStart(2, "0");
    const brand = brandLabel(project);
    const brandMarkup = brand
      ? `<span class="category-project-card__brand">${portfolio.escapeHtml(brand)} ${t("Brand", "แบรนด์")}</span>`
      : "";
    const cardTag = currentLanguage() === "th" && project.cardTagTh ? project.cardTagTh : project.cardTag;
    const cardTagMarkup = cardTag
      ? `<span class="project-format-badge">${portfolio.escapeHtml(cardTag)}</span>`
      : "";

    return `
      <article class="category-project-card">
        <a href="project.html?id=${encodeURIComponent(project.slug)}">
          <figure class="category-project-card__image">
            ${cardTagMarkup}
            <img src="${portfolio.escapeHtml(project.cover)}" alt="${portfolio.escapeHtml(project.coverAlt)}" width="1200" height="900" loading="lazy" decoding="async" draggable="false">
          </figure>
          <div class="category-project-card__meta">
            <div>
              <p>${number} / ${portfolio.escapeHtml(project.year)}</p>
              ${brandMarkup}
              <h2>${portfolio.escapeHtml(project.title)}</h2>
            </div>
            <span class="icon-link">${t("View case", "ดูโปรเจกต์")} ${icon()}</span>
          </div>
          <p class="category-project-card__summary">${portfolio.escapeHtml(projectSummary(project))}</p>
        </a>
      </article>`;
  }

  function defaultProjectList(projects) {
    const empty = `<p class="notice">${t("No projects in this category yet.", "ยังไม่มีโปรเจกต์ในหมวดนี้")}</p>`;
    return `
      <section class="category-page-projects category-page-shell" aria-label="${portfolio.escapeHtml(categoryLabel(category))}">
        ${projects.length ? projects.map(card).join("") : empty}
      </section>`;
  }

  function displayBrandGroups(projects) {
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
          label: brandLabel(project) || t("Other Displays", "งานดิสเพลย์อื่น ๆ"),
          order: Number(project.brandOrder) || 999,
          projects: [],
          empty: false
        });
      }
      // Keep the seeded Thai/English label in sync with the current language.
      grouped.get(key).label = brandLabel(project) || grouped.get(key).label;
      grouped.get(key).projects.push(project);
    });

    const groups = Array.from(grouped.values())
      .filter(function (group) { return group.projects.length; })
      .sort(function (a, b) { return a.order - b.order; });

    const navigation = groups.map(function (group, index) {
      return `<a href="#brand-${portfolio.escapeHtml(group.id)}"><span>${String(index + 1).padStart(2, "0")}</span>${portfolio.escapeHtml(group.label)}</a>`;
    }).join("");

    const sections = groups.map(function (group, index) {
      const count = String(group.projects.length).padStart(2, "0");
      const line = currentLanguage() === "th"
        ? `${count} โปรเจกต์ · งานดิสเพลย์เฉพาะของแบรนด์ ${group.label}`
        : `${count} ${projectWord(group.projects.length)}. Dedicated display work for ${group.label}.`;

      return `
        <section class="display-brand-group category-page-shell" id="brand-${portfolio.escapeHtml(group.id)}" aria-label="${portfolio.escapeHtml(group.label)}">
          <header class="display-brand-group__header display-brand-group__header--compact">
            <p>${String(index + 1).padStart(2, "0")} / ${t("Brand group", "กลุ่มแบรนด์")}</p>
            <p>${portfolio.escapeHtml(line)}</p>
          </header>
          <div class="category-page-projects category-page-projects--brand">
            ${group.projects.map(card).join("")}
          </div>
        </section>`;
    }).join("");

    return `
      <nav class="category-page-brand-nav category-page-shell" aria-label="${t("Display brands", "แบรนด์ดิสเพลย์")}">
        <p>${t("Browse by brand", "เลือกดูตามแบรนด์")}</p>
        <div>${navigation}</div>
      </nav>
      <div class="display-brand-groups">${sections}</div>`;
  }

  function renderNotFound() {
    view.innerHTML = `
      <section class="category-page-hero category-page-shell">
        <p class="eyebrow"><span></span> ${t("Category not found", "ไม่พบหมวดหมู่นี้")}</p>
        <h1>${t("Nothing in this category.", "ยังไม่มีผลงานในหมวดนี้")}</h1>
        <a class="button-link icon-link" href="home.html#work"><span>${t("Return to all work", "กลับไปดูผลงานทั้งหมด")}</span>${icon()}</a>
      </section>`;
  }

  if (!category) {
    renderNotFound();
    document.addEventListener("portfolio:languagechange", renderNotFound);
    return;
  }

  const projects = portfolio.projects.filter(function (project) {
    return project.category === category.id;
  });

  function render() {
    const label = categoryLabel(category);

    portfolio.setPageMeta(label, t(
      "Selected " + category.label + " projects by Somchai Sompiew.",
      "ผลงาน" + label + "คัดสรร โดย Somchai Sompiew"
    ));

    if (address) {
      address.innerHTML =
        `<a href="home.html">${t("Home", "หน้าหลัก")}</a><span>/</span>` +
        `<a href="home.html#work">${t("Work", "ผลงาน")}</a><span>/</span>` +
        `<strong>${portfolio.escapeHtml(label)}</strong>`;
    }

    const isDisplay = category.id === "display-retail";

    const categoryContent = isDisplay
      ? displayBrandGroups(projects)
      : defaultProjectList(projects);

    const categoryDescription = isDisplay
      ? t(
          "Display projects are organised by brand, so Quantum and Kioku remain visually and structurally independent while staying within one discipline.",
          "งานดิสเพลย์ถูกจัดกลุ่มตามแบรนด์ เพื่อให้ Quantum และ Kioku แยกกันชัดเจนทั้งด้านภาพและโครงสร้าง แม้จะอยู่ในศาสตร์เดียวกัน"
        )
      : t(
          "A focused view of the work, visual system and production thinking in this discipline.",
          "มุมมองเฉพาะของผลงาน ระบบภาพ และแนวคิดด้านการผลิตในศาสตร์นี้"
        );

    const countLine = currentLanguage() === "th"
      ? `${String(projects.length).padStart(2, "0")} โปรเจกต์คัดสรร · ${categoryDescription}`
      : `${String(projects.length).padStart(2, "0")} selected ${projectWord(projects.length)}. ${categoryDescription}`;

    view.innerHTML = `
      <section class="category-page-hero category-page-shell">
        <p class="eyebrow"><span></span> ${t("Work / Selected category", "ผลงาน / หมวดหมู่ที่เลือก")}</p>
        <div class="category-page-heading">
          <h1>${portfolio.escapeHtml(label)}</h1>
          <p>${portfolio.escapeHtml(countLine)}</p>
        </div>
      </section>
      ${categoryContent}`;

    if (window.PortfolioMotion) window.PortfolioMotion.refresh(view);
  }

  render();

  // Re-render whenever the TH / EN toggle changes the site language.
  document.addEventListener("portfolio:languagechange", render);
})();
