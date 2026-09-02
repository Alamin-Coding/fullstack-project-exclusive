const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization || req.headers.Authorization;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Token not found!",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Invalid or expired token",
		});
	}
};

module.exports = authMiddleware;
