let symptomsData = [];
let currentCategory = "All";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/symptoms.json");
    symptomsData = await res.json();

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("q");
    if (queryParam) {
      const searchInput = document.getElementById("symptom-search");
      if (searchInput) searchInput.value = queryParam;
    }

    filterSymptoms();
  } catch (err) {
    console.error("Failed to load symptoms data:", err);
  }
});

function renderSymptoms(list) {
  const container = document.getElementById("symptoms-list");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<p style="color:var(--text-dim);">No matching symptom guidelines found.</p>`;
    return;
  }

  container.innerHTML = list
    .map(
      (item) => `
    <div class="symptom-card">
      <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
        <h3 style="font-size:1.1rem; color:var(--text-main);">${item.name}</h3>
        <span class="care-tag">${item.careType}</span>
      </div>
      <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">${item.desc}</p>
    </div>
  `,
    )
    .join("");
  if (window.lucide) lucide.createIcons();
}

function filterSymptoms() {
  const searchInput = document.getElementById("symptom-search");
  const query = searchInput ? searchInput.value.toLowerCase() : "";

  const filtered = symptomsData.filter((item) => {
    const matchesCat =
      currentCategory === "All" || item.category === currentCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  renderSymptoms(filtered);
}

function selectCategory(cat) {
  currentCategory = cat;
  document
    .querySelectorAll("#category-sidebar .category-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");
  filterSymptoms();
}
