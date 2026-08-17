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
    [".footer-directory > *", 55],
    [".footer-bottom > *", 50],
    [".pen-study-heading > *", 55],
    [".pen-side-menu button", 38],
    [".pen-parts-heading > *", 55],
    [".pen-parts-list button", 45],
    [".pen-mechanism-grid article", 55],
    [".profile-metrics article", 55],
    [".profile-section-heading", 0],
    [".profile-statement__grid > *", 0],
    [".profile-timeline__item", 60],
    [".profile-compact-timeline__item", 45],
    /* v69 renamed the timeline and education markup; without these two the
       new Profile sections never receive their scroll reveal. */
    [".profile-work-timeline__item", 60],
    [".profile-education-card", 55],
    [".profile-outcome-card", 90],
    [".profile-leadership-grid article", 55],
    [".profile-practice__grid article", 45],
    [".profile-capability-map article", 55],
    [".profile-education__list article", 55],
    [".profile-education__grid article", 55],
    [".profile-close__grid > *", 0]
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
    const drawing = document.querySelector(".landing-drawing");
    if (!landing || !visual || !finePointer || reduceMotion) return;

    landing.addEventListener("pointermove", function (event) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      visual.style.setProperty("--pointer-x", `${x * 9}px`);
      visual.style.setProperty("--pointer-y", `${y * 9}px`);
      if (drawing) {
        drawing.style.setProperty("--drawing-x", `${x * -5}px`);
        drawing.style.setProperty("--drawing-y", `${y * -5}px`);
      }
    });

    landing.addEventListener("pointerleave", function () {
      visual.style.setProperty("--pointer-x", "0px");
      visual.style.setProperty("--pointer-y", "0px");
      if (drawing) {
        drawing.style.setProperty("--drawing-x", "0px");
        drawing.style.setProperty("--drawing-y", "0px");
      }
    });
  }

  function updateCarouselCopy(carousel, activeSlide) {
    if (!carousel || !activeSlide) return;

    const language = body.dataset.language === "th" ? "th" : "en";
    const caption = carousel.querySelector("[data-carousel-caption]");
    const sector = carousel.querySelector("[data-carousel-sector]");
    const year = carousel.querySelector("[data-carousel-year]");
    const title = carousel.querySelector("[data-carousel-title]:not([data-carousel-slide])");
    const summary = carousel.querySelector("[data-carousel-summary]:not([data-carousel-slide])");
    const projectLink = carousel.querySelector("[data-carousel-link]");

    if (caption) {
      caption.textContent = language === "th"
        ? activeSlide.dataset.carouselLabelTh || ""
        : activeSlide.dataset.carouselLabelEn || "";
    }

    if (sector) {
      sector.textContent = language === "th"
        ? activeSlide.dataset.carouselSectorTh || ""
        : activeSlide.dataset.carouselSectorEn || "";
    }

    if (year) year.textContent = activeSlide.dataset.carouselYear || "";
    if (title) title.textContent = activeSlide.dataset.carouselTitle || "";

    if (summary) {
      summary.textContent = language === "th"
        ? activeSlide.dataset.carouselSummaryTh || ""
        : activeSlide.dataset.carouselSummaryEn || "";
    }

    if (projectLink && activeSlide.dataset.carouselHref) {
      projectLink.setAttribute("href", activeSlide.dataset.carouselHref);
      const projectTitle = activeSlide.dataset.carouselTitle || "project";
      projectLink.setAttribute(
        "aria-label",
        language === "th" ? `ดูโปรเจกต์ ${projectTitle}` : `View ${projectTitle} project`
      );
    }
  }

  function setupLanguageToggle() {
    const languageButtons = document.querySelectorAll("[data-language]");
    if (!languageButtons.length) return;

    function applyLanguage(language) {
      const nextLanguage = language === "th" ? "th" : "en";
      body.dataset.language = nextLanguage;
      root.lang = nextLanguage;

      document.querySelectorAll("[data-i18n-en][data-i18n-th]").forEach(function (element) {
        element.textContent = nextLanguage === "th" ? element.dataset.i18nTh : element.dataset.i18nEn;
      });

      document.querySelectorAll("[data-aria-en][data-aria-th]").forEach(function (element) {
        const label = nextLanguage === "th" ? element.dataset.ariaTh : element.dataset.ariaEn;
        if (label) element.setAttribute("aria-label", label);
      });

      languageButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.language === nextLanguage));
      });

      document.querySelectorAll("[data-carousel-root], [data-carousel]").forEach(function (carousel) {
        const activeSlide = carousel.querySelector("[data-carousel-slide].is-active, .landing-slide.is-active");
        updateCarouselCopy(carousel, activeSlide);
      });

      try {
        window.localStorage.setItem("portfolio-language", nextLanguage);
      } catch {
        // Language still works when storage is unavailable.
      }

      document.dispatchEvent(new CustomEvent("portfolio:languagechange", {
        detail: { language: nextLanguage }
      }));
    }

    let savedLanguage = "en";
    try {
      savedLanguage = window.localStorage.getItem("portfolio-language") || "en";
    } catch {
      savedLanguage = "en";
    }

    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyLanguage(button.dataset.language);
      });
    });

    applyLanguage(savedLanguage);
  }

  function setupCarousels() {
    document.querySelectorAll("[data-carousel-root], [data-carousel]").forEach(function (carousel) {
      const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide], .landing-slide"));
      const currentLabels = carousel.querySelectorAll("[data-carousel-current]");
      const caption = carousel.querySelector("[data-carousel-caption]");
      const previousButton = carousel.querySelector("[data-carousel-prev]");
      const nextButton = carousel.querySelector("[data-carousel-next]");
      const dragSurface = carousel.querySelector("[data-carousel-drag-surface]");
      const delay = Number(carousel.dataset.carouselDelay) || 4200;
      if (slides.length < 2) return;

      let activeIndex = 0;
      let timer = null;
      let pointerId = null;
      let pointerStartX = 0;
      let pointerDeltaX = 0;

      function animateEditorialCopy() {
        if (!carousel.querySelector(".hero-carousel-editorial")) return;
        carousel.classList.remove("is-updating");
        window.requestAnimationFrame(function () {
          carousel.classList.add("is-updating");
        });
      }

      function showSlide(nextIndex) {
        activeIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach(function (slide, index) {
          const isActive = index === activeIndex;
          slide.classList.toggle("is-active", isActive);
          if (isActive) slide.removeAttribute("aria-hidden");
          else slide.setAttribute("aria-hidden", "true");
        });

        const number = String(activeIndex + 1).padStart(2, "0");
        currentLabels.forEach(function (label) {
          label.textContent = number;
        });

        updateCarouselCopy(carousel, slides[activeIndex]);
        animateEditorialCopy();
      }

      function stopAutoplay() {
        if (!timer) return;
        window.clearInterval(timer);
        timer = null;
      }

      function startAutoplay() {
        stopAutoplay();
        if (reduceMotion || document.hidden) return;
        timer = window.setInterval(function () {
          showSlide(activeIndex + 1);
        }, delay);
      }

      if (previousButton) {
        previousButton.addEventListener("click", function () {
          showSlide(activeIndex - 1);
          startAutoplay();
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", function () {
          showSlide(activeIndex + 1);
          startAutoplay();
        });
      }

      function clearDragState() {
        if (!dragSurface) return;
        dragSurface.style.removeProperty("--carousel-drag-x");
        carousel.classList.remove("is-dragging");
        pointerId = null;
        pointerDeltaX = 0;
      }

      function finishDrag(event) {
        if (pointerId === null || (event.pointerId !== undefined && event.pointerId !== pointerId)) return;
        const threshold = Math.max(45, Math.min(90, carousel.clientWidth * 0.12));
        const direction = pointerDeltaX < 0 ? 1 : -1;
        const shouldAdvance = Math.abs(pointerDeltaX) >= threshold;

        clearDragState();
        if (shouldAdvance) showSlide(activeIndex + direction);
        startAutoplay();
      }

      if (dragSurface && window.PointerEvent) {
        dragSurface.addEventListener("pointerdown", function (event) {
          if (event.target.closest("button, a, input, select, textarea")) return;
          if (event.pointerType === "mouse" && event.button !== 0) return;
          pointerId = event.pointerId;
          pointerStartX = event.clientX;
          pointerDeltaX = 0;
          stopAutoplay();
          if (dragSurface.setPointerCapture) dragSurface.setPointerCapture(pointerId);
        });

        dragSurface.addEventListener("pointermove", function (event) {
          if (pointerId === null || event.pointerId !== pointerId) return;
          pointerDeltaX = event.clientX - pointerStartX;
          if (Math.abs(pointerDeltaX) < 4) return;
          carousel.classList.add("is-dragging");
          const restrainedDelta = Math.max(-110, Math.min(110, pointerDeltaX * 0.72));
          dragSurface.style.setProperty("--carousel-drag-x", `${restrainedDelta}px`);
        });

        dragSurface.addEventListener("pointerup", finishDrag);
        dragSurface.addEventListener("pointercancel", finishDrag);
        dragSurface.addEventListener("lostpointercapture", function () {
          if (pointerId !== null) finishDrag({ pointerId: pointerId });
        });
      }

      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);
      carousel.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          showSlide(activeIndex - 1);
          startAutoplay();
        }
        if (event.key === "ArrowRight") {
          showSlide(activeIndex + 1);
          startAutoplay();
        }
      });

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stopAutoplay();
        else startAutoplay();
      });

      showSlide(0);
      startAutoplay();
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
      link.classList.add("is-transitioning");
      if (link.dataset.pageTransition === "enter") {
        body.classList.add("is-entering-portfolio");
        link.classList.add("is-loading");
        const label = link.querySelector("span");
        if (label) {
          link.dataset.idleLabel = label.textContent;
          label.textContent = body.dataset.language === "th"
            ? label.dataset.loadingTh
            : label.dataset.loadingEn;
        }
      }

      const delay = link.dataset.pageTransition === "enter" ? 720 : 620;
      window.setTimeout(function () {
        window.location.href = link.href;
      }, delay);
    });

    window.addEventListener("pageshow", function () {
      body.classList.remove("is-leaving", "is-entering-portfolio");
      document.querySelectorAll("a.is-transitioning").forEach(function (link) {
        link.classList.remove("is-transitioning");
      });
      document.querySelectorAll(".landing-enter.is-loading").forEach(function (link) {
        const label = link.querySelector("span");
        if (label && link.dataset.idleLabel) label.textContent = link.dataset.idleLabel;
        link.classList.remove("is-loading");
      });
    });
  }

  window.PortfolioMotion = Object.freeze({ refresh });

  refresh(document);
  prepareIntro();
  setupLandingParallax();
  setupLanguageToggle();
  setupCarousels();
  setupPageTransitions();
  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });
})();
