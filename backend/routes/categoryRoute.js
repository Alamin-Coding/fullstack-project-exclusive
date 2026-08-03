const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const {createCategoryController, getCategoryController} = require("../controller/categoryController");
const router = Router();

router.get("/category", getCategoryController);
router.post("/category", createCategoryController);

module.exports = router;
