(function () {
  "use strict";

  const body = document.body;
  const stage = document.querySelector("[data-study-stage]");
  const modeButtons = Array.from(document.querySelectorAll("[data-mode-button]"));
  const modeJumps = Array.from(document.querySelectorAll("[data-mode-jump]"));
  const modePanels = Array.from(document.querySelectorAll("[data-mode-panel]"));
  const partButtons = Array.from(document.querySelectorAll("[data-pen-part]"));
  const partJumps = Array.from(document.querySelectorAll("[data-part-jump]"));
  const colourButtons = Array.from(document.querySelectorAll("[data-colour]"));
  const explodedCards = Array.from(document.querySelectorAll("[data-exploded-part]"));
  const model = document.querySelector("[data-pen-model]");
  const stageCount = document.querySelector("[data-stage-count]");
  const infoIndex = document.querySelector("[data-info-index]");
  const infoTitle = document.querySelector("[data-info-title]");
  const infoCopy = document.querySelector("[data-info-copy]");
  const infoStatus = document.querySelector("[data-info-status]");
  const infoAction = document.querySelector("[data-info-action]");
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#site-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const modeOrder = {
    overview: "01 / 05",
    anatomy: "02 / 05",
    exploded: "03 / 05",
    material: "04 / 05",
    colour: "05 / 05"
  };

  const modeContent = {
    overview: {
      indexEn: "01 / Overview",
      indexTh: "01 / ภาพรวม",
      titleEn: "One object.\nFive external parts.",
      titleTh: "หนึ่งวัตถุ\nห้าส่วนประกอบภายนอก",
      copyEn: "A neutral-grey prototype sets the proportions before colour, material and production details are added.",
      copyTh: "ต้นแบบสีเทากลางใช้กำหนดสัดส่วน ก่อนเพิ่มรายละเอียดด้านสี วัสดุ และการผลิต",
      statusEn: "Visual prototype",
      statusTh: "ต้นแบบเชิงภาพ",
      actionEn: "Drag / Arrow keys",
      actionTh: "ลาก / ปุ่มลูกศร"
    },
    anatomy: {
      indexEn: "02 / Anatomy",
      indexTh: "02 / ส่วนประกอบ",
      titleEn: "Labels outside.\nNo overlap.",
      titleTh: "ป้ายกำกับอยู่ด้านนอก\nไม่ทับตัวสินค้า",
      copyEn: "Labels sit outside the product image so every part stays readable across different screen sizes.",
      copyTh: "ป้ายกำกับอยู่แยกจากภาพสินค้า เพื่อให้ชื่อชิ้นส่วนอ่านได้ในทุกขนาดหน้าจอ",
      statusEn: "Interactive anatomy",
      statusTh: "โครงสร้างแบบโต้ตอบ",
      actionEn: "Select a part",
      actionTh: "เลือกชิ้นส่วน"
    },
    exploded: {
      indexEn: "03 / Exploded View",
      indexTh: "03 / แยกโครงสร้าง",
      titleEn: "Start with\nthe structure.",
      titleTh: "เริ่มจาก\nโครงสร้าง",
      copyEn: "The product and component sequence use separate rows so the diagram does not cover the pen.",
      copyTh: "ตัวสินค้าและลำดับชิ้นส่วนอยู่คนละแถว เพื่อไม่ให้แผนภาพบังตัวปากกา",
      statusEn: "Structure map",
      statusTh: "แผนผังโครงสร้าง",
      actionEn: "Five-part sequence",
      actionTh: "ลำดับห้าชิ้นส่วน"
    },
    material: {
      indexEn: "04 / Material & Finish",
      indexTh: "04 / วัสดุและผิวสัมผัส",
      titleEn: "Compare the form\nacross three finishes.",
      titleTh: "เปรียบเทียบรูปทรง\nผ่านสามผิวสัมผัส",
      copyEn: "Product and material samples are shown side by side for quick comparison.",
      copyTh: "ตัวสินค้าและตัวอย่างวัสดุวางคู่กัน เพื่อให้เปรียบเทียบได้ง่าย",
      statusEn: "CMF direction",
      statusTh: "แนวทาง CMF",
      actionEn: "Compare three finishes",
      actionTh: "เปรียบเทียบสามผิวสัมผัส"
    },
    colour: {
      indexEn: "05 / Colour System",
      indexTh: "05 / ระบบสี",
      titleEn: "Start neutral.\nThen compare colour.",
      titleTh: "เริ่มจากสีกลาง\nแล้วเปรียบเทียบสี",
      copyEn: "Five neutral values show how colour changes the product while keeping the same geometry and material detail.",
      copyTh: "ค่าสีกลางห้าระดับใช้เปรียบเทียบผลของสี โดยยังคงรูปทรงและรายละเอียดวัสดุเดิม",
      statusEn: "Base palette",
      statusTh: "พาเลตต์ตั้งต้น",
      actionEn: "Select a value",
      actionTh: "เลือกค่าสี"
    }
  };

  const partContent = {
    pusher: {
      indexEn: "01 / Pusher", indexTh: "01 / Pusher",
      titleEn: "Where the click\nstarts.", titleTh: "จุดเริ่มต้น\nของการกด",
      copyEn: "The pusher transfers a short press into the internal retraction mechanism. Travel distance and resistance affect how the click feels.",
      copyTh: "Pusher ส่งแรงกดไปยังกลไกเก็บหัวปากกา โดยระยะกดและแรงต้านมีผลต่อความรู้สึกตอนกด",
      statusEn: "Actuator", statusTh: "ชิ้นส่วนรับแรงกด",
      actionEn: "Press / Release", actionTh: "กด / ปล่อย"
    },
    clip: {
      indexEn: "02 / Clip", indexTh: "02 / Clip",
      titleEn: "Clip function\nand detail.", titleTh: "หน้าที่ของ Clip\nและรายละเอียด",
      copyEn: "The clip secures the pen to a pocket or notebook and adds a visual detail along the barrel.",
      copyTh: "Clip ช่วยยึดปากกากับกระเป๋าหรือสมุด และเพิ่มรายละเอียดให้แนวของตัวด้าม",
      statusEn: "Retention part", statusTh: "ชิ้นส่วนยึดเก็บ",
      actionEn: "Flex / Return", actionTh: "ยืดหยุ่น / คืนตัว"
    },
    barrel: {
      indexEn: "03 / Barrel", indexTh: "03 / Barrel",
      titleEn: "The main\nstructural body.", titleTh: "โครงสร้างหลัก\nที่รวมทุกส่วน",
      copyEn: "The barrel houses the refill and mechanism while setting the overall length, balance and visual proportion.",
      copyTh: "Barrel เก็บไส้และกลไกภายใน พร้อมกำหนดความยาว สมดุล และสัดส่วนหลักของปากกา",
      statusEn: "Primary housing", statusTh: "โครงสร้างหุ้มหลัก",
      actionEn: "Hold / Protect", actionTh: "รองรับ / ปกป้อง"
    },
    grip: {
      indexEn: "04 / Grip", indexTh: "04 / Grip",
      titleEn: "Grip and\nfinger control.", titleTh: "Grip และการควบคุม\nด้วยนิ้วมือ",
      copyEn: "A lightly faceted grip helps position the fingers, reduce rotation and keep the pen stable while writing.",
      copyTh: "Grip ที่มีเหลี่ยมช่วยจัดตำแหน่งนิ้ว ลดการหมุน และทำให้จับปากกาได้มั่นคงขณะเขียน",
      statusEn: "Control surface", statusTh: "พื้นผิวควบคุม",
      actionEn: "Orient / Stabilise", actionTh: "จัดทิศ / เพิ่มความมั่นคง"
    },
    cone: {
      indexEn: "05 / Cone", indexTh: "05 / Cone",
      titleEn: "The final guide\nfor the tip.", titleTh: "ส่วนปลาย\nที่นำหัวเขียน",
      copyEn: "The cone aligns and protects the refill tip and guides it into the writing position.",
      copyTh: "Cone จัดแนวและปกป้องหัวไส้ปากกา พร้อมนำหัวไส้เข้าสู่ตำแหน่งสำหรับเขียน",
      statusEn: "Tip housing", statusTh: "โครงสร้างหุ้มหัวเขียน",
      actionEn: "Align / Guide", actionTh: "จัดแนว / นำหัวเขียน"
    }
  };

  let activeMode = "overview";
  let activePart = "barrel";
  let activeColour = "#2f302f";
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startRx = 0;
  let startRy = 0;
  let rx = 0;
  let ry = 0;

  function isThai() {
    return body.dataset.language === "th";
  }

  function renderInfo(content) {
    if (!content) return;
    const suffix = isThai() ? "Th" : "En";
    if (infoIndex) infoIndex.textContent = content["index" + suffix];
    if (infoTitle) infoTitle.textContent = content["title" + suffix];
    if (infoCopy) infoCopy.textContent = content["copy" + suffix];
    if (infoStatus) infoStatus.textContent = content["status" + suffix];
    if (infoAction) infoAction.textContent = content["action" + suffix];
  }

  function setMode(mode, options) {
    if (!modeContent[mode]) return;
    const settings = options || {};
    activeMode = mode;
    body.dataset.penMode = mode;

    modeButtons.forEach(function (button) {
      const selected = button.dataset.modeButton === mode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    modePanels.forEach(function (panel) {
      const selected = panel.dataset.modePanel === mode;
      panel.hidden = !selected;
      panel.classList.toggle("is-active", selected);
      panel.setAttribute("aria-hidden", String(!selected));
      if (selected) {
        panel.style.animation = "none";
        void panel.offsetWidth;
        panel.style.animation = "";
      }
    });

    if (stageCount) stageCount.textContent = modeOrder[mode];

    if (mode === "anatomy") selectPart(activePart, false);
    else if (mode === "exploded") {
      setExplodedActive(activePart);
      renderInfo(partContent[activePart] || modeContent.exploded);
    } else renderInfo(modeContent[mode]);

    if (settings.scrollIntoView) {
      const shell = document.querySelector(".study-shell");
      if (shell) shell.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function selectPart(part, updateMode) {
    if (!partContent[part]) return;
    activePart = part;

    partButtons.forEach(function (button) {
      const selected = button.dataset.penPart === part;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (updateMode !== false && activeMode !== "anatomy") setMode("anatomy");
    renderInfo(partContent[part]);
  }

  function setExplodedActive(part) {
    explodedCards.forEach(function (card) {
      const selected = card.dataset.explodedPart === part;
      card.classList.toggle("is-active", selected);
      card.setAttribute("aria-pressed", String(selected));
    });
  }

  function selectColour(button) {
    if (!button) return;
    activeColour = button.dataset.colour || activeColour;
    if (stage) stage.style.setProperty("--active-colour", activeColour);
    colourButtons.forEach(function (item) {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    if (activeMode === "colour" && infoAction) {
      infoAction.textContent = (isThai() ? "เลือกแล้ว " : "Selected ") + activeColour.toUpperCase();
    }
  }

  function applyRotation() {
    if (!model) return;
    model.style.setProperty("--rx", rx.toFixed(2) + "deg");
    model.style.setProperty("--ry", ry.toFixed(2) + "deg");
  }

  function finishDrag(event) {
    if (pointerId === null) return;
    if (event && event.pointerId !== undefined && event.pointerId !== pointerId) return;
    model.classList.remove("is-dragging");
    pointerId = null;
  }

  modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setMode(button.dataset.modeButton);
    });
  });

  modeJumps.forEach(function (button) {
    button.addEventListener("click", function () {
      const mode = button.dataset.modeJump;
      setMode(mode);
      const shell = document.querySelector(".study-shell");
      if (shell) shell.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  partButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectPart(button.dataset.penPart, true);
    });
  });

  partJumps.forEach(function (button) {
    button.addEventListener("click", function () {
      setMode("anatomy", { scrollIntoView: true });
      selectPart(button.dataset.partJump, false);
    });
  });

  colourButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectColour(button);
    });
  });

  explodedCards.forEach(function (card) {
    function activate() {
      const key = card.dataset.explodedPart;
      if (!partContent[key]) return;
      setExplodedActive(key);
      activePart = key;
      renderInfo(partContent[key]);
    }
    function reset() {
      if (activeMode === "exploded") {
        setExplodedActive(activePart);
        renderInfo(partContent[activePart] || modeContent.exploded);
      }
    }
    card.addEventListener("mouseenter", activate);
    card.addEventListener("focus", activate);
    card.addEventListener("click", activate);
    card.addEventListener("mouseleave", reset);
    card.addEventListener("blur", reset);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  if (model && window.PointerEvent && !reduceMotion) {
    model.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startRx = rx;
      startRy = ry;
      model.classList.add("is-dragging");
      if (model.setPointerCapture) model.setPointerCapture(pointerId);
    });

    model.addEventListener("pointermove", function (event) {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const width = Math.max(model.clientWidth, 1);
      const height = Math.max(model.clientHeight, 1);
      ry = Math.max(-10, Math.min(10, startRy + ((event.clientX - startX) / width) * 24));
      rx = Math.max(-4, Math.min(4, startRx - ((event.clientY - startY) / height) * 12));
      applyRotation();
    });

    model.addEventListener("pointerup", finishDrag);
    model.addEventListener("pointercancel", finishDrag);
    model.addEventListener("lostpointercapture", finishDrag);
  }

  if (model) {
    model.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") ry = Math.max(-10, ry - 2);
      else if (event.key === "ArrowRight") ry = Math.min(10, ry + 2);
      else if (event.key === "ArrowUp") rx = Math.max(-4, rx - 1);
      else if (event.key === "ArrowDown") rx = Math.min(4, rx + 1);
      else if (event.key === "Home") {
        rx = 0;
        ry = 0;
      } else return;
      event.preventDefault();
      applyRotation();
    });
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const open = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open
        ? (isThai() ? menuButton.dataset.i18nCloseTh : menuButton.dataset.i18nCloseEn)
        : (isThai() ? menuButton.dataset.i18nMenuTh : menuButton.dataset.i18nMenuEn);
    });

    navigation.addEventListener("click", function (event) {
      if (!event.target.closest("a")) return;
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("portfolio:languagechange", function () {
    if (activeMode === "anatomy") renderInfo(partContent[activePart]);
    else renderInfo(modeContent[activeMode]);

    if (activeMode === "colour" && infoAction) {
      infoAction.textContent = (isThai() ? "เลือกแล้ว " : "Selected ") + activeColour.toUpperCase();
    }

    if (menuButton && menuButton.getAttribute("aria-expanded") !== "true") {
      menuButton.textContent = isThai() ? menuButton.dataset.i18nMenuTh : menuButton.dataset.i18nMenuEn;
    }
  });

  selectColour(colourButtons[0]);
  setMode("overview");
})();
