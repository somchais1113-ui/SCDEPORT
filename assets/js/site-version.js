(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Single source of truth for the published site version.

     Before v70 the number was hand-written into six different footers and into
     every <meta name="build-version">, so they drifted apart: home said 64,
     profile said 69, category and project said 61, craft said 56 and
     object-study said 63 — all in the same release.

     Update BOTH lines below when you cut a new version, and keep them in sync
     with BUILD_VERSION.txt at the project root. Nothing else needs editing.
     -------------------------------------------------------------------------- */
  var SITE_VERSION = 70;
  var BUILD_NAME = "v70-alignment-unify";

  /* motion.js re-applies text from the data-i18n-* attributes whenever the
     language changes, so the attributes themselves must be rewritten — setting
     textContent alone would be overwritten on the first TH/EN toggle.
     This file is therefore loaded BEFORE motion.js on every page. */
  document.querySelectorAll("[data-site-version]").forEach(function (element) {
    var en = "Site version " + SITE_VERSION;
    var th = "เว็บไซต์เวอร์ชัน " + SITE_VERSION;

    element.setAttribute("data-i18n-en", en);
    element.setAttribute("data-i18n-th", th);
    element.textContent = document.body.dataset.language === "th" ? th : en;
  });

  var buildMeta = document.querySelector('meta[name="build-version"]');
  if (buildMeta) buildMeta.setAttribute("content", BUILD_NAME);
  if (document.body) document.body.dataset.build = BUILD_NAME;
})();
