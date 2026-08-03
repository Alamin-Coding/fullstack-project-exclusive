const Category = require("../model/categoryModel")
const createCategoryController = async (req, res) => {
	const { categoryName } = req.body;

    if (!categoryName.trim()) {
       return res.json({
		success: false,
		message: "Category Name is Reqiured",
		data: categoryName,
	}); 
    }

	const isCategory = await Category.findOne({categoryName})


	if(isCategory) {
		return res.json({
		success: false,
		message: "Category already exist"
	});
	}

	// Category save to databse
	const newCategory = await Category.insertOne({categoryName})


	res.json({
		success: true,
		message: "Category created successfully",
		data: categoryName,
	});
}

const getCategoryController = async (req, res) => {


	const allCategory = await Category.find()


	if(allCategory.length === 0) {
		return res.json({
		success: true,
		message: "Category not found!",
		category: allCategory,
	});
	}

	res.json({
		success: true,
		message: "Category names",
		category: allCategory,
	});
}

module.exports = {createCategoryController, getCategoryController}