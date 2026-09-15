function getReminders() {
  return JSON.parse(localStorage.getItem("caernza_reminders") || "[]");
}

function saveRemindersToStorage(arr) {
  localStorage.setItem("caernza_reminders", JSON.stringify(arr));
  renderReminders();
}

function renderReminders() {
  const list = getReminders();
  const container = document.getElementById("reminders-list");
  if (!container) return;

  const completed = list.filter((r) => r.taken).length;
  document.getElementById("reminder-progress-text").innerText =
    `${completed} of ${list.length} completed`;
  document.getElementById("reminder-progress-fill").style.width =
    list.length > 0 ? (completed / list.length) * 100 + "%" : "0%";

  if (list.length === 0) {
    container.innerHTML = `<p style="color:var(--text-dim); text-align:center;">No scheduled reminders yet.</p>`;
    return;
  }

  container.innerHTML = list
    .map(
      (r, idx) => `
    <div style="background:var(--bg-card); border:1px solid var(--border-color); padding:16px; border-radius:8px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="checkbox" ${r.taken ? "checked" : ""} onchange="toggleReminder(${idx})" />
        <div>
          <h4 style="${r.taken ? "text-decoration:line-through; opacity:0.6;" : ""}">${r.name}</h4>
          <p style="font-size:0.8rem; color:var(--text-secondary);">${r.time} • ${r.freq}</p>
        </div>
      </div>
      <button class="btn btn-outline" style="color:#ef4444;" onclick="deleteReminder(${idx})">Delete</button>
    </div>
  `,
    )
    .join("");
}

function toggleReminder(idx) {
  const list = getReminders();
  list[idx].taken = !list[idx].taken;
  saveRemindersToStorage(list);
}

function deleteReminder(idx) {
  const list = getReminders();
  list.splice(idx, 1);
  saveRemindersToStorage(list);
}

function openReminderModal() {
  document.getElementById("reminder-modal").classList.remove("hidden");
}
function closeReminderModal() {
  document.getElementById("reminder-modal").classList.add("hidden");
}

function saveReminder(e) {
  e.preventDefault();
  const name = document.getElementById("rem-name").value;
  const time = document.getElementById("rem-time").value;
  const freq = document.getElementById("rem-freq").value;
  const notes = document.getElementById("rem-notes").value;

  const list = getReminders();
  list.push({ name, time, freq, notes, taken: false });
  saveRemindersToStorage(list);
  closeReminderModal();
  document.getElementById("reminder-form").reset();
}

window.addEventListener("DOMContentLoaded", renderReminders);
