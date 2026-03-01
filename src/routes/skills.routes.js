// src/routes/skills.routes.js
// Defines API routes for /skills endpoints

const express = require("express");
const router = express.Router();

const controller = require("../controllers/skills.controller");

/*
  GET /skills
  Retrieve all skills from database
*/
router.get("/", controller.getSkills);

/*
  POST /skills
  Create a new skill
  Expects JSON body:
  {
    title,
    category,
    progress,
    status
  }
*/
router.post("/", controller.createSkill);

/*
  PATCH /skills/:id
  Update an existing skill by ID
*/
router.patch("/:id", controller.updateSkill);

/*
  DELETE /skills/:id
  Remove a skill by ID
*/
router.delete("/:id", controller.deleteSkill);

module.exports = router;