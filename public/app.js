// public/app.js
// 

const API_BASE = "";

//const API_BASE = "http://localhost:4000";

const listEl = document.querySelector("#skillsList");
const loadBtn = document.querySelector("#loadBtn");
const form = document.querySelector("#skillForm");

const titleInput = document.querySelector("#titleInput");
const categoryInput = document.querySelector("#categoryInput");
const progressInput = document.querySelector("#progressInput");
const statusInput = document.querySelector("#statusInput");



//Render
function renderSkills(skills) {
    listEl.innerHTML = "";

    for (const s of skills) {
        const li = document.createElement("li");
        li.textContent = `#${s.id} ${s.title} | ${s.category} | ${s.progress}% | ${s.status}`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => deleteSkill(s.id));

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.addEventListener("click", () => updateSkill(s.id, { status: "done", progress: 100 }));

        li.append(" ", doneBtn, " ", delBtn);
        listEl.appendChild(li);
    };
};


//Load (GET /skills)
async function loadSkills() {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await res.json();
    renderSkills(data);
};


//Add (POST /skills)
async function addSkill() {
    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    const progress = Number(progressInput.value) || 0;
    const status = statusInput.value;

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

    titleInput.value = "";
    categoryInput.value = "";
    progressInput.value = "0";
    statusInput.value = "active";

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


// Events
loadBtn.addEventListener("click", loadSkills);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addSkill();
});
