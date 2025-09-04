const express = require("express");
const multer = require("multer");

const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const upload = multer({
  storage: multer.memoryStorage(),
});

// prefix:- POST /api/food/ (protected so that only a foodpartner can add a food item and not a normal user)  => see app.js
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.addFood
);

//  GET /api/food/ (protected)
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

module.exports = router;
