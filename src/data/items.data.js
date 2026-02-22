// // items.data.js 

const pool = require("../db");

async function getAll() {
  const { rows } = await pool.query("SELECT id, name FROM items ORDER BY id ASC");
  return rows;
};
 
async function getById(id) {
  const { rows } = await pool.query("SELECT id, name FROM items WHERE id=$1", [id]);
  return rows[0] || null;
};

async function create(name) {
  const { rows } = await pool.query("INSERT INTO items (name) VALUES ($1) RETURNING id, name", [name]);
  return rows[0];
};

async function remove(id) {
  const result = await pool.query("DELETE FROM items WHERE id = $1", [id]);
  return result.rowCount > 0;
};

async function update(id, name) {
  const { rows } = await pool.query("UPDATE items SET name = $1 WHERE id = $2 RETURNING id, name", [name, id]);
  return rows[0] || null;
};


module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};