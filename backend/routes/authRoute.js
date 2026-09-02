const express = require("express");
const {
	registrationController,
	verifyController,
	loginController,
	forgotPasswordController,
	setNewPasswordController,
	revarificationController,
} = require("../controller/authController");
const { getUsersController } = require("../controller/userController");

const router = express.Router();

router.post("/register", registrationController);
router.post("/verify/:token", verifyController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/setnew-password/:token", setNewPasswordController);
router.post("/revarify-email", revarificationController);
router.get("/users", getUsersController);

module.exports = router;
