// app.js
// Main Express application configuration

const express = require("express");
const skillsRoutes = require("./routes/skills.routes");

const app = express();

/*
  Middleware to parse incoming JSON requests.
  Allows us to read req.body in POST / PATCH.
*/
app.use(express.json());

/*
  Serves static frontend files (index.html, app.js, style.css)
  from the "public" folder.
*/
app.use(express.static("public"));

/*
  Simple request logger (method + URL).
  Useful during development for debugging.
*/
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

/*
  Mount skills routes under /skills.
  Example:
    GET    /skills
    POST   /skills
    PATCH  /skills/:id
    DELETE /skills/:id
*/
app.use("/skills", skillsRoutes);

/*
  404 handler — triggered if no route matched.
*/
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

/*
  Global error handler.
  Sends structured JSON error responses.
*/
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

module.exports = app;