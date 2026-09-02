const { Schema, model } = require("mongoose");

const siteSchema = new Schema(
	{
		headerPromo: {
			text: { type: String, default: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!" },
			linkText: { type: String, default: "Shop Now" },
			linkUrl: { type: String, default: "/shop" },
		},
		banners: [
			{
				_id: false,
				imageUrl: { type: String, trim: true },
			},
		],
		flashSale: {
			title: { type: String, default: "Today's" },
			heading: { type: String, default: "Flash Sales" },
			endDate: { type: String, default: "2026-12-31 23:59:00" },
		},
		bestSelling: {
			title: { type: String, default: "This Month" },
			heading: { type: String, default: "Best Selling Products" },
		},
		ourProducts: {
			title: { type: String, default: "Our Products" },
			heading: { type: String, default: "Explore Our Products" },
		},
		musicPromo: {
			badge: { type: String, default: "Categories" },
			heading: { type: String, default: "Enhance Your Music Experience" },
			buttonText: { type: String, default: "Buy Now!" },
			buttonUrl: { type: String, default: "/shop" },
			imageUrl: { type: String, default: "" },
			endDate: { type: String, default: "2026-12-31 23:59:00" },
		},
		newArrival: {
			title: { type: String, default: "Featured" },
			heading: { type: String, default: "New Arrival" },
			items: [
				{
					_id: false,
					title: String,
					description: String,
					imageUrl: String,
					linkUrl: { type: String, default: "/shop" },
				},
			],
		},
		services: [
			{
				_id: false,
				title: String,
				subtitle: String,
			},
		],
		footer: {
			brand: { type: String, default: "Exclusive" },
			subscribeText: { type: String, default: "Get 10% off your first order" },
			address: { type: String, default: "111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh." },
			email: { type: String, default: "exclusive@gamil.com" },
			phone: { type: String, default: "+88015-88888-9999" },
			copyright: { type: String, default: "Copyright Rimel 2022. All right reserved" },
		},
		about: {
			title: { type: String, default: "Our Story" },
			paragraph1: {
				type: String,
				default:
					"Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3  millioons customers across the region.",
			},
			paragraph2: {
				type: String,
				default:
					"Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categoriesranging from consumer.",
			},
			imageUrl: { type: String, default: "" },
			stats: [
				{
					_id: false,
					count: String,
					heading: String,
				},
			],
			team: [
				{
					_id: false,
					name: String,
					role: String,
					imageUrl: String,
				},
			],
		},
		contact: {
			phoneLabel: { type: String, default: "Call To Us" },
			phoneText: { type: String, default: "We are available 24/7, 7 days a week." },
			phone: { type: String, default: "+8801611112222" },
			emailLabel: { type: String, default: "Write To US" },
			emailText: { type: String, default: "Fill out our form and we will contact you within 24 hours." },
			email1: { type: String, default: "customer@exclusive.com" },
			email2: { type: String, default: "support@exclusive.com" },
		},
	},
	{ timestamps: true }
);

module.exports = model("Site", siteSchema);
