let facilitiesData = [];

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/facilities.json");
    facilitiesData = await res.json();
    renderFacilities(facilitiesData);
  } catch (err) {
    console.error("Failed to load facilities:", err);
  }
});

function renderFacilities(list) {
  const container = document.getElementById("facilities-list");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<p style="color:var(--text-dim);">No facilities found matching your criteria.</p>`;
    return;
  }

  container.innerHTML = list
    .map(
      (fac) => `
    <div class="facility-card">
      <div>
        <h3 style="font-size:1.15rem;">${fac.name}</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin:4px 0;">
          <i data-lucide="map-pin" style="width:14px;"></i> ${fac.location} • ${fac.distance} away
        </p>
        <p style="font-size:0.8rem; color:var(--text-dim);">${fac.specialties}</p>
      </div>
      <div style="text-align:right;">
        <div style="color:var(--warning); font-weight:700;">★ ${fac.rating}</div>
        <button class="btn btn-outline" style="margin-top:12px; font-size:0.8rem;" onclick="openFacilityModal(${fac.id})">Details</button>
      </div>
    </div>
  `,
    )
    .join("");
  if (window.lucide) lucide.createIcons();
}

function filterFacilities() {
  const q = document.getElementById("fac-search").value.toLowerCase();
  const loc = document.getElementById("fac-location").value;
  const type = document.getElementById("fac-type").value;

  const filtered = facilitiesData.filter((f) => {
    return (
      (!q ||
        f.name.toLowerCase().includes(q) ||
        f.specialties.toLowerCase().includes(q)) &&
      (!loc || f.location === loc) &&
      (!type || f.type === type)
    );
  });
  renderFacilities(filtered);
}

function openFacilityModal(id) {
  const fac = facilitiesData.find((f) => f.id === id);
  if (!fac) return;
  const body = document.getElementById("facility-modal-body");
  body.innerHTML = `
    <h2>${fac.name}</h2>
    <p style="color:var(--primary); margin-bottom:12px;">${fac.type} • ${fac.location}</p>
    <p style="color:var(--text-secondary); margin-bottom:16px;">Specialties: ${fac.specialties}</p>
    <button class="btn btn-light" style="width:100%;" onclick="window.location.href='appointments.html'">Book Appointment</button>
  `;
  document.getElementById("facility-modal").classList.remove("hidden");
}

function closeFacilityModal() {
  document.getElementById("facility-modal").classList.add("hidden");
}
