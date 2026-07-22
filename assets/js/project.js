(function () {
  "use strict";

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? [...window.PORTFOLIO_PROJECTS].sort((a, b) => a.order - b.order)
    : [];
  const view = document.querySelector("#project-view");
  const nextSection = document.querySelector("#next-project");
  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = projects.find((item) => item.slug === projectId);

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  if (!view || !project) {
    if (view) {
      view.innerHTML = `
        <div class="project-not-found">
          <p class="eyebrow"><span></span> Project not found</p>
          <h1>Nothing on<br />this shelf.</h1>
          <a class="button-link" href="index.html#work">Return to work ↗</a>
        </div>
      `;
    }
    document.title = "Project not found | Somchai Sompiew";
    return;
  }

  document.title = `${project.title} | Somchai Sompiew`;

  const scope = project.scope.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const gallery = project.gallery
    .map(
      (image, index) => `
        <figure class="case-gallery-item">
          <img
            src="${escapeHtml(image)}"
            alt="${escapeHtml(project.alt)}${index ? `, view ${index + 1}` : ""}"
            width="1448"
            height="1086"
            ${index ? 'loading="lazy"' : ""}
            decoding="async"
          />
        </figure>
      `
    )
    .join("");

  view.innerHTML = `
    <div class="case-heading">
      <p class="eyebrow"><span></span> ${escapeHtml(project.sector)} · ${escapeHtml(project.year)}</p>
      <h1>${escapeHtml(project.title)}</h1>
      <p class="case-summary">${escapeHtml(project.summary)}</p>
    </div>

    <div class="case-cover">${gallery}</div>

    <div class="case-information">
      <div>
        <small>Challenge</small>
        <p>${escapeHtml(project.challenge)}</p>
      </div>
      <div>
        <small>Solution</small>
        <p>${escapeHtml(project.solution)}</p>
      </div>
      <div>
        <small>Scope</small>
        <ul>${scope}</ul>
      </div>
      <div>
        <small>Creative direction</small>
        <p>${escapeHtml(project.direction)}</p>
      </div>
    </div>

    ${project.demo ? '<p class="demo-note">Demo project content. Replace this information and imagery with your actual work before publishing.</p>' : ""}
  `;

  const currentIndex = projects.indexOf(project);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (nextSection && nextProject) {
    nextSection.hidden = false;
    nextSection.innerHTML = `
      <p>Next project</p>
      <a href="project.html?id=${encodeURIComponent(nextProject.slug)}">
        ${escapeHtml(nextProject.title)} <span>↗</span>
      </a>
    `;
  }
})();
