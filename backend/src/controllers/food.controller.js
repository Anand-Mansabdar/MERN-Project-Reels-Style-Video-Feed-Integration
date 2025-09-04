const { v4: uuid } = require("uuid");

const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");

const addFood = async (req, res) => {
  console.log(req.foodPartner);

  console.log(req.body);
  console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  return res.status(201).json({
    message: "Food item added successfully!",
    foodItem,
  });
};

const getFoodItems = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: 'Food items found successfully!',
    foodItems
  })
};

module.exports = { addFood, getFoodItems };
