// validate.js
// 

// validate Name
function validateName(req, res, next) {
    const name = req.body?.name;

    if (!name || typeof name !== "string" || name.trim() === "") {
        const err = new Error("Name required");
        err.status = 400;
        return next(err);
    };

    req.body.name = name.trim();
    next();
};

// validate Id
function validateId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        const err = new Error("Invalid Id");
        err.status = 400;
        return next(err);
    };

    req.itemId = id;
    next();
};

// validate limit, offset, order, sort
function validateQuery(req, res, next) {
    const { limit, offset, order, sort } = req.query;

    if (limit !== undefined) {
        const n = Number(limit);
        if (!Number.isInteger(n) || n < 0) {
            const err = new Error("limit must be a positive integer");
            err.status = 400;
            return next(err);
        };
    };

    if (offset !== undefined) {
        const n = Number(offset);
        if (!Number.isInteger(n) || n < 0) {
            const err = new Error("Offset must be a positive integer");
            err.status = 400;
            return next(err);
        };
    };

    const allowedSortFields = ["name","id"];
    if (sort !== undefined && !allowedSortFields.includes(sort)) {
        const err = new Error("Invalid sort field");
        err.status = 400;
        return next(err);
    };


    if (order !== undefined && order !== "asc" && order != "desc") {
        const err = new Error("Order must be 'asc' or 'desc'");
        err.status = 400;
        return next(err);
    };

    next();
};







module.exports = { validateName, validateId, validateQuery };