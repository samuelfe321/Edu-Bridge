// Hamburger Menu – Identical to Dashboard
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const dropdown = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dropdown.classList.contains("open")) {
      dropdown.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});
