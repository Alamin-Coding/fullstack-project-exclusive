const Category = require("../model/categoryModel")
const createCategoryController = async (req, res) => {
	const { categoryName } = req.body;

    if (!categoryName?.trim()) {
       return res.status(400).json({
		success: false,
		message: "Category Name is Reqiured",
		data: categoryName,
	}); 
    }

	const isCategory = await Category.findOne({categoryName})


	if(isCategory) {
		return res.status(409).json({
		success: false,
		message: "Category already exist"
	});
	}

	// Category save to databse
	const newCategory = await Category.insertOne({categoryName})


	res.status(201).json({
		success: true,
		message: "Category created successfully",
		data: categoryName,
	});
}

const getCategoryController = async (req, res) => {


	const allCategory = await Category.find()


	if(allCategory.length === 0) {
		return res.status(200).json({
		success: true,
		message: "Category not found!",
		category: allCategory,
	});
	}

	res.status(200).json({
		success: true,
		message: "Category names",
		category: allCategory,
	});
}

const deleteCategoryController = async (req, res) => {
	const {id} = req.params;


	const category = await Category.findById(id)
	if (!category) {
		return res.status(404).json({
			success: false,
			message: "Category not found"
		});
	}

	const deleteItem = await Category.findByIdAndDelete(id)

	res.status(200).json({
		success: true,
		message: "Category Delete Successfully",
		deleteItem: deleteItem
	});
}

const editCategoryController = async (req, res) => {
	const {id} = req.params;
	const {categoryName} = req.body;


	const category = await Category.findById(id)
	if (!category) {
		return res.status(404).json({
			success: false,
			message: "Category not found"
		});
	}

	const editItem = await Category.findByIdAndUpdate(id, {categoryName:categoryName}, { new: true })

	res.status(200).json({
		success: true,
		message: editItem.categoryName + " Category Edit Successfully",
		deleteItem: editItem.categoryName
	});
}

module.exports = {createCategoryController, getCategoryController, deleteCategoryController,editCategoryController}
