const mongoose = require("mongoose");
const foodPartnerModel = require("../models/foodpartner.model");

const getFoodPartnerProfile = async (req, res) => {
  try {
    const foodPartnerId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
      return res.status(400).json({ message: "Invalid food partner ID" });
    }

    // Fetch food partner with populated food items
    const foodPartner = await foodPartnerModel
      .findById(foodPartnerId)
      .populate("foodItems"); // assumes `foodItems` is a ref in your schema

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    return res.status(200).json({
      message: "Food partner fetched successfully",
      foodPartner,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getFoodPartnerProfile };
