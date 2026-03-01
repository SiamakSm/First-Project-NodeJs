// public/app.js
// 

const API_BASE = "";


function get(query) {
    return document.getElementById(query);
}


//Render
function renderSkills(skills) {
    const list = get("skillsList");
    list.innerHTML = "";

    skills = categoryCollecter(skills);

    const q = get("searchInput").value.trim().toLowerCase();
    if (q) {
        skills = skills.filter(s =>
            s.title.toLowerCase().includes(q)
        );
    }

    const total = skills.length;
    const active = skills.filter(s => s.status === "active").length;
    const done = skills.filter(s => s.status === "done").length;

    get("stats").textContent =
        `Total: ${total} | Active: ${active} | Done: ${done}`;

    for (const s of skills) {
        const li = document.createElement("li");
      li.classList.add("skill-item");

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
          <span class="progress-text">
            ${s.progress || 0}%
          </span>
        </div>
      </div>
    `;

      const incBtn = document.createElement("button");
      incBtn.textContent = "+10%";
      incBtn.addEventListener("click", () =>
          updateSkill(s.id, {
              progress: Math.min((s.progress || 0) + 10, 100),
              status: s.progress + 10 >= 100 ? "done" : s.status
          })
      );

      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Done";
      doneBtn.addEventListener("click", () =>
          updateSkill(s.id, { status: "done", progress: 100 })
      );

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () =>
          deleteSkill(s.id)
      );

      const actions = document.createElement("div");
      actions.classList.add("skill-actions");
      actions.append(incBtn, doneBtn, delBtn);

        li.appendChild(actions);
        list.appendChild(li);
    };
};


//Load (GET /skills)
async function loadSkills() {
    const res = await fetch(`${API_BASE}/skills`);
    let data = await res.json();
    renderSkills(data);
};


//Add (POST /skills)
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

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to create skill");
        return;
    };

    get("titleInput").value = "";
    get("categoryInput").value = "";
    get("progressInput").value = "0";
    get("statusInput").value = "active";

    await loadSkills();
};


//Delete (DELETE /skills/:id)
async function deleteSkill(id) {
    const res = await fetch(`${API_BASE}/skills/${id}`, { method: "DELETE" });

    if (!res.ok && res.status !== 204) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to delete skill");
        return;
    };

    await loadSkills();
};


//Update (PATCH /skills/:id)
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
    };

    await loadSkills();
};


function categoryCollecter(skills) {
    const categories = [...new Set(skills.map(s => s.category))];
    const selected = get("filterCategory").value || "all";
    get("filterCategory").innerHTML = `<option value="all">All</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join("");
    get("filterCategory").value = categories.includes(selected) ? selected : "all";
    const filteredSkills = selected === "all" ? skills : skills.filter(s => s.category === selected);
    return filteredSkills;
};


// Events
get("loadBtn").addEventListener("click", loadSkills);
get("filterCategory").addEventListener("change", loadSkills);
get("searchInput").addEventListener("input", loadSkills);

get("skillForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await addSkill();
});



loadSkills();