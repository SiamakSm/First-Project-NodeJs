// items.controller.js

const {
    getAll,
    getById,
    create,
    remove,
    update
} = require("../Data/items.data.js");
const applyQuery = require("../utils/applyQuery.js");


exports.getAllItems = async (req, res, next) => {
    try {
        let items = await getAll();
        items = applyQuery(items, req.query);
        res.json(items);
    } catch (err) {
        next(err);
    }
};


exports.getItemById = async (req, res, next) => {
    try {
        const item = await getById(req.itemId);
        if (!item) {
            const error = new Error("Item not found");
            error.status = 404;
            return next(error);
        };
        res.json(item);
    } catch (err) { next(err); }
};


exports.createItem = async (req, res, next) => {
    try {
        const item = await create(req.body.name);
        res.status(201).json(item);
    } catch (err) { next(err); }
};


exports.updateItem = async (req, res, next) => {
    try {
        const item = await update(req.itemId, req.body.name);
        if (!item) {
            const error = new Error("Not Found");
            error.status = 404;
            return next(error);
        }
        res.json(item);
    } catch (err) { next(err); }
};


exports.deleteItem = async (req, res, next) => {
    try {
        const success = await remove(req.itemId);
        if (!success) {
            const error = new Error("Not Found");
            error.status = 404;
            return next(error);
        }
        res.json({ message: "Item Deleted" });
    } catch (err) { next(err); }
};