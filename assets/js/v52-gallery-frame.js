/* ==========================================================================
   v52 — Project gallery: justified rows
   --------------------------------------------------------------------------
   หน้าที่ของไฟล์นี้ (ทำงานคู่กับ assets/css/v52-gallery-frame.css)

   1) อ่านสัดส่วนภาพจริงของแต่ละใบ แล้วเขียนลง CSS variable --gallery-ratio
      - ใช้ค่าจาก attribute width/height ก่อน เพื่อให้ layout นิ่งตั้งแต่เฟรมแรก
        (ไม่เกิด Cumulative Layout Shift)
      - เมื่อภาพโหลดเสร็จจะอัปเดตด้วย naturalWidth/naturalHeight อีกครั้ง
        เผื่อกรณีไฟล์จริงไม่ตรงกับค่าที่ประกาศไว้ใน data/projects.js

   2) แทรกตัวคั่นแถว (.case-gallery-rowbreak) เพื่อกำหนดว่าภาพใดอยู่แถวใด
      เพราะ flex-basis: 0 จะไม่ตัดบรรทัดเองตามธรรมชาติ

   ตรรกะการจัดแถว (row weight)
      hero / wide / medium = 1     -> กินเต็มแถว
      half / portrait      = 1/2   -> 2 ใบต่อแถว
      third / detail       = 1/3   -> 3 ใบต่อแถว
   สะสมน้ำหนักไปเรื่อย ๆ เมื่อครบ 1 หรือใบถัดไปจะทำให้เกิน 1 จึงขึ้นแถวใหม่
   ========================================================================== */

(function () {
  "use strict";

  var BREAK_CLASS = "case-gallery-rowbreak";
  var EPSILON = 0.001;
  var DEFAULT_RATIO = 4 / 3;

  var ROW_WEIGHT = {
    hero: 1,
    wide: 1,
    medium: 1,
    half: 0.5,
    portrait: 0.5,
    third: 1 / 3,
    detail: 1 / 3
  };

  var FULL_ROW = { hero: true, wide: true, medium: true };

  /** อ่านชนิดเลย์เอาต์จากคลาส เช่น case-gallery-item--half -> "half" */
  function kindOf(figure) {
    var match = /case-gallery-item--([a-z]+)/.exec(figure.className);
    return match ? match[1] : "half";
  }

  /** สัดส่วนภาพ: naturalWidth/Height ถ้าโหลดแล้ว, ไม่งั้นใช้ attribute width/height */
  function ratioOf(figure) {
    var img = figure.querySelector("img");
    if (!img) return DEFAULT_RATIO;

    var width = img.naturalWidth || parseFloat(img.getAttribute("width")) || 0;
    var height = img.naturalHeight || parseFloat(img.getAttribute("height")) || 0;

    if (width > 0 && height > 0) {
      // จำกัดช่วงกันภาพที่ผอม/แบนผิดปกติทำให้แถวเพี้ยน
      return Math.min(Math.max(width / height, 0.35), 4);
    }
    return DEFAULT_RATIO;
  }

  function applyLayout(cover) {
    if (!cover) return;

    // ล้างตัวคั่นเดิมก่อนเสมอ เพื่อให้คำนวณใหม่ได้ทุกครั้ง (idempotent)
    Array.prototype.forEach.call(
      cover.querySelectorAll("." + BREAK_CLASS),
      function (node) { node.remove(); }
    );

    var items = Array.prototype.filter.call(cover.children, function (node) {
      return node.classList && node.classList.contains("case-gallery-item");
    });

    if (!items.length) return;

    var rowWeight = 0;
    var needsBreakBefore = [];

    items.forEach(function (figure, index) {
      var kind = kindOf(figure);
      var weight = ROW_WEIGHT[kind] || 0.5;

      figure.style.setProperty("--gallery-ratio", ratioOf(figure).toFixed(4));

      var startNewRow =
        index > 0 &&
        (rowWeight <= EPSILON ||               // แถวก่อนหน้าปิดพอดีแล้ว
         FULL_ROW[kind] === true ||            // ชิ้นนี้ต้องกินเต็มแถว
         rowWeight + weight > 1 + EPSILON);    // ใส่แล้วจะล้นแถว

      if (startNewRow) {
        needsBreakBefore.push(figure);
        rowWeight = 0;
      }

      rowWeight += weight;
      if (FULL_ROW[kind] === true || rowWeight >= 1 - EPSILON) rowWeight = 0;
    });

    needsBreakBefore.forEach(function (figure) {
      var spacer = document.createElement("span");
      spacer.className = BREAK_CLASS;
      spacer.setAttribute("aria-hidden", "true");
      cover.insertBefore(spacer, figure);
    });

    cover.dataset.galleryLayout = "justified";
  }

  function applyAll() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".case-cover"),
      applyLayout
    );
  }

  /* จัดครั้งแรกทันทีจาก attribute width/height (ไม่ต้องรอภาพโหลด) */
  applyAll();

  /* เมื่อภาพแต่ละใบโหลดเสร็จ ให้แก้สัดส่วนด้วยค่าจริงของไฟล์
     ใช้ capture: true เพราะ event load ของ <img> ไม่ bubble */
  document.addEventListener("load", function (event) {
    var target = event.target;
    if (!target || target.tagName !== "IMG") return;
    var figure = target.closest(".case-gallery-item");
    if (!figure) return;
    figure.style.setProperty("--gallery-ratio", ratioOf(figure).toFixed(4));
  }, true);

  /* project.js จะลบ figure ทิ้งเมื่อภาพโหลดไม่สำเร็จ -> ต้องจัดแถวใหม่ */
  document.addEventListener("error", function (event) {
    var target = event.target;
    if (!target || target.tagName !== "IMG") return;
    if (!target.closest(".case-cover")) return;
    window.requestAnimationFrame(applyAll);
  }, true);

  window.addEventListener("load", applyAll);

  /* เปิดให้เรียกซ้ำได้จากภายนอก เผื่อมีการเรนเดอร์แกลเลอรีใหม่ */
  window.SCGalleryFrame = { refresh: applyAll };
})();
