// skills.controller.js

const skillsData = require("../data/skills.data");

async function getSkills(req, res, next) {
    try {
        const skills = await skillsData.getAll();
        res.json(skills);
    } catch (err) {
        next(err);
    };
};

async function createSkill(req, res, next) {
    try {
        const { title, category, progress, status } = req.body;

        if (!title || !category)
            return res.status(400).json({ error: "Title and Category required" });

        const skill = await skillsData.create({
            title,
            category,
            progress,
            status,
        });

        res.status(201).json(skill);
    } catch (err) {
        next(err);
    };
};


async function updateSkill(req, res, next) {
    try {
        const { id } = req.params;
        const updated = await skillsData.update(id, req.body);

        if (!updated)
            return res.status(404).json({ error: "Skill not found" });

        res.json(updated);
    } catch (err) {
        next(err)
    };
};


async function deleteSkill(req, res, next) {
    try {
        const id = Number(req.params.id);
        const deleted = await skillsData.remove(id);

        if (!deleted)
            return res.status(404).json({ error: "Skill not found" });

        res.status(204).send();
    } catch (err) {
        next(err)
    };
};





module.exports = { getSkills, createSkill, updateSkill, deleteSkill };