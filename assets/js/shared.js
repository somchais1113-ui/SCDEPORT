(function () {
  "use strict";

  const categories = window.PORTFOLIO_CATEGORIES || [];
  const projects = window.PORTFOLIO_PROJECTS || [];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function categoryById(id) {
    return categories.find((category) => category.id === id);
  }

  function projectById(id) {
    return projects.find((project) => project.id === id);
  }

  function projectsByCategory(categoryId) {
    return projects.filter((project) => project.category === categoryId);
  }

  function nextProject(id) {
    const currentIndex = projects.findIndex((project) => project.id === id);
    if (currentIndex < 0 || projects.length < 2) return null;
    return projects[(currentIndex + 1) % projects.length];
  }

  function setTitle(title) {
    document.title = title ? `${title} — Somchai Sompiew` : "Somchai Sompiew — Graphic & Packaging Designer";
  }

  function setupNavigation() {
    const button = document.querySelector("[data-menu-button]");
    const navigation = document.querySelector("[data-menu]");

    if (button && navigation) {
      button.addEventListener("click", function () {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        navigation.classList.toggle("is-open", !isOpen);
      });

      navigation.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          button.setAttribute("aria-expanded", "false");
          navigation.classList.remove("is-open");
        }
      });
    }

    document.querySelectorAll("[data-year]").forEach(function (element) {
      element.textContent = new Date().getFullYear();
    });
  }

  window.Portfolio = {
    categories,
    projects,
    escapeHtml,
    categoryById,
    projectById,
    projectsByCategory,
    nextProject,
    setTitle
  };

  setupNavigation();
})();
