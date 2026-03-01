// src/controllers/skills.controller.js
// Handles business logic between routes and data layer

const skillsData = require("../data/skills.data");

/*
  GET /skills
  Retrieve all skills from database
*/
async function getSkills(req, res, next) {
  try {
    const skills = await skillsData.getAll();
    res.json(skills);
  } catch (err) {
    next(err); // Forward error to global error handler
  }
}

/*
  POST /skills
  Create a new skill
*/
async function createSkill(req, res, next) {
  try {
    const { title, category, progress, status } = req.body;

    // Basic validation
    if (!title || !category) {
      return res.status(400).json({
        error: "Title and Category required"
      });
    }

    const skill = await skillsData.create({
      title,
      category,
      progress,
      status
    });

    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
}

/*
  PATCH /skills/:id
  Update skill by ID
*/
async function updateSkill(req, res, next) {
  try {
    const id = Number(req.params.id);

    const updated = await skillsData.update(id, req.body);

    if (!updated) {
      return res.status(404).json({
        error: "Skill not found"
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

/*
  DELETE /skills/:id
  Remove skill by ID
*/
async function deleteSkill(req, res, next) {
  try {
    const id = Number(req.params.id);

    const deleted = await skillsData.remove(id);

    if (deleted === false) {
      return res.status(404).json({
        error: "Skill not found"
      });
    }

    // 204 = No Content (successful deletion)
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};