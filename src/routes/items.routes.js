// items.routes.js 
// 

const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.js");
const controller = require("../controllers/items.controller.js");



router.get("/", validate.validateQuery, controller.getAllItems);

router.get("/:id", validate.validateId, controller.getItemById);

router.post("/", validate.validateName, controller.createItem);

router.patch("/:id", validate.validateId, validate.validateName, controller.updateItem);

router.delete("/:id", validate.validateId, controller.deleteItem);




module.exports = router;