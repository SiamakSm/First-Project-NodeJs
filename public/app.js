// public/app.js
// Frontend logic: fetch skills from API and render them in the browser.

const API_BASE = ""; 
// Empty = same origin (works both locally and on Render if frontend is served by Express)

function get(id) {
  // Small helper to access DOM elements faster
  return document.getElementById(id);
}

/*
  Render the skills list in the UI:
  - Apply category filter
  - Apply search filter (by title)
  - Update stats
  - Build the list items + action buttons
*/
function renderSkills(skills) {
  const list = get("skillsList");
  list.innerHTML = "";

  // Apply category dropdown filter
  skills = categoryCollecter(skills);

  // Apply search filter (case-insensitive)
  const q = get("searchInput").value.trim().toLowerCase();
  if (q) {
    skills = skills.filter(s => s.title.toLowerCase().includes(q));
  }

  // Update dashboard stats
  const total = skills.length;
  const active = skills.filter(s => s.status === "active").length;
  const done = skills.filter(s => s.status === "done").length;
  get("stats").textContent = `Total: ${total} | Active: ${active} | Done: ${done}`;

  // Render each skill row
  for (const s of skills) {
    const li = document.createElement("li");
    li.classList.add("skill-item");

    // Main content (title, category, badge status, progress bar)
    li.innerHTML = `
      <div class="skill-content">
        <strong>#${s.id} ${s.title}</strong>

        <div class="skill-meta">
          ${s.category}
          <span class="badge ${s.status}">
            ${s.status}
          </span>
        </div>

        <div class="skill-progress">
          <div class="progress">
            <div class="progress-bar" style="width:${s.progress || 0}%"></div>
          </div>
          <span class="progress-text">${s.progress || 0}%</span>
        </div>
      </div>
    `;

    // Increase progress by +10 (max 100)
    const incBtn = document.createElement("button");
    incBtn.textContent = "+10%";
    incBtn.addEventListener("click", () =>
      updateSkill(s.id, {
        progress: Math.min((s.progress || 0) + 10, 100),
        status: s.progress + 10 >= 100 ? "done" : s.status
      })
    );

    // Mark as done (100%)
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.addEventListener("click", () =>
      updateSkill(s.id, { status: "done", progress: 100 })
    );

    // Delete skill
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteSkill(s.id));

    // Actions container (buttons)
    const actions = document.createElement("div");
    actions.classList.add("skill-actions");
    actions.append(incBtn, doneBtn, delBtn);

    li.appendChild(actions);
    list.appendChild(li);
  }
}

/*
  GET /skills
  Fetch all skills from API and render them
*/
async function loadSkills() {
  const res = await fetch(`${API_BASE}/skills`);
  const data = await res.json();
  renderSkills(data);
}

/*
  POST /skills
  Read form values, send JSON body, then reload list
*/
async function addSkill() {
  const title = get("titleInput").value.trim();
  const category = get("categoryInput").value.trim();
  const progress = Number(get("progressInput").value) || 0;
  const status = get("statusInput").value;

  const res = await fetch(`${API_BASE}/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, category, progress, status })
  });

  // Show backend error if request failed
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.error || "Failed to create skill");
    return;
  }

  // Reset form fields
  get("titleInput").value = "";
  get("categoryInput").value = "";
  get("progressInput").value = "0";
  get("statusInput").value = "active";

  await loadSkills();
}

/*
  DELETE /skills/:id
  Remove a skill then reload list
*/
async function deleteSkill(id) {
  const res = await fetch(`${API_BASE}/skills/${id}`, { method: "DELETE" });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    alert(err.error || "Failed to delete skill");
    return;
  }

  await loadSkills();
}

/*
  PATCH /skills/:id
  Partial update (only fields in "patch" are sent)
*/
async function updateSkill(id, patch) {
  const res = await fetch(`${API_BASE}/skills/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.error || "Update failed");
    return;
  }

  await loadSkills();
}

/*
  Collect categories from skills and populate dropdown.
  Returns the filtered list based on current selected category.
*/
function categoryCollecter(skills) {
  const categories = [...new Set(skills.map(s => s.category))];

  const select = get("filterCategory");
  const selected = select.value || "all";

  // Build dropdown options (All + categories)
  select.innerHTML =
    `<option value="all">All</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join("");

  // Keep current selection if it still exists
  select.value = categories.includes(selected) ? selected : "all";

  // Apply filtering
  return select.value === "all"
    ? skills
    : skills.filter(s => s.category === select.value);
}

// UI events
get("loadBtn").addEventListener("click", loadSkills);
get("filterCategory").addEventListener("change", loadSkills);
get("searchInput").addEventListener("input", loadSkills);

get("skillForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await addSkill();
});

// Initial load
loadSkills();