// // items.data.js 


let items = [
  { id: 1, name: "dev" },
  { id: 2, name: "c++" },
  { id: 3, name: "java te" },
  { id: 4, name: "roby" },
  { id: 5, name: "nodejs" }
];

let nextId = Math.max(...items.map(item => item.id)) + 1;

async function getAll() {
  return items.slice();
}
 
async function getById(id) {
  return items.find(i => i.id === id);
}

async function create(name) {
  const item = { id: nextId++, name };
  items.push(item);
  return item;
}

async function remove(id) {
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}

async function update(id, name) {
  const item = items.find(i => i.id === id);
  if (!item) return null;
  item.name = name; 
  return item;
}


module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};