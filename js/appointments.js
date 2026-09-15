let doctorsData = [];
let bookingState = { step: 1, specialty: "", doctor: null, date: "", time: "" };

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/doctors.json");
    doctorsData = await res.json();
    renderBookingStep();
  } catch (err) {
    console.error("Failed to load doctors:", err);
  }
});

function renderBookingStep() {
  const container = document.getElementById("booking-step-container");
  if (!container) return;

  document.querySelectorAll(".step-item").forEach((el, i) => {
    el.classList.toggle("active", i + 1 === bookingState.step);
  });

  if (bookingState.step === 1) {
    container.innerHTML = `
      <h3 style="margin-bottom:16px;">Select Specialty</h3>
      <div class="grid-3">
        ${["Cardiology", "General Physician", "Pediatrics", "Neurology"]
          .map(
            (s) => `
          <div class="card" style="cursor:pointer;" onclick="selectSpecialty('${s}')">
            <h4>${s}</h4>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">Available doctors nearby</p>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  } else if (bookingState.step === 2) {
    const list = doctorsData.filter(
      (d) => !bookingState.specialty || d.specialty === bookingState.specialty,
    );
    container.innerHTML = `
      <h3>Select Doctor (${bookingState.specialty})</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px;">
        ${list
          .map(
            (d) => `
          <div class="card" style="cursor:pointer;" onclick="selectDoctor(${d.id})">
            <h4 style="color:var(--primary);">${d.name}</h4>
            <p style="font-size:0.85rem; color:var(--text-secondary);">${d.degrees}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  } else if (bookingState.step === 3) {
    container.innerHTML = `
      <h3>Schedule with ${bookingState.doctor.name}</h3>
      <div style="max-width:320px; margin-top:16px; display:flex; flex-direction:column; gap:12px;">
        <input type="date" id="book-date" class="form-input" />
        <select id="book-time" class="form-select">
          <option>10:00 AM</option>
          <option>02:30 PM</option>
          <option>06:00 PM</option>
        </select>
        <button class="btn btn-light" onclick="confirmSlot()">Proceed</button>
      </div>
    `;
  } else if (bookingState.step === 4) {
    container.innerHTML = `
      <h3 style="color:var(--accent);">Appointment Confirmed!</h3>
      <p style="margin:12px 0;">Doctor: ${bookingState.doctor.name} (${bookingState.date} at ${bookingState.time})</p>
      <button class="btn btn-light" onclick="bookingState.step=1; renderBookingStep();">Book Another</button>
    `;
  }
}

function selectSpecialty(s) {
  bookingState.specialty = s;
  bookingState.step = 2;
  renderBookingStep();
}
function selectDoctor(id) {
  bookingState.doctor = doctorsData.find((d) => d.id === id);
  bookingState.step = 3;
  renderBookingStep();
}
function confirmSlot() {
  const d = document.getElementById("book-date").value;
  if (!d) return alert("Select a date.");
  bookingState.date = d;
  bookingState.time = document.getElementById("book-time").value;
  bookingState.step = 4;
  renderBookingStep();
}
