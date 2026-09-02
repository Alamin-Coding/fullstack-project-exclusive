const bcrypt = require("bcryptjs");
const UserModel = require("../model/userModel");

const getUsersController = async (req, res) => {
	const users = await UserModel.find().select("-password").sort({ createdAt: -1 });
	res.status(200).json({
		success: true,
		message: users.length ? "Users fetched successfully" : "No users found",
		users,
	});
};

const getProfileController = async (req, res) => {	try {
		const { id } = req.params;

		if (req.user.id !== id && req.user.role !== "admin") {
			return res.status(403).json({
				success: false,
				message: "You are not allowed to view this profile",
			});
		}

		const user = await UserModel.findById(id).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Profile fetched successfully",
			profile: user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch profile",
		});
	}
};

const updateProfileController = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, firstName, lastName, email, phoneNumber, address, avatar, billingAddress } = req.body;

		if (req.user.id !== id && req.user.role !== "admin") {
			return res.status(403).json({
				success: false,
				message: "You are not allowed to update this profile",
			});
		}

		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		if (email && email !== user.email) {
			const existingUser = await UserModel.findOne({ email });
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: "Email already in use",
				});
			}
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{ name, firstName, lastName, email, phoneNumber, address, avatar, billingAddress },
			{ new: true, runValidators: true }
		).select("-password");

		res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			profile: updatedUser,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message || "Failed to update profile",
		});
	}
};

const updatePasswordController = async (req, res) => {
	try {
		const { id } = req.params;
		const { currentPassword, newPassword, confirmPassword } = req.body;

		if (req.user.id !== id) {
			return res.status(403).json({
				success: false,
				message: "You can only change your own password",
			});
		}

		if (!currentPassword || !newPassword || !confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "All password fields are required",
			});
		}

		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords do not match",
			});
		}

		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const isMatch = bcrypt.compareSync(currentPassword, user.password);

		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Current password is incorrect",
			});
		}

		user.password = bcrypt.hashSync(newPassword, 10);
		await user.save();

		res.status(200).json({
			success: true,
			message: "Password updated successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message || "Failed to update password",
		});
	}
};

module.exports = {
	getUsersController,
	getProfileController,
	updateProfileController,
	updatePasswordController,
};