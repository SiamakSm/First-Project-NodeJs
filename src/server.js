// src/server.js
// Entry point of the application (starts the HTTP server)

/*
  Loads environment variables from .env file
  (PORT, DATABASE_URL, etc.)
*/
require("dotenv").config();

const app = require("./app");

/*
  Use PORT from environment (production),
  fallback to 4000 in local development.
*/
const PORT = process.env.PORT || 4000;

/*
  Start Express server.
  This makes the API accessible at:
  http://localhost:PORT
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});