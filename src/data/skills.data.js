// src/data/skills.data.js
// Data access layer (direct communication with PostgreSQL)

const pool = require("../db");

/*
  GET ALL skills
  Returns all skills ordered by newest first
*/
async function getAll() {
  const { rows } = await pool.query(
    "SELECT * FROM skills ORDER BY created_at DESC"
  );
  return rows;
}

/*
  CREATE new skill
  Inserts into database and returns created row
*/
async function create({ title, category, progress, status }) {
  const { rows } = await pool.query(
    `INSERT INTO skills (title, category, progress, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      title,
      category,
      progress ?? 0,
      status ?? "active"
    ]
  );

  return rows[0];
}

/*
  UPDATE skill by ID
  Uses COALESCE to update only provided fields
*/
async function update(id, fields) {
  const { title, category, progress, status } = fields;

  const { rows } = await pool.query(
    `UPDATE skills
     SET title = COALESCE($1, title),
         category = COALESCE($2, category),
         progress = COALESCE($3, progress),
         status = COALESCE($4, status)
     WHERE id = $5
     RETURNING *`,
    [title, category, progress, status, id]
  );

  return rows[0]; // undefined if not found
}

/*
  DELETE skill by ID
  Returns true if deleted, false if not found
*/
async function remove(id) {
  const result = await pool.query(
    `DELETE FROM skills WHERE id = $1`,
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  getAll,
  create,
  update,
  remove
};