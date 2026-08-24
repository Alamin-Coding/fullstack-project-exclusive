const { Router } = require("express");
const {
	addProductController,
	getProductsController,
	getAllProductColoursController,
	getProductByIdController,
	editProductController,
	deleteProductController,
} = require("../controller/productController");

const router = Router();

router.get("/product", getProductsController);
router.get("/product/colours", getAllProductColoursController);
router.get("/product/:id", getProductByIdController);
router.post("/product/add", addProductController);
router.put("/product/:id", editProductController);
router.delete("/product/:id", deleteProductController);

module.exports = router;
