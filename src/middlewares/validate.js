// src/middlewares/validate.js
// Request validation middlewares (skills API)

function validateId(req, res, next) {
    // Validate :id route parameter
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      const err = new Error("Invalid id");
      err.status = 400;
      return next(err);
  }

    req.skillId = id; // store parsed id for later usage in controllers
    next();
}

function validateCreateSkill(req, res, next) {
    // Validate required fields for POST /skills
    const { title, category, progress, status } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        const err = new Error("Title required");
        err.status = 400;
        return next(err);
  }

    if (!category || typeof category !== "string" || category.trim() === "") {
        const err = new Error("Category required");
        err.status = 400;
        return next(err);
  }

    // Normalize
    req.body.title = title.trim();
    req.body.category = category.trim();

    // Optional fields validation
    if (progress !== undefined) {
        const p = Number(progress);
        if (!Number.isInteger(p) || p < 0 || p > 100) {
            const err = new Error("Progress must be an integer between 0 and 100");
            err.status = 400;
            return next(err);
      }
      req.body.progress = p;
  }

    if (status !== undefined) {
        const allowed = ["active", "done"];
        if (!allowed.includes(status)) {
            const err = new Error("Status must be 'active' or 'done'");
            err.status = 400;
            return next(err);
      }
  }

    next();
}

function validatePatchSkill(req, res, next) {
    // Validate optional fields for PATCH /skills/:id
    const { title, category, progress, status } = req.body;

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            const err = new Error("Title must be a non-empty string");
            err.status = 400;
            return next(err);
        }
        req.body.title = title.trim();
    }

    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            const err = new Error("Category must be a non-empty string");
            err.status = 400;
            return next(err);
        }
        req.body.category = category.trim();
    }

    if (progress !== undefined) {
        const p = Number(progress);
        if (!Number.isInteger(p) || p < 0 || p > 100) {
            const err = new Error("Progress must be an integer between 0 and 100");
            err.status = 400;
            return next(err);
        }
        req.body.progress = p;
    }

    if (status !== undefined) {
        const allowed = ["active", "done"];
        if (!allowed.includes(status)) {
            const err = new Error("Status must be 'active' or 'done'");
            err.status = 400;
            return next(err);
        }
    }

    next();
}

module.exports = {
    validateId,
    validateCreateSkill,
    validatePatchSkill
};