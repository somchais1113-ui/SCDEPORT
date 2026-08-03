(function () {
  "use strict";

  const protectedSelectors = [
    ".landing-visual",
    ".project-image",
    ".hero-carousel-frame",
    ".category-project-card__image",
    ".case-gallery-item",
    ".project-lightbox__figure",
    ".pen-preview-section",
    ".object-study-page .study-stage",
    ".object-study-page .pen-parts-section",
    ".object-study-page .pen-mechanism-section"
  ];

  const protectedSelector = protectedSelectors.join(",");
  let hideTimer = null;

  function isProtectedTarget(target) {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest(protectedSelector));
  }

  function getToast() {
    let toast = document.querySelector(".image-protection-toast");
    if (toast) return toast;
    toast = document.createElement("div");
    toast.className = "image-protection-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = document.body.dataset.language === "th"
      ? "ภาพนี้สำหรับดูตัวอย่างบนเว็บไซต์"
      : "Preview image only";
    document.body.appendChild(toast);
    return toast;
  }

  function showToast() {
    const toast = getToast();
    toast.textContent = document.body.dataset.language === "th"
      ? "ภาพนี้สำหรับดูตัวอย่างบนเว็บไซต์"
      : "Preview image only";
    toast.classList.add("is-visible");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function prepareImages(scope) {
    const root = scope || document;
    root.querySelectorAll(protectedSelector + " img").forEach(function (image) {
      image.draggable = false;
      image.classList.add("protected-image");
      image.setAttribute("draggable", "false");
    });

    root.querySelectorAll(protectedSelector).forEach(function (zone) {
      zone.classList.add("protected-image-zone");
    });
  }

  document.addEventListener("contextmenu", function (event) {
    if (!isProtectedTarget(event.target)) return;
    event.preventDefault();
    showToast();
  });

  document.addEventListener("dragstart", function (event) {
    if (!isProtectedTarget(event.target)) return;
    event.preventDefault();
  });

  document.addEventListener("portfolio:languagechange", function () {
    const toast = document.querySelector(".image-protection-toast");
    if (!toast) return;
    toast.textContent = document.body.dataset.language === "th"
      ? "ภาพนี้สำหรับดูตัวอย่างบนเว็บไซต์"
      : "Preview image only";
  });

  const observer = new MutationObserver(function (records) {
    records.forEach(function (record) {
      record.addedNodes.forEach(function (node) {
        if (node instanceof Element) prepareImages(node);
      });
    });
  });

  prepareImages(document);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
