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

const deleteCategoryController = async (req, res) => {
	const {id} = req.params;


	const category = await Category.findById(id)
	if (!category) {
		return res.json({
			success: false,
			message: "Category not found"
		});
	}

	const deleteItem = await Category.findByIdAndDelete(id)

	res.json({
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
		return res.json({
			success: false,
			message: "Category not found"
		});
	}

	const editItem = await Category.findByIdAndUpdate(id, {categoryName:categoryName})

	res.json({
		success: true,
		message: editItem.categoryName + " Category Edit Successfully",
		deleteItem: editItem.categoryName
	});
}

module.exports = {createCategoryController, getCategoryController, deleteCategoryController,editCategoryController}