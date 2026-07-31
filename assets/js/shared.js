(function () {
  "use strict";

  const categories = Array.isArray(window.PORTFOLIO_CATEGORIES)
    ? [...window.PORTFOLIO_CATEGORIES]
    : [];

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? [...window.PORTFOLIO_PROJECTS].sort((a, b) => a.order - b.order)
    : [];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function categoryById(categoryId) {
    return categories.find((category) => category.id === categoryId) || null;
  }

  function projectBySlug(slug) {
    return projects.find((project) => project.slug === slug) || null;
  }

  function nextProject(slug) {
    const currentIndex = projects.findIndex((project) => project.slug === slug);
    if (currentIndex < 0 || projects.length < 2) return null;
    return projects[(currentIndex + 1) % projects.length];
  }

  function setPageMeta(title, description) {
    if (title) document.title = `${title} | Somchai Sompiew`;

    const descriptionElement = document.querySelector('meta[name="description"]');
    if (description && descriptionElement) {
      descriptionElement.setAttribute("content", description);
    }
  }

  window.SomchaiPortfolio = Object.freeze({
    categories,
    projects,
    escapeHtml,
    categoryById,
    projectBySlug,
    nextProject,
    setPageMeta
  });
})();
