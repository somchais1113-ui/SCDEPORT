(function () {
  "use strict";

  const body = document.body;
  const object = document.querySelector("[data-pen-object]");
  const modeButtons = Array.from(document.querySelectorAll("[data-pen-mode-button]"));
  const hotspots = Array.from(document.querySelectorAll("[data-pen-part]"));
  const partJumps = Array.from(document.querySelectorAll("[data-part-jump]"));
  const panelIndex = document.querySelector(".pen-info-index");
  const panelTitle = document.querySelector("[data-pen-info-title]");
  const panelCopy = document.querySelector("[data-pen-info-copy]");
  const panelStatus = document.querySelector("[data-pen-info-status]");
  const panelAction = document.querySelector("[data-pen-info-action]");
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#site-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const modeContent = {
    overview: {
      index: "01 / Overview",
      titleEn: "One object.\nFive visible parts.",
      titleTh: "หนึ่งวัตถุ\nห้าส่วนประกอบที่มองเห็น",
      copyEn: "A neutral-grey mockup establishes the overall proportion before colour, materials and production details are developed.",
      copyTh: "ม็อกอัปสีเทากลางช่วยกำหนดสัดส่วนโดยรวม ก่อนพัฒนาเรื่องสี วัสดุ และรายละเอียดสำหรับการผลิต",
      statusEn: "Visual prototype",
      statusTh: "ต้นแบบเชิงภาพ",
      actionEn: "Drag / Select a mode",
      actionTh: "ลาก / เลือกโหมด"
    },
    anatomy: {
      index: "02 / Anatomy",
      titleEn: "Select a part.\nRead its role.",
      titleTh: "เลือกชิ้นส่วน\nแล้วอ่านหน้าที่ของมัน",
      copyEn: "Five external components create the pen’s silhouette, handling and visual rhythm.",
      copyTh: "องค์ประกอบภายนอกทั้งห้าส่วนร่วมกันสร้างรูปทรง การจับถือ และจังหวะทางสายตาของปากกา",
      statusEn: "Interactive anatomy",
      statusTh: "โครงสร้างแบบโต้ตอบ",
      actionEn: "Select 01–05",
      actionTh: "เลือกหมายเลข 01–05"
    },
    exploded: {
      index: "03 / Exploded View",
      titleEn: "Structure\nbefore surface.",
      titleTh: "มองโครงสร้าง\nก่อนมองพื้นผิว",
      copyEn: "This prototype maps the separation logic of each external part. A future CAD model can replace the guide with a true mechanical exploded view.",
      copyTh: "ต้นแบบนี้แสดงลำดับการแยกชิ้นส่วนภายนอก และสามารถเปลี่ยนเป็น Exploded View เชิงกลจริงได้เมื่อมีไฟล์ CAD",
      statusEn: "Structure map",
      statusTh: "แผนผังโครงสร้าง",
      actionEn: "Five-part sequence",
      actionTh: "ลำดับห้าชิ้นส่วน"
    },
    material: {
      index: "04 / Material & Finish",
      titleEn: "A controlled\ngrey study.",
      titleTh: "ศึกษาโทนเทา\nอย่างมีระบบ",
      copyEn: "Satin, semi-gloss and metallic surfaces separate function without introducing colour too early.",
      copyTh: "ผิวซาติน กึ่งเงา และโลหะ ช่วยแบ่งหน้าที่ของแต่ละส่วน โดยยังไม่รีบใช้สีมารบกวนการมองรูปทรง",
      statusEn: "CMF direction",
      statusTh: "แนวทาง CMF",
      actionEn: "Compare three finishes",
      actionTh: "เปรียบเทียบสามผิวสัมผัส"
    },
    colour: {
      index: "05 / Colour System",
      titleEn: "Neutral first.\nColour comes next.",
      titleTh: "เริ่มจากความเป็นกลาง\nแล้วจึงพัฒนาสี",
      copyEn: "A five-step grey scale gives the future colour system a clear hierarchy for primary, supporting and accent parts.",
      copyTh: "สเกลสีเทาห้าระดับช่วยวางลำดับให้ระบบสีในอนาคต ทั้งส่วนหลัก ส่วนสนับสนุน และจุดเน้น",
      statusEn: "Base palette",
      statusTh: "พาเลตต์ตั้งต้น",
      actionEn: "Five neutral values",
      actionTh: "ค่าสีกลางห้าระดับ"
    }
  };

  const partContent = {
    pusher: {
      index: "01 / Pusher",
      titleEn: "The first\npoint of action.",
      titleTh: "จุดเริ่มต้น\nของทุกการกด",
      copyEn: "The pusher transfers a short press into the internal retract mechanism. Its travel and resistance define the first tactile impression.",
      copyTh: "Pusher ส่งแรงกดสั้น ๆ ไปยังกลไกเก็บหัวปากกา ระยะกดและแรงต้านจึงเป็นสัมผัสแรกที่ผู้ใช้รับรู้",
      statusEn: "Actuator",
      statusTh: "ชิ้นส่วนรับแรงกด",
      actionEn: "Press / Release",
      actionTh: "กด / ปล่อย"
    },
    clip: {
      index: "02 / Clip",
      titleEn: "Retention\nwith character.",
      titleTh: "ยึดเก็บได้\nพร้อมสร้างบุคลิก",
      copyEn: "The clip secures the pen to a pocket or notebook while acting as a precise visual accent along the barrel.",
      copyTh: "Clip ช่วยยึดปากกากับกระเป๋าหรือสมุด และทำหน้าที่เป็นเส้นเน้นที่สร้างบุคลิกให้ตัวด้าม",
      statusEn: "Retention part",
      statusTh: "ชิ้นส่วนยึดเก็บ",
      actionEn: "Flex / Return",
      actionTh: "ยืดหยุ่น / คืนตัว"
    },
    barrel: {
      index: "03 / Barrel",
      titleEn: "The main\nstructural body.",
      titleTh: "โครงสร้างหลัก\nที่รวมทุกส่วน",
      copyEn: "The barrel houses the refill and mechanism while setting the overall length, balance and visual proportion.",
      copyTh: "Barrel เก็บไส้และกลไกภายใน พร้อมกำหนดความยาว สมดุล และสัดส่วนหลักของปากกา",
      statusEn: "Primary housing",
      statusTh: "โครงสร้างหุ้มหลัก",
      actionEn: "Hold / Protect",
      actionTh: "รองรับ / ปกป้อง"
    },
    grip: {
      index: "04 / Grip",
      titleEn: "Control at\nthe fingertips.",
      titleTh: "ควบคุมจังหวะ\nที่ปลายนิ้ว",
      copyEn: "A lightly faceted grip helps orient the fingers, control rotation and create a confident writing hold.",
      copyTh: "Grip ที่มีเหลี่ยมอย่างพอดีช่วยจัดตำแหน่งนิ้ว ลดการหมุน และสร้างความมั่นคงขณะเขียน",
      statusEn: "Control surface",
      statusTh: "พื้นผิวควบคุม",
      actionEn: "Orient / Stabilise",
      actionTh: "จัดทิศ / เพิ่มความมั่นคง"
    },
    cone: {
      index: "05 / Cone",
      titleEn: "A precise\nending point.",
      titleTh: "ปลายทาง\nที่ต้องแม่นยำ",
      copyEn: "The cone aligns and protects the refill tip, guiding the silhouette into a controlled writing point.",
      copyTh: "Cone จัดแนวและปกป้องหัวไส้ปากกา พร้อมนำรูปทรงทั้งหมดเข้าสู่จุดเขียนอย่างแม่นยำ",
      statusEn: "Tip housing",
      statusTh: "โครงสร้างหุ้มหัวเขียน",
      actionEn: "Align / Guide",
      actionTh: "จัดแนว / นำหัวเขียน"
    }
  };

  let activeMode = "overview";
  let activePart = "barrel";
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startRotateX = 0;
  let startRotateY = 0;
  let rotateX = 0;
  let rotateY = 0;

  function isThai() {
    return body.dataset.language === "th";
  }

  function renderPanel(content) {
    if (!content) return;
    if (panelIndex) panelIndex.textContent = content.index;
    if (panelTitle) panelTitle.textContent = isThai() ? content.titleTh : content.titleEn;
    if (panelCopy) panelCopy.textContent = isThai() ? content.copyTh : content.copyEn;
    if (panelStatus) panelStatus.textContent = isThai() ? content.statusTh : content.statusEn;
    if (panelAction) panelAction.textContent = isThai() ? content.actionTh : content.actionEn;
  }

  function selectPart(part) {
    if (!partContent[part]) return;
    activePart = part;
    hotspots.forEach(function (hotspot) {
      const selected = hotspot.dataset.penPart === part;
      hotspot.classList.toggle("is-active", selected);
      hotspot.setAttribute("aria-pressed", String(selected));
    });
    renderPanel(partContent[part]);
  }

  function setMode(mode) {
    if (!modeContent[mode]) return;
    activeMode = mode;
    body.dataset.penMode = mode;

    modeButtons.forEach(function (button) {
      const selected = button.dataset.penModeButton === mode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (mode === "anatomy") selectPart(activePart);
    else renderPanel(modeContent[mode]);
  }

  function applyRotation() {
    if (!object) return;
    object.style.setProperty("--pen-rotate-x", rotateX.toFixed(2) + "deg");
    object.style.setProperty("--pen-rotate-y", rotateY.toFixed(2) + "deg");
  }

  function finishDrag(event) {
    if (pointerId === null || (event.pointerId !== undefined && event.pointerId !== pointerId)) return;
    object.classList.remove("is-dragging");
    pointerId = null;
  }

  if (object && window.PointerEvent && !reduceMotion) {
    object.addEventListener("pointerdown", function (event) {
      if (event.target.closest("[data-pen-part]")) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startRotateX = rotateX;
      startRotateY = rotateY;
      object.classList.add("is-dragging");
      if (object.setPointerCapture) object.setPointerCapture(pointerId);
    });

    object.addEventListener("pointermove", function (event) {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const width = Math.max(object.clientWidth, 1);
      const height = Math.max(object.clientHeight, 1);
      rotateY = Math.max(-10, Math.min(10, startRotateY + ((event.clientX - startX) / width) * 24));
      rotateX = Math.max(-4, Math.min(4, startRotateX - ((event.clientY - startY) / height) * 12));
      applyRotation();
    });

    object.addEventListener("pointerup", finishDrag);
    object.addEventListener("pointercancel", finishDrag);
    object.addEventListener("lostpointercapture", function () {
      if (pointerId !== null) finishDrag({ pointerId: pointerId });
    });

    object.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") rotateY = Math.max(-10, rotateY - 2);
      else if (event.key === "ArrowRight") rotateY = Math.min(10, rotateY + 2);
      else if (event.key === "ArrowUp") rotateX = Math.max(-4, rotateX - 1);
      else if (event.key === "ArrowDown") rotateX = Math.min(4, rotateX + 1);
      else if (event.key === "Home") {
        rotateX = 0;
        rotateY = 0;
      } else return;
      event.preventDefault();
      applyRotation();
    });
  }

  modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setMode(button.dataset.penModeButton);
    });
  });

  hotspots.forEach(function (hotspot) {
    hotspot.setAttribute("aria-pressed", "false");
    hotspot.addEventListener("click", function () {
      setMode("anatomy");
      selectPart(hotspot.dataset.penPart);
    });
  });

  partJumps.forEach(function (button) {
    button.addEventListener("click", function () {
      setMode("anatomy");
      selectPart(button.dataset.partJump);
      document.querySelector("#overview").scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const open = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open
        ? isThai() ? menuButton.dataset.i18nCloseTh : menuButton.dataset.i18nCloseEn
        : isThai() ? menuButton.dataset.i18nMenuTh : menuButton.dataset.i18nMenuEn;
    });

    navigation.addEventListener("click", function (event) {
      if (!event.target.closest("a")) return;
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("portfolio:languagechange", function () {
    if (activeMode === "anatomy") renderPanel(partContent[activePart]);
    else renderPanel(modeContent[activeMode]);
    if (menuButton && menuButton.getAttribute("aria-expanded") !== "true") {
      menuButton.textContent = isThai() ? menuButton.dataset.i18nMenuTh : menuButton.dataset.i18nMenuEn;
    }
  });

  setMode("overview");
})();
