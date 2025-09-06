const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodPartnerController = require("../controllers/food-partner.controller");

router.get('/:id', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getFoodPartnerProfile);


module.exports = router;