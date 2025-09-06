const mongoose = require("mongoose");
const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");

const getFoodPartnerProfile = async (req, res) => {
  try {
    const foodPartnerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
      return res.status(400).json({ message: "Invalid food partner ID" });
    }

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    return res.status(200).json({
      message: "Food partner fetched successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (error) {
    console.error("Error in getFoodPartnerProfile:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getFoodPartnerProfile };
