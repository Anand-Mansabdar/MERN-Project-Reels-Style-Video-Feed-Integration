const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// User Authentication API's
router.post("/user/register", authController.postRegisterController);

router.post("/user/login", authController.loginController);

router.get("/user/logout", authController.logoutUser);

// Foodpartner Authentication API's
router.post("/food-partner/register", authController.registerFoodPartner);

router.post("/food-partner/login", authController.loginFoodPartner);

router.get("/food-partner/logout", authController.logoutFoodPartner);



module.exports = router;