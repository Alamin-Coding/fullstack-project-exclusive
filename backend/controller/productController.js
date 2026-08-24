const Product = require("../model/productModel");

const addProductController = async (req, res) => {
	const { title, price, review, description, stock, images, size, colours, category } = req.body;

	if (!title || price === undefined || review === undefined || !description || stock === undefined || !images?.length || !size?.length || !colours?.length || !category) {
		return res.status(400).json({
			success: false,
			message: "All Field are required",
		});
	}

	const product = await Product.findOne({ title });

	if (product) {
		return res.status(409).json({
			success: false,
			message: "This product already exist",
		});
	}

	const newProduct = new Product(req.body);
	await newProduct.save();

	res.status(201).json({
		success: true,
		message: "Product created successfully",
		data: newProduct,
	});
};

const getProductsController = async (req, res) => {
	const products = await Product.find().sort({ createdAt: -1 });

	res.status(200).json({
		success: true,
		message: products.length ? "Products fetched successfully" : "No products found",
		products,
	});
};

const getAllProductColoursController = async (req, res) => {
	const colours = await Product.aggregate([
		{ $unwind: "$colours" },
		{
			$project: {
				colour: { $trim: { input: "$colours" } },
			},
		},
		{ $match: { colour: { $ne: "" } } },
		{
			$group: {
				_id: { $toLower: "$colour" },
				colour: { $first: "$colour" }
			},
		},
		{ $sort: { colour: -1 } },
		{ $project: { _id: 1, colour: 1 } },
	]);

	res.status(200).json({
		success: true,
		message: colours.length ? "Colours fetched successfully" : "No colours found",
		colours: colours.map((item) => item.colour),
	});
};

const getProductByIdController = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	res.status(200).json({
		success: true,
		message: "Product fetched successfully",
		product,
	});
};

const editProductController = async (req, res) => {
	const { id } = req.params;
	const { title, price, review, description, stock, images, size, colours, category } = req.body;

	const product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	const duplicate = await Product.findOne({ title, _id: { $ne: id } });

	if (duplicate) {
		return res.status(409).json({
			success: false,
			message: "Another product with this title already exists",
		});
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{ title, price, review, description, stock, images, size, colours, category },
		{ new: true }
	);

	res.status(200).json({
		success: true,
		message: "Product updated successfully",
		data: updatedProduct,
	});
};

const deleteProductController = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	const deletedProduct = await Product.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: "Product deleted successfully",
		data: deletedProduct,
	});
};

module.exports = {
	addProductController,
	getProductsController,
	getAllProductColoursController,
	getProductByIdController,
	editProductController,
	deleteProductController,
};
