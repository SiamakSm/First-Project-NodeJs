// src/routes/skills.routes.js
// Defines API routes for /skills endpoints

const express = require("express");
const router = express.Router();

const controller = require("../controllers/skills.controller");
const validate = require("../middlewares/validate");

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
router.post("/", validate.validateCreateSkill, controller.createSkill);

/*
  PATCH /skills/:id
  Update an existing skill by ID
*/
router.patch("/:id", validate.validateId, validate.validatePatchSkill, controller.updateSkill);

/*
  DELETE /skills/:id
  Remove a skill by ID
*/
router.delete("/:id", validate.validateId, controller.deleteSkill);


module.exports = router;