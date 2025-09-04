const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegisterController = async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(401).json({
      message: "User exists. Please login",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully!",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist! Please register...",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    user: {
      email: user.email,
    },
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully!",
  });
};

const registerFoodPartner = async (req, res) => {
  const { name, email, password, phone, address, contactName } = req.body;

  const partnerExists = await foodPartnerModel.findOne({ email });

  if (partnerExists) {
    return res.status(401).json({
      message: "Food partner already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    contactName,
    phone,
    address,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(200).json({
    message: "Food partner created successfully!",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
};

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const validPassword = await bcrypt.compare(password, foodPartner.password);

  if (!validPassword) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
};

const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully!",
  });
};

module.exports = {
  postRegisterController,
  loginController,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
