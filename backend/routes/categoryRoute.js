const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const {createCategoryController, getCategoryController, deleteCategoryController, editCategoryController} = require("../controller/categoryController");
const router = Router();

router.get("/category", getCategoryController);
router.post("/category", createCategoryController);
router.delete("/category/:id", deleteCategoryController);
router.put("/category/:id", editCategoryController);

module.exports = router;
