(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let observer = null;

  root.classList.add("motion-enabled");

  const revealGroups = [
    [".section-heading", 0],
    [".intro-strip p", 55],
    [".project-card", 45],
    [".approach-title", 0],
    [".approach-list article", 70],
    [".about-lead", 0],
    [".about-copy > p", 55],
    [".service-list span", 45],
    [".case-heading > *", 70],
    [".case-gallery-item", 70],
    [".case-information > div", 70],
    [".demo-note", 0],
    [".next-project > *", 70],
    [".footer-top > *", 80],
    [".footer-bottom > *", 50]
  ];

  function markRevealElements(scope) {
    revealGroups.forEach(function (group) {
      const selector = group[0];
      const stagger = group[1];
      const elements = scope.querySelectorAll ? scope.querySelectorAll(selector) : [];

      elements.forEach(function (element, index) {
        if (element.classList.contains("reveal-item")) return;
        element.classList.add("reveal-item");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 8) * stagger}ms`);
      });
    });
  }

  function revealImmediately(scope) {
    const elements = scope.querySelectorAll ? scope.querySelectorAll(".reveal-item") : [];
    elements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  function observe(scope) {
    markRevealElements(scope);

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealImmediately(scope);
      return;
    }

    if (!observer) {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px"
        }
      );
    }

    scope.querySelectorAll(".reveal-item:not(.is-visible)").forEach(function (element) {
      observer.observe(element);
    });
  }

  function refresh(scope) {
    observe(scope || document);
  }

  function prepareIntro() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        body.classList.add("is-intro-ready");
      });
    });
  }

  function updateHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  function setupLandingParallax() {
    const landing = document.querySelector(".landing");
    const visual = document.querySelector(".landing-visual");
    if (!landing || !visual || !finePointer || reduceMotion) return;

    landing.addEventListener("pointermove", function (event) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      visual.style.setProperty("--pointer-x", `${x * 8}px`);
      visual.style.setProperty("--pointer-y", `${y * 8}px`);
    });

    landing.addEventListener("pointerleave", function () {
      visual.style.setProperty("--pointer-x", "0px");
      visual.style.setProperty("--pointer-y", "0px");
    });
  }

  function canTransitionLink(event, link) {
    if (!link || event.defaultPrevented || reduceMotion) return false;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    if (link.target && link.target !== "_self") return false;
    if (link.hasAttribute("download")) return false;

    const rawHref = link.getAttribute("href") || "";
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
      return false;
    }

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return false;

    const current = new URL(window.location.href);
    if (destination.pathname === current.pathname && destination.search === current.search && destination.hash) {
      return false;
    }

    return true;
  }

  function setupPageTransitions() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest("a[href]");
      if (!canTransitionLink(event, link)) return;

      event.preventDefault();
      body.classList.add("is-leaving");
      if (link.dataset.pageTransition === "enter") {
        body.classList.add("is-entering-portfolio");
      }

      const delay = link.dataset.pageTransition === "enter" ? 720 : 460;
      window.setTimeout(function () {
        window.location.href = link.href;
      }, delay);
    });

    window.addEventListener("pageshow", function () {
      body.classList.remove("is-leaving", "is-entering-portfolio");
    });
  }

  window.PortfolioMotion = Object.freeze({ refresh });

  refresh(document);
  prepareIntro();
  setupLandingParallax();
  setupPageTransitions();
  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });
})();
