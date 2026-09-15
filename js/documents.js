function getDocs() {
  return JSON.parse(localStorage.getItem("caernza_docs") || "[]");
}

function renderDocs() {
  const list = getDocs();
  const container = document.getElementById("documents-grid");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; color:var(--text-dim); text-align:center;">No document records saved.</p>`;
    return;
  }

  container.innerHTML = list
    .map(
      (doc, idx) => `
    <div class="card">
      <div style="display:flex; justify-content:space-between;">
        <span class="care-tag">${doc.cat}</span>
        <button class="btn btn-outline" style="padding:2px 6px; font-size:0.7rem; color:#ef4444;" onclick="deleteDoc(${idx})">Delete</button>
      </div>
      <h3 style="margin-top:10px;">${doc.title}</h3>
      <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">Date: ${doc.date}</p>
    </div>
  `,
    )
    .join("");
}

function openDocModal() {
  document.getElementById("doc-modal").classList.remove("hidden");
}
function closeDocModal() {
  document.getElementById("doc-modal").classList.add("hidden");
}

function saveDocument(e) {
  e.preventDefault();
  const title = document.getElementById("doc-title").value;
  const cat = document.getElementById("doc-cat").value;
  const date = document.getElementById("doc-date").value;

  const list = getDocs();
  list.push({ title, cat, date });
  localStorage.setItem("caernza_docs", JSON.stringify(list));
  renderDocs();
  closeDocModal();
  document.getElementById("doc-form").reset();
}

function deleteDoc(idx) {
  const list = getDocs();
  list.splice(idx, 1);
  localStorage.setItem("caernza_docs", JSON.stringify(list));
  renderDocs();
}

window.addEventListener("DOMContentLoaded", renderDocs);
