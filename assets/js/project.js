(function () {
  "use strict";

  const portfolio = window.SomchaiPortfolio;
  const view = document.querySelector("#project-view");
  const nextSection = document.querySelector("#next-project");
  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = portfolio ? portfolio.projectBySlug(projectId) : null;
  const northeastIcon = '<svg class="ui-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false"><path d="M5 15 15 5M7 5h8v8"/></svg>';

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

          return `
            <figure class="case-gallery-item">
              <a href="${portfolio.escapeHtml(source)}" target="_blank" rel="noopener" aria-label="Open image ${index + 1} at full size">
                <img
                  src="${portfolio.escapeHtml(source)}"
                  alt="${portfolio.escapeHtml(alt)}"
                  width="1448"
                  height="1086"
                  ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                  decoding="async"
                >
              </a>
            </figure>
          `;
        })
        .join("")
    : "";

  view.innerHTML = `
    <div class="case-heading">
      <p class="eyebrow"><span></span> ${portfolio.escapeHtml(project.sector)} · ${portfolio.escapeHtml(project.year)}</p>
      <h1>${portfolio.escapeHtml(project.title)}</h1>
      <p class="case-summary">${portfolio.escapeHtml(project.summary)}</p>
    </div>

    <div class="case-cover">${gallery}</div>

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
  `;

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
