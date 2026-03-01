// src/db.js
// Database connection configuration using pg Pool

require("dotenv").config();
const { Pool } = require("pg");

/*
  Detect production environment.
  Render requires SSL connection.
*/
const isProd = process.env.NODE_ENV === "production";

/*
  Create PostgreSQL connection pool.
  Uses DATABASE_URL for both:
  - Local development
  - Production (Render)

  SSL is enabled only in production.
*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false
});

module.exports = pool;