// public/app.js
// 

const API_BASE = "";

//const API_BASE = "http://localhost:4000";

const btnLoad = document.querySelector("#btnLoad");
const listEl = document.querySelector("#list");
const formAdd = document.querySelector("#formAdd");
const inputName = document.querySelector("#inputName");
const msgEl = document.querySelector("#msg");

function setMsg(text) {
    msgEl.textContent = text || "";
};

function renderItems(items) {
    listEl.innerHTML = "";

    for (const item of items) {
        const li = document.createElement("li");
        li.textContent = `${item.id} - ${item.name} `;

        const btnDel = document.createElement("button");
        btnDel.textContent = "Delete";
        btnDel.addEventListener("click", async () => {
            await deleteItem(item.id);
            await loadItems();
        });

        li.appendChild(btnDel);
        listEl.appendChild(li);
    };
};

async function loadItems() {
    setMsg("Loading...");
    const res = await fetch(`${API_BASE}/items`);
    const data = await res.json();
    renderItems(data);
    setMsg("");
};

async function addItem(name) {
    const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create item");
    }
};

async function deleteItem(id) {
    const res = await fetch(`${API_BASE}/items/${id}`, { method: "DELETE" });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete item");
    }
};

btnLoad.addEventListener("click", loadItems);

formAdd.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    if (!name) return;

    try {
        await addItem(name);
        inputName.value = "";
        await loadItems();
    } catch (err) {
        setMsg(err.message);
    }
});
