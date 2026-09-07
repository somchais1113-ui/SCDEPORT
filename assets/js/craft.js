(function () {
  "use strict";

  const data = Array.isArray(window.PORTFOLIO_CRAFT)
    ? [...window.PORTFOLIO_CRAFT].sort(function (a, b) { return a.order - b.order; })
    : [];

  const northeastIcon =
    '<svg class="ui-icon" aria-hidden="true" viewBox="0 0 20 20" focusable="false"><path d="M5 15 15 5M7 5h8v8"/></svg>';

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* Builds a bilingual span using the site's existing data-i18n mechanism,
     so motion.js swaps the text when the language toggle is used. */
  function bilingual(en, th, className) {
    const safeEn = escapeHtml(en);
    const safeTh = escapeHtml(th || en);
    const cls = className ? ` class="${className}"` : "";
    return `<span${cls} data-i18n-en="${safeEn}" data-i18n-th="${safeTh}">${safeEn}</span>`;
  }

  /* main.css styles EVERY direct span inside .eyebrow as the 6px accent dot.
     The site's own markup opts text out with .eyebrow-copy, which
     ui-controls.css resets back to auto width/height. Text inside an eyebrow
     must always carry that class or it collapses and overlaps its neighbour. */
  function eyebrow(en, th) {
    return `<p class="eyebrow"><span></span> ${bilingual(en, th, "eyebrow-copy")}</p>`;
  }

  function specRows(process) {
    return process.spec
      .map(function (row) {
        return `<div>
          <dt>${bilingual(row.label, row.labelTh)}</dt>
          <dd>${bilingual(row.value, row.valueTh)}</dd>
        </div>`;
      })
      .join("");
  }

  function draftNotice() {
    return `<p class="craft-draft-note">${bilingual(
      "Draft: production figures on this page are general industry reference points and still need checking against real experience.",
      "ฉบับร่าง ตัวเลขการผลิตในหน้านี้เป็นค่าอ้างอิงทั่วไปของอุตสาหกรรม ยังต้องตรวจสอบกับประสบการณ์จริงก่อนเผยแพร่"
    )}</p>`;
  }

  /* ---------------------------------------------------------------------
     LIST PAGE - craft.html
     --------------------------------------------------------------------- */
  function renderList(mount) {
    const index = data
      .map(function (process) {
        return `<a href="#${escapeHtml(process.slug)}">
          <b>${escapeHtml(process.code)}</b>
          ${bilingual(process.title, process.titleTh)}
        </a>`;
      })
      .join("");

    const rows = data
      .map(function (process) {
        return `
          <article class="craft-row" id="${escapeHtml(process.slug)}">
            <a class="craft-row__figure" href="craft-detail.html?id=${encodeURIComponent(process.slug)}" aria-label="View ${escapeHtml(process.title)} examples">
              <img
                src="${escapeHtml(process.cover)}"
                alt="${escapeHtml(process.coverAlt)}"
                width="1400"
                height="1050"
                loading="lazy"
                decoding="async"
              >
              <span class="craft-row__code">${escapeHtml(process.code)}</span>
            </a>
            <div class="craft-row__content">
              ${eyebrow(
                process.title + " · " + process.subtitle,
                process.titleTh + " · " + process.subtitleTh
              )}
              <p class="craft-quote">${bilingual(process.quote, process.quoteTh)}</p>
              <dl class="craft-spec">${specRows(process)}</dl>
              <p class="craft-close">${bilingual(process.close, process.closeTh)}</p>
              <a class="craft-more icon-link stroke-flow-button" href="craft-detail.html?id=${encodeURIComponent(process.slug)}">
                ${bilingual("Explore the process", "ดูรายละเอียดกระบวนการ")}
                ${northeastIcon}
              </a>
            </div>
          </article>`;
      })
      .join("");

    mount.innerHTML = `
      <section class="craft-hero shell">
        ${eyebrow("Craft & Process", "งานฝีมือและกระบวนการผลิต")}
        <h1>
          ${bilingual("Design informed by", "ออกแบบด้วยความเข้าใจ")}
          <em data-i18n-en="print production." data-i18n-th="กระบวนการผลิต">print production.</em>
        </h1>
        <p class="craft-deck">${bilingual(
          "An overview of printing and surface engraving, with diagrams explaining the mechanisms and design decisions to discuss with production partners.",
          "ความรู้เกี่ยวกับการพิมพ์และการสลักผิว พร้อมแผนภาพอธิบายหลักการและประเด็นที่ควรตกลงร่วมกับผู้ผลิตก่อนทำอาร์ตเวิร์ก"
        )}</p>
        <nav class="craft-index" aria-label="Jump to a print process">${index}</nav>
      </section>

      <section class="craft-list shell" aria-label="Print processes">${rows}</section>
    `;
  }

  /* ---------------------------------------------------------------------
     DETAIL PAGE - craft-detail.html?id=<slug>
     --------------------------------------------------------------------- */
  function renderDetail(mount) {
    const slug = new URLSearchParams(window.location.search).get("id");
    const process = data.find(function (item) { return item.slug === slug; }) || null;

    if (!process) {
      mount.innerHTML = `
        <div class="project-not-found shell">
          <p class="eyebrow"><span></span> Process not found</p>
          <h1>Nothing on<br>this press.</h1>
          <a class="button-link icon-link" href="craft.html"><span>Back to Craft &amp; Process</span>${northeastIcon}</a>
        </div>`;
      document.title = "Process not found | Somchai Sompiew";
      return;
    }

    document.title = `${process.title} | Craft & Process | Somchai Sompiew`;

    const address = document.querySelector('[data-page-address="craft-detail"]');
    if (address) {
      address.innerHTML =
        `<a href="home.html">${bilingual("Home", "หน้าหลัก")}</a><span>/</span>` +
        `<a href="craft.html">${bilingual("Craft & Process", "ความรู้ด้านงานพิมพ์และการผลิต")}</a><span>/</span>` +
        `<strong>${bilingual(process.title, process.titleTh)}</strong>`;
    }

    const examples = process.examples
      .map(function (example, i) {
        return `
          <figure class="craft-example">
            <img
              src="${escapeHtml(example.src)}"
              alt="${escapeHtml(example.alt)}" data-alt-en="${escapeHtml(example.alt)}" data-alt-th="${escapeHtml(example.altTh)}"
              width="${Number(example.width) || 1400}"
              height="${Number(example.height) || 1050}"
              ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
              decoding="async"
            >
            <figcaption>
              <b>${String(i + 1).padStart(2, "0")}</b>
              <div>${bilingual(example.caption, example.captionTh)}<p class="craft-example__description">${bilingual(example.description, example.descriptionTh)}</p></div>
            </figcaption>
          </figure>`;
      })
      .join("");

    /* Previous / next process, so the five pages read as one set. */
    const position = data.indexOf(process);
    const next = data[(position + 1) % data.length];

    mount.innerHTML = `
      <section class="craft-detail-hero shell">
        ${process.draft ? draftNotice() : ""}
        ${eyebrow(
          "Craft & Process · " + process.subtitle,
          "งานฝีมือและกระบวนการผลิต · " + process.subtitleTh
        )}
        <h1><span class="craft-detail-code">${escapeHtml(process.code)}</span> ${bilingual(process.title, process.titleTh)}</h1>
        <p class="craft-quote">${bilingual(process.quote, process.quoteTh)}</p>
        <dl class="craft-spec craft-spec--wide">${specRows(process)}</dl>
        <p class="craft-close">${bilingual(process.close, process.closeTh)}</p>
      </section>

      <section class="craft-examples shell" aria-label="Examples">
        ${eyebrow("Process explained", "อธิบายกระบวนการ")}
        <p class="craft-reference-note">${bilingual("Explanatory diagrams, not photographs of completed projects. Simplified and not to scale.", "ภาพประกอบเพื่ออธิบายหลักการ ไม่ใช่ภาพถ่ายผลงานจริง โดยลดทอนรายละเอียดและไม่อ้างอิงสัดส่วนเครื่องจักร")}</p>
        <div class="craft-example-grid">${examples}</div>
      </section>

      <section class="craft-sources shell">
        <h2>${bilingual("Technical references", "แหล่งอ้างอิงทางเทคนิค")}</h2>
        <ul>${process.sources.map(source => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`).join("")}</ul>
        <p>${bilingual("Actual settings and costs depend on the job, materials and equipment. Agree these with the production partner.", "ค่าตั้งงานและต้นทุนจริงขึ้นอยู่กับชิ้นงาน วัสดุ และเครื่องจักร ควรตกลงรายละเอียดร่วมกับผู้ผลิต")}</p>
      </section>

      <section class="craft-next shell">
        <p>${bilingual("Next process", "กระบวนการถัดไป")}</p>
        <a href="craft-detail.html?id=${encodeURIComponent(next.slug)}">
          <b>${escapeHtml(next.code)}</b>
          ${bilingual(next.title, next.titleTh)}
          <span class="icon-link">${northeastIcon}</span>
        </a>
      </section>
    `;
  }

  function updateImageLanguage() {
    const th = document.body.dataset.language === "th";
    document.querySelectorAll("[data-alt-en][data-alt-th]").forEach(img => { img.alt = th ? img.dataset.altTh : img.dataset.altEn; });
  }
  document.addEventListener("portfolio:languagechange", updateImageLanguage);

  const listMount = document.querySelector("[data-craft-list]");
  const detailMount = document.querySelector("[data-craft-detail]");

  if (listMount) renderList(listMount);
  if (detailMount) renderDetail(detailMount);

  /* Re-apply the saved language to the markup we just injected, and hand the
     new nodes to the scroll-reveal observer. */
  const mount = listMount || detailMount;
  if (mount) {
    let language = "en";
    try {
      language = window.localStorage.getItem("portfolio-language") || "en";
    } catch {
      language = "en";
    }
    if (language === "th") {
      document.querySelectorAll("[data-i18n-en][data-i18n-th]").forEach(function (element) {
        if (element.dataset.i18nTh) element.textContent = element.dataset.i18nTh;
      });
    }
    updateImageLanguage();
    if (window.PortfolioMotion) window.PortfolioMotion.refresh(mount);
  }
})();
