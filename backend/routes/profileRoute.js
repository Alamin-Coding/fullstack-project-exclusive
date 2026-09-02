const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
	getProfileController,
	updateProfileController,
	updatePasswordController,
} = require("../controller/userController");

const router = Router();

router.get("/profile/:id", authMiddleware, getProfileController);
router.put("/profile/:id", authMiddleware, updateProfileController);
router.put("/profile/:id/password", authMiddleware, updatePasswordController);

module.exports = router;
