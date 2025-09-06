const { v4: uuid } = require("uuid");

const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

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
    message: "Food items found successfully!",
    foodItems,
  });
};

const likeFood = async (req, res) => {
  const { foodId } = req.body;

  const user = req.user;

  const isLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    return res.status(201).json({
      message: "Food item unliked successfully!",
    });
  }

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: -1 },
  });

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  return res.status(201).json({
    message: "Food item liked successfully!",
    like,
  });
};

const saveFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isSaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isSaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    return res.status(201).json({
      message: "Food item saved successfully!",
    });
  }

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { saveCount: -1 },
  })

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { saveCount: 1 },
  })

  return res.status(201).json({
    message: "Food item saved successfully!",
    save,
  });
};

const getSavedFoodItems = async(req, res) =>{
  const user = req.user;

  const savedFoods = await saveModel.find({user: user._id}).populate('food');

  if(!savedFoods || savedFoods.length === 0){
    return res.status(200).json({
      message: "No saved food items found!",
    });
  }

  res.status(200).json({
    message: "Saved food items found successfully!",
    savedFoods,
  })
}

module.exports = { addFood, getFoodItems, likeFood, saveFood, getSavedFoodItems };
