(function () {
  "use strict";

  const portfolio = window.SomchaiPortfolio;
  const view = document.querySelector("#project-view");
  const nextSection = document.querySelector("#next-project");
  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = portfolio ? portfolio.projectBySlug(projectId) : null;
  const northeastIcon = '<svg class="ui-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false"><path d="M5 15 15 5M7 5h8v8"/></svg>';
  const allowedLayouts = new Set(["hero", "wide", "half", "third", "medium", "portrait", "detail"]);
  const lightbox = document.querySelector("#project-lightbox");
  const lightboxImage = document.querySelector("#project-lightbox-image");
  const lightboxCaption = document.querySelector("#project-lightbox-caption");
  const lightboxCloseButtons = Array.from(document.querySelectorAll("[data-lightbox-close]"));
  const lightboxPrevButton = document.querySelector("[data-lightbox-prev]");
  const lightboxNextButton = document.querySelector("[data-lightbox-next]");
  const addressField = document.querySelector('[data-page-address="project"]');

  /* ----------------------------------------------------------------
     Language helpers - the header toggle dispatches
     "portfolio:languagechange" (see assets/js/motion.js)
     ---------------------------------------------------------------- */
  function currentLanguage() {
    return document.body.dataset.language === "th" ? "th" : "en";
  }

  function t(english, thai) {
    return currentLanguage() === "th" ? thai : english;
  }

  function pick(english, thai) {
    return currentLanguage() === "th" && thai ? thai : english;
  }

  function notFound() {
    if (view) {
      view.innerHTML = `
        <div class="project-not-found">
          <p class="eyebrow"><span></span> ${t("Project not found", "ไม่พบโปรเจกต์นี้")}</p>
          <h1>${t("Page not<br>found.", "ไม่พบ<br>หน้านี้")}</h1>
          <a class="button-link icon-link" href="home.html#work"><span>${t("Return to work", "กลับไปดูผลงาน")}</span>${northeastIcon}</a>
        </div>
      `;
    }
    document.title = t("Project not found", "ไม่พบโปรเจกต์") + " | Somchai Sompiew";
  }

  if (!view || !portfolio || !project) {
    notFound();
    document.addEventListener("portfolio:languagechange", notFound);
    return;
  }

  const category = portfolio.categoryById(project.category);

  function categoryLabel() {
    if (!category) return pick(project.sector, project.sectorTh);
    return pick(category.label, category.labelTh) || project.sector;
  }

  function projectBrand() {
    return pick(project.brandLabel || project.brand || "", project.brandLabelTh);
  }

  /* ----------------------------------------------------------------
     Gallery markup
     ---------------------------------------------------------------- */
  function galleryMarkup() {
    if (!Array.isArray(project.gallery)) return "";

    return project.gallery
      .map(function (image, index) {
        const source = typeof image === "string" ? image : image.src;
        const alt = typeof image === "string"
          ? `${project.coverAlt}, view ${index + 1}`
          : image.alt || `${project.coverAlt}, view ${index + 1}`;

        const requestedLayout = typeof image === "string" ? "" : image.layout;
        const layout = allowedLayouts.has(requestedLayout) ? requestedLayout : (index === 0 ? "hero" : "half");
        const optional = typeof image === "string" ? false : Boolean(image.optional);
        const imageWidth = typeof image === "string" ? 1600 : Number(image.width) || 1600;
        const imageHeight = typeof image === "string" ? 1000 : Number(image.height) || 1000;
        const slot = String(index + 1).padStart(2, "0");
        const itemClass = "case-gallery-item case-gallery-item--" + layout + " case-gallery-item--slot-" + slot;

        const fetchPriority = index === 0 ? 'fetchpriority="high"' : "";
        const loadingMode = index < 4 || optional ? 'loading="eager"' : 'loading="lazy"';
        const previewLabel = t("Preview image " + (index + 1) + " in full view", "ดูภาพที่ " + (index + 1) + " แบบเต็มจอ");

        return `
          <figure class="${itemClass}" data-gallery-slot="${slot}" data-gallery-optional="${optional}" data-gallery-state="loading">
            <button class="case-gallery-trigger" type="button" data-lightbox-trigger data-lightbox-src="${portfolio.escapeHtml(source)}" data-lightbox-alt="${portfolio.escapeHtml(alt)}" aria-label="${portfolio.escapeHtml(previewLabel)}">
              <img
                data-gallery-image
                src="${portfolio.escapeHtml(source)}"
                alt="${portfolio.escapeHtml(alt)}"
                width="${imageWidth}"
                height="${imageHeight}"
                ${fetchPriority}
                ${loadingMode}
                decoding="async"
              >
            </button>
          </figure>
        `;
      })
      .join("");
  }

  /* ----------------------------------------------------------------
     Lightbox
     ---------------------------------------------------------------- */
  let lightboxItems = [];
  let activeLightboxIndex = -1;
  let lightboxScrollY = 0;
  let lastFocusedTrigger = null;

  function refreshLightboxItems() {
    lightboxItems = Array.from(view.querySelectorAll("[data-lightbox-trigger]"));
    if (lightboxPrevButton && lightboxNextButton) {
      const hasMultiple = lightboxItems.length > 1;
      lightboxPrevButton.hidden = !hasMultiple;
      lightboxNextButton.hidden = !hasMultiple;
    }
  }

  function updateLightbox(index) {
    if (!lightbox || !lightboxItems.length) return;
    activeLightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const trigger = lightboxItems[activeLightboxIndex];
    const src = trigger.dataset.lightboxSrc || "";
    const alt = trigger.dataset.lightboxAlt || "";
    if (lightboxImage) {
      lightboxImage.src = src;
      lightboxImage.alt = alt;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = alt;
      lightboxCaption.hidden = !alt;
    }
  }

  function openLightbox(index) {
    if (!lightbox) return;
    refreshLightboxItems();
    if (!lightboxItems.length) return;
    lightboxScrollY = window.scrollY || window.pageYOffset || 0;
    lastFocusedTrigger = document.activeElement;
    document.body.classList.add("lightbox-open");
    document.body.style.top = "-" + lightboxScrollY + "px";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    updateLightbox(index);
    const closeButton = lightbox.querySelector(".project-lightbox__close");
    if (closeButton) closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImage) lightboxImage.src = "";
    document.body.classList.remove("lightbox-open");
    document.body.style.top = "";
    window.scrollTo(0, lightboxScrollY);
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") lastFocusedTrigger.focus();
  }

  function stepLightbox(direction) {
    if (!lightboxItems.length) return;
    updateLightbox(activeLightboxIndex + direction);
  }

  /* Delegated click handling survives every re-render of the gallery. */
  view.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-lightbox-trigger]");
    if (!trigger) return;
    refreshLightboxItems();
    openLightbox(lightboxItems.indexOf(trigger));
  });

  lightboxCloseButtons.forEach(function (button) {
    button.addEventListener("click", closeLightbox);
  });

  if (lightboxPrevButton) lightboxPrevButton.addEventListener("click", function () { stepLightbox(-1); });
  if (lightboxNextButton) lightboxNextButton.addEventListener("click", function () { stepLightbox(1); });

  document.addEventListener("keydown", function (event) {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    }
  });

  /* ----------------------------------------------------------------
     Render
     ---------------------------------------------------------------- */
  function bindGalleryFallbacks() {
    view.querySelectorAll("[data-gallery-image]").forEach(function (image) {
      const figure = image.closest(".case-gallery-item");

      function markLoaded() {
        if (figure) figure.dataset.galleryState = "loaded";
      }

      function removeUnavailable() {
        if (figure) figure.remove();
        refreshLightboxItems();
      }

      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", removeUnavailable, { once: true });

      if (image.complete) {
        if (image.naturalWidth > 0) markLoaded();
        else removeUnavailable();
      }
    });
  }

  function render() {
    const brand = projectBrand();
    const label = categoryLabel();

    portfolio.setPageMeta(project.title, pick(project.summary, project.summaryTh));

    if (addressField) {
      const categoryHref = `category.html?category=${encodeURIComponent(project.category)}`;
      const brandPath = brand
        ? `<span>/</span><a href="${categoryHref}#brand-${encodeURIComponent(project.brand)}">${portfolio.escapeHtml(brand)}</a>`
        : "";
      addressField.innerHTML =
        `<a href="home.html">${t("Home", "หน้าหลัก")}</a><span>/</span>` +
        `<a href="home.html#work">${t("Work", "ผลงาน")}</a><span>/</span>` +
        `<a href="${categoryHref}">${portfolio.escapeHtml(label)}</a>${brandPath}` +
        `<span>/</span><strong>${portfolio.escapeHtml(project.title)}</strong>`;
    }

    const scopeItems = currentLanguage() === "th" && Array.isArray(project.scopeTh)
      ? project.scopeTh
      : project.scope;

    const scope = Array.isArray(scopeItems)
      ? scopeItems.map((item) => `<li>${portfolio.escapeHtml(item)}</li>`).join("")
      : "";

    const sectorLabel = pick(project.sector, project.sectorTh);
    const brandLine = brand ? ` · ${portfolio.escapeHtml(brand)} ${t("Brand", "แบรนด์")}` : "";

    const demoNote = project.demo
      ? `<p class="demo-note">${t(
          "Demo project content. Replace this information and imagery with your actual work before publishing.",
          "เนื้อหาชุดตัวอย่าง กรุณาแทนที่ข้อมูลและภาพทั้งหมดด้วยผลงานจริงก่อนเผยแพร่"
        )}</p>`
      : "";

    const cardTag = pick(project.cardTag, project.cardTagTh);
    const cardTagMarkup = cardTag
      ? `<span class="project-format-badge project-format-badge--case">${portfolio.escapeHtml(cardTag)}</span>`
      : "";

    const impactMarkup = Array.isArray(project.impact) && project.impact.length
      ? `
        <div class="case-impact">
          <small>${t("Results", "ผลลัพธ์")}</small>
          <ul class="case-impact__list">
            ${project.impact
              .map(function (item) {
                const label = pick(item.label, item.labelTh);
                const value = pick(item.value, item.valueTh || item.value);
                return `<li><span>${portfolio.escapeHtml(label)}</span><strong>${portfolio.escapeHtml(value)}</strong></li>`;
              })
              .join("")}
          </ul>
        </div>
      `
      : "";

    view.innerHTML = `
      <div class="project-shell">
        <div class="case-heading">
        <p class="eyebrow"><span></span> ${portfolio.escapeHtml(sectorLabel)}${brandLine} · ${portfolio.escapeHtml(project.year)}</p>
        ${cardTagMarkup}
        <h1>${portfolio.escapeHtml(project.title)}</h1>
        <p class="case-summary">${portfolio.escapeHtml(pick(project.summary, project.summaryTh))}</p>
      </div>

      <div class="case-cover case-cover--${portfolio.escapeHtml(project.slug)}">${galleryMarkup()}</div>

      <div class="case-information">
        <div>
          <small>${t("Challenge", "โจทย์")}</small>
          <p>${portfolio.escapeHtml(pick(project.challenge, project.challengeTh))}</p>
        </div>
        <div>
          <small>${t("Solution", "แนวทางแก้")}</small>
          <p>${portfolio.escapeHtml(pick(project.solution, project.solutionTh))}</p>
        </div>
        <div>
          <small>${t("Scope", "ขอบเขตงาน")}</small>
          <ul>${scope}</ul>
        </div>
        <div>
          <small>${t("Creative direction", "ทิศทางสร้างสรรค์")}</small>
          <p>${portfolio.escapeHtml(pick(project.direction, project.directionTh))}</p>
        </div>
        ${impactMarkup}
      </div>

        ${demoNote}
      </div>
    `;

    bindGalleryFallbacks();
    refreshLightboxItems();

    if (window.SCGalleryFrame) window.SCGalleryFrame.refresh();
    if (window.PortfolioMotion) window.PortfolioMotion.refresh(view);

    renderNextProject();
  }

  function renderNextProject() {
    const next = portfolio.nextProject(project.slug);
    if (!nextSection || !next) return;

    nextSection.hidden = false;
    nextSection.innerHTML = `
      <p>${t("Next project", "โปรเจกต์ถัดไป")}</p>
      <a href="project.html?id=${encodeURIComponent(next.slug)}">
        ${portfolio.escapeHtml(next.title)} <span class="icon-link">${northeastIcon}</span>
      </a>
    `;
    if (window.PortfolioMotion) window.PortfolioMotion.refresh(nextSection);
  }

  render();

  document.addEventListener("portfolio:languagechange", render);
})();
