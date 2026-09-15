// Shared Global Initialization
window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

function handleHomeSearch() {
  const input = document.getElementById("home-search-input");
  if (input && input.value.trim() !== "") {
    window.location.href = `symptoms.html?q=${encodeURIComponent(input.value.trim())}`;
  }
}

function toggleMobileNav() {
  const menu = document.getElementById("nav-menu");
  if (menu) {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }
}
