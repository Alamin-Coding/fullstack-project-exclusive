const Site = require("../model/siteModel");

const defaultSite = {
	headerPromo: {
		text: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
		linkText: "Shop Now",
		linkUrl: "/shop",
	},
	banners: [{ imageUrl: "" }, { imageUrl: "" }, { imageUrl: "" }],
	flashSale: {
		title: "Today's",
		heading: "Flash Sales",
		endDate: "2026-12-31 23:59:00",
	},
	bestSelling: {
		title: "This Month",
		heading: "Best Selling Products",
	},
	ourProducts: {
		title: "Our Products",
		heading: "Explore Our Products",
	},
	musicPromo: {
		badge: "Categories",
		heading: "Enhance Your Music Experience",
		buttonText: "Buy Now!",
		buttonUrl: "/shop",
		imageUrl: "",
		endDate: "2026-12-31 23:59:00",
	},
	newArrival: {
		title: "Featured",
		heading: "New Arrival",
		items: [
			{ title: "PlayStation 5", description: "Black and White version of the PS5 coming out on sale.", imageUrl: "", linkUrl: "/shop" },
			{ title: "Women’s Collections", description: "Featured woman collections that give you another vibe.", imageUrl: "", linkUrl: "/shop" },
			{ title: "Speakers", description: "Amazon wireless speakers", imageUrl: "", linkUrl: "/shop" },
			{ title: "Perfume", description: "GUCCI INTENSE OUD EDP", imageUrl: "", linkUrl: "/shop" },
		],
	},
	services: [
		{ title: "FREE AND FAST DELIVERY", subtitle: "Free delivery for all orders over $140" },
		{ title: "24/7 CUSTOMER SERVICE", subtitle: "Friendly 24/7 customer support" },
		{ title: "MONEY BACK GUARANTEE", subtitle: "We reurn money within 30 days" },
	],
	footer: {
		brand: "Exclusive",
		subscribeText: "Get 10% off your first order",
		address: "111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.",
		email: "exclusive@gamil.com",
		phone: "+88015-88888-9999",
		copyright: "Copyright Rimel 2022. All right reserved",
	},
	about: {
		title: "Our Story",
		paragraph1:
			"Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3  millioons customers across the region.",
		paragraph2:
			"Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categoriesranging from consumer.",
		imageUrl: "",
		stats: [
			{ count: "10.5k", heading: "Sallers active our site" },
			{ count: "33k", heading: "Mopnthly Produduct Sale" },
			{ count: "45.5k", heading: "Customer active in our site" },
			{ count: "25k", heading: "Anual gross sale in our site" },
		],
		team: [
			{ name: "Tom Cruise", role: "Founder & Chairman", imageUrl: "" },
			{ name: "Emma Watson", role: "Managing Director", imageUrl: "" },
			{ name: "Will Smith", role: "Product Designer", imageUrl: "" },
		],
	},
	contact: {
		phoneLabel: "Call To Us",
		phoneText: "We are available 24/7, 7 days a week.",
		phone: "+8801611112222",
		emailLabel: "Write To US",
		emailText: "Fill out our form and we will contact you within 24 hours.",
		email1: "customer@exclusive.com",
		email2: "support@exclusive.com",
	},
};

const getOrCreateSite = async () => {
	let site = await Site.findOne();
	if (!site) {
		site = await Site.create(defaultSite);
	}
	return site;
};

const pickSitePayload = (body = {}) => ({
	headerPromo: body.headerPromo,
	banners: body.banners,
	flashSale: body.flashSale,
	bestSelling: body.bestSelling,
	ourProducts: body.ourProducts,
	musicPromo: body.musicPromo,
	newArrival: body.newArrival,
	services: body.services,
	footer: body.footer,
	about: body.about,
	contact: body.contact,
});

const getSiteController = async (req, res) => {
	try {
		const site = await getOrCreateSite();
		res.status(200).json({
			success: true,
			message: "Site content fetched successfully",
			site,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch site content",
		});
	}
};

const updateSiteController = async (req, res) => {
	try {
		const site = await getOrCreateSite();
		const payload = pickSitePayload(req.body);

		const updated = await Site.findByIdAndUpdate(site._id, payload, {
			new: true,
			runValidators: true,
		});

		if (!updated) {
			return res.status(404).json({
				success: false,
				message: "Site content not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Site content updated successfully",
			site: updated,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message || "Failed to update site content",
		});
	}
};

module.exports = { getSiteController, updateSiteController };
