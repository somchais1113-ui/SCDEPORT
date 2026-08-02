(function () {
  "use strict";

  const root = document.querySelector("[data-pen-preview]");
  if (!root) return;

  const stage = root.querySelector("[data-pen-preview-stage]");
  const model = root.querySelector("[data-pen-preview-model]");
  const status = root.querySelector("[data-pen-preview-status]");
  const hotspots = Array.from(root.querySelectorAll("[data-preview-part]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pinned = null;

  function isThai() {
    return document.body.dataset.language === "th";
  }

  function defaultStatus() {
    return isThai() ? status.dataset.statusTh : status.dataset.statusEn;
  }

  function setStatus(value) {
    if (status) status.textContent = value || defaultStatus();
  }

  function clearActive(except) {
    hotspots.forEach(function (hotspot) {
      hotspot.classList.toggle("is-active", hotspot === except);
      hotspot.setAttribute("aria-pressed", String(hotspot === except));
    });
  }

  hotspots.forEach(function (hotspot) {
    hotspot.setAttribute("aria-pressed", "false");

    hotspot.addEventListener("pointerenter", function () {
      if (!pinned) setStatus(hotspot.dataset.previewPart);
    });

    hotspot.addEventListener("pointerleave", function () {
      if (!pinned) setStatus();
    });

    hotspot.addEventListener("focus", function () {
      if (!pinned) setStatus(hotspot.dataset.previewPart);
    });

    hotspot.addEventListener("blur", function () {
      if (!pinned) setStatus();
    });

    hotspot.addEventListener("click", function () {
      pinned = pinned === hotspot ? null : hotspot;
      clearActive(pinned);
      setStatus(pinned ? pinned.dataset.previewPart : "");
    });
  });

  if (stage && model && window.PointerEvent && !reduceMotion) {
    stage.addEventListener("pointermove", function (event) {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      stage.classList.add("is-moving");
      model.style.setProperty("--pen-shift-x", (nx * 4).toFixed(2) + "px");
      model.style.setProperty("--pen-shift-y", (ny * 2).toFixed(2) + "px");
      model.style.setProperty("--pen-tilt-x", (-ny * 0.8).toFixed(2) + "deg");
      model.style.setProperty("--pen-tilt-y", (nx * 1.8).toFixed(2) + "deg");
    });

    stage.addEventListener("pointerleave", function () {
      stage.classList.remove("is-moving");
      model.style.setProperty("--pen-shift-x", "0px");
      model.style.setProperty("--pen-shift-y", "0px");
      model.style.setProperty("--pen-tilt-x", "0deg");
      model.style.setProperty("--pen-tilt-y", "0deg");
    });
  }

  document.addEventListener("portfolio:languagechange", function () {
    if (!pinned) setStatus();
  });

  setStatus();
})();
