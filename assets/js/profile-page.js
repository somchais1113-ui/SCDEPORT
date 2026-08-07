(function () {
  "use strict";

  const body = document.body;
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#site-nav");

  function currentLanguage() {
    return body.dataset.language === "th" ? "th" : "en";
  }

  function menuLabel(isOpen) {
    const language = currentLanguage();
    if (!menuButton) return "";
    if (isOpen) {
      return language === "th" ? menuButton.dataset.i18nCloseTh : menuButton.dataset.i18nCloseEn;
    }
    return language === "th" ? menuButton.dataset.i18nMenuTh : menuButton.dataset.i18nMenuEn;
  }

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = menuLabel(false);
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = menuLabel(isOpen);
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  document.addEventListener("portfolio:languagechange", function () {
    if (menuButton && menuButton.getAttribute("aria-expanded") !== "true") {
      menuButton.textContent = menuLabel(false);
    }
  });


  // V68: keep work-history detail optional and compact. Only one role expands at a time.
  const jobDetails = Array.from(document.querySelectorAll(".profile-job-detail"));
  jobDetails.forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      jobDetails.forEach(function (other) {
        if (other !== detail && other.open) other.open = false;
      });
    });
  });

  closeMenu();
})();
