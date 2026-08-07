(() => {
  "use strict";

  const root = document.querySelector("[data-leadership-workflow]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-workflow-tab]"));
  const panels = Array.from(root.querySelectorAll("[data-workflow-panel]"));

  const activate = (key, focus = false) => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.workflowTab === key;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus({ preventScroll: true });
    });

    panels.forEach((panel) => {
      const selected = panel.dataset.workflowPanel === key;
      panel.hidden = !selected;
      panel.classList.toggle("is-active", selected);
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.workflowTab));

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      activate(tabs[nextIndex].dataset.workflowTab, true);
    });
  });

  activate(tabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.workflowTab || tabs[0].dataset.workflowTab);
})();
