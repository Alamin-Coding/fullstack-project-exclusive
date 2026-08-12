const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail, sendForgotEmail } = require("../utils/sendEmail");
const dotenv = require("dotenv");
dotenv.config();

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({
      success: false,
      message: "User Already exist",
    });
  }

  // hash password create
  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // send verification email
  sendEmail(email, "alamin", token);

  res.status(201).json({
    success: true,
    message: "User registration successfull",
    data: {
      email: newUser.email,
    },
  });
};

const verifyController = async (req, res) => {
  const { token } = req.params;

  // token check
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    // err
    if (err) {
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }
    // decoded token
    const userId = decoded.id;
    console.log("USER ID ", userId);

    const hasUser = await UserModel.findOne({ _id: userId });
    console.log(hasUser);

    if (!hasUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    hasUser.isVerified = true;
    await hasUser.save();

    return res.status(200).json({
      success: true,
      message: "email varification successfull",
    });
  });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await UserModel.findOne({ email });

  if (!isUserExist) {
    return res.status(404).json({
      success: false,
      message: "User Not Found!",
    });
  }

  // Password match
  const matchPassword = bcrypt.compareSync(password, isUserExist.password);

  if (!matchPassword) {
    return res.status(401).json({
      success: false,
      message: "Credential error",
    });
  }

  const token = jwt.sign(
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    process.env.ACCESS_TOKEN,
    { expiresIn: "7d" },
  );

  res.status(200).json({
    success: true,
    message: "Successfully Login",
    userInfo: {
      id: isUserExist._id,
      role: isUserExist.role,
      accesstoken: token,
      email: isUserExist.email
    }
  });
};


const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const isUserExist = await UserModel.findOne({ email });

  if (!isUserExist) {
    return res.status(404).json({
      success: false,
      message: "User Not Found!",
    });
  }

  try {
    console.log(process.env.ACCESS_TOKEN);
    const token = jwt.sign(
      { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" },
    );
    console.log(token);

    sendForgotEmail(email, "Al-amin", token);

    res.status(200).json({
      success: true,
      message: "Check your email and set the new password",
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const setNewPasswordController = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token Not Found!",
    });
  }

  try {
    const decode = jwt.decode(token, process.env.AccessToken);
    console.log("DECODE", decode);
    const user = await UserModel.findById(decode.id);
    console.log(user);

    // Generate hashpassword
    const hashpassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashpassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully change the password",
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const revarificationController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const isUserExist = await UserModel.findOne({ email });
    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // check the user already verify or not
    if (isUserExist.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already vefified",
      });
    }

    const token = jwt.sign(
      { id: isUserExist._id, email: isUserExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    // send verification email
    sendEmail(email, isUserExist.email, token);

    return res.status(200).json({
      success: true,
      message: "Resend varification email. please check your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registrationController,
  verifyController,
  loginController,
  forgotPasswordController,
  setNewPasswordController,
  revarificationController,
};
