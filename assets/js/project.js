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

  if (!view || !portfolio || !project) {
    if (view) {
      view.innerHTML = `
        <div class="project-not-found">
          <p class="eyebrow"><span></span> Project not found</p>
          <h1>Nothing on<br>this shelf.</h1>
          <a class="button-link icon-link" href="home.html#work"><span>Return to work</span>${northeastIcon}</a>
        </div>
      `;
    }
    document.title = "Project not found | Somchai Sompiew";
    return;
  }

  portfolio.setPageMeta(project.title, project.summary);

  const category = portfolio.categoryById(project.category);
  const projectBrand = project.brandLabel || project.brand || "";
  if (addressField) {
    const categoryLabel = category ? (category.label || project.sector) : project.sector;
    const categoryHref = `category.html?category=${encodeURIComponent(project.category)}`;
    const brandPath = projectBrand
      ? `<span>/</span><a href="${categoryHref}#brand-${encodeURIComponent(project.brand)}">${portfolio.escapeHtml(projectBrand)}</a>`
      : "";
    addressField.innerHTML = `<a href="home.html">Home</a><span>/</span><a href="home.html#work">Work</a><span>/</span><a href="${categoryHref}">${portfolio.escapeHtml(categoryLabel)}</a>${brandPath}<span>/</span><strong>${portfolio.escapeHtml(project.title)}</strong>`;
  }

  const scope = Array.isArray(project.scope)
    ? project.scope.map((item) => `<li>${portfolio.escapeHtml(item)}</li>`).join("")
    : "";

  const gallery = Array.isArray(project.gallery)
    ? project.gallery
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

          const fetchPriority = index === 0 ? 'fetchpriority="high"' : '';
          const loadingMode = index < 4 || optional ? 'loading="eager"' : 'loading="lazy"';

          return `
            <figure class="${itemClass}" data-gallery-slot="${slot}" data-gallery-optional="${optional}" data-gallery-state="loading">
              <button class="case-gallery-trigger" type="button" data-lightbox-trigger data-lightbox-src="${portfolio.escapeHtml(source)}" data-lightbox-alt="${portfolio.escapeHtml(alt)}" aria-label="Preview image ${index + 1} in full view">
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
        .join("")
    : "";

  view.innerHTML = `
    <div class="project-shell">
      <div class="case-heading">
      <p class="eyebrow"><span></span> ${portfolio.escapeHtml(project.sector)}${projectBrand ? ` · ${portfolio.escapeHtml(projectBrand)} Brand` : ""} · ${portfolio.escapeHtml(project.year)}</p>
      <h1>${portfolio.escapeHtml(project.title)}</h1>
      <p class="case-summary">${portfolio.escapeHtml(project.summary)}</p>
    </div>

    <div class="case-cover case-cover--${portfolio.escapeHtml(project.slug)}">${gallery}</div>

    <div class="case-information">
      <div>
        <small>Challenge</small>
        <p>${portfolio.escapeHtml(project.challenge)}</p>
      </div>
      <div>
        <small>Solution</small>
        <p>${portfolio.escapeHtml(project.solution)}</p>
      </div>
      <div>
        <small>Scope</small>
        <ul>${scope}</ul>
      </div>
      <div>
        <small>Creative direction</small>
        <p>${portfolio.escapeHtml(project.direction)}</p>
      </div>
    </div>

      ${project.demo ? '<p class="demo-note">Demo project content. Replace this information and imagery with your actual work before publishing.</p>' : ""}
    </div>
  `;

  function removeUnavailableGalleryImage(image) {
    const figure = image.closest(".case-gallery-item");
    if (!figure) return;
    figure.remove();
  }

  view.querySelectorAll("[data-gallery-image]").forEach(function (image) {
    const figure = image.closest(".case-gallery-item");

    function markLoaded() {
      if (figure) figure.dataset.galleryState = "loaded";
    }

    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", function () {
      removeUnavailableGalleryImage(image);
      refreshLightboxItems();
    }, { once: true });

    if (image.complete) {
      if (image.naturalWidth > 0) markLoaded();
      else removeUnavailableGalleryImage(image);
    }
  });

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

  refreshLightboxItems();

  lightboxItems.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      refreshLightboxItems();
      openLightbox(lightboxItems.indexOf(trigger));
    });
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

  if (window.PortfolioMotion) window.PortfolioMotion.refresh(view);

  const nextProject = portfolio.nextProject(project.slug);

  if (nextSection && nextProject) {
    nextSection.hidden = false;
    nextSection.innerHTML = `
      <p>Next project</p>
      <a href="project.html?id=${encodeURIComponent(nextProject.slug)}">
        ${portfolio.escapeHtml(nextProject.title)} <span class="icon-link">${northeastIcon}</span>
      </a>
    `;
    if (window.PortfolioMotion) window.PortfolioMotion.refresh(nextSection);
  }
})();
