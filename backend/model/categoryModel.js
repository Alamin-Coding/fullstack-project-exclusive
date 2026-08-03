const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
	categoryName: {
		type: String,
		required: true,
		unique: true,
		trim: true 
	},
}, {timestamps: true})


module.exports = model("Category", categorySchema);
