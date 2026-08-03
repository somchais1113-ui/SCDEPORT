(function () {
  "use strict";

  function initApproachCards() {
    const deck = document.querySelector(".approach-list");
    if (!deck) return;

    const cards = Array.from(deck.querySelectorAll("article"));
    if (!cards.length) return;

    function selectCard(selectedCard) {
      cards.forEach(function (card) {
        const selected = card === selectedCard;
        card.classList.toggle("is-selected", selected);
        card.setAttribute("aria-pressed", String(selected));
      });
    }

    cards.forEach(function (card) {
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", "false");

      card.addEventListener("click", function () {
        const nextCard = card.classList.contains("is-selected") ? null : card;
        selectCard(nextCard);
      });

      card.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        card.click();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApproachCards, { once: true });
  } else {
    initApproachCards();
  }
})();
