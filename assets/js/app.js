// ==============================
// TCDA FAQ Interaction Script
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");
  const searchInput = document.getElementById("faq-search");

  // ------------------------------
  // 初期表示：重要FAQのみ開く
  // ------------------------------
  faqItems.forEach(item => {
    const isImportant = item.dataset.important === "true";
    const answer = item.querySelector(".faq-answer");

    if (isImportant) {
      item.classList.add("open");
      answer.style.display = "block";
    } else {
      answer.style.display = "none";
    }
  });

  // ------------------------------
  // FAQ 開閉処理
  // ------------------------------
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      item.classList.toggle("open");
      answer.style.display = isOpen ? "none" : "block";
    });
  });

  // ------------------------------
  // FAQ 検索機能
  // ------------------------------
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();

      faqItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(keyword) ? "block" : "none";
      });
    });
  }
});
