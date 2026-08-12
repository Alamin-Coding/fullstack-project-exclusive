const { Schema, model } = require("mongoose");

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	review: {
		type: Number,
		trim: true
	},
	price: {
		type: Number,
		trim: true,
		required: true
	},
	category: {
		type: String,
		trim: true,
		required: true
	},
	stock: {
		type: Number,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	colours: [
		{
			type: String,
			trim: true
		}
	],
	size: [
		{
			type: String,
			trim: true
		}
	],
	
	images: [
		{
			_id: false,
			url: {type: String, required: true}
		}
	]
}, {timestamps: true})

// const User = Model("User", userSchema);

module.exports = model("Product", productSchema);
