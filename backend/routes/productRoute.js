const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const { addProductController } = require("../controller/productController");
const router = Router();

router.post("/product/add",  addProductController);

module.exports = router;
