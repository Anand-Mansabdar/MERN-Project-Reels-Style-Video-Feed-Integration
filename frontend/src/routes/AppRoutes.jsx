import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import ChooseRegister from '../pages/auth/ChooseRegister';
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from '../pages/food-partner/Profile';
import Saved from "../pages/general/Saved";
import BottomNav from "../components/BottomNav";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<><Home /><BottomNav /></>}></Route>
        <Route path="/saved" element={<><Saved /><BottomNav /></>}></Route>
        <Route path="/create-food" element={<CreateFood />} ></Route>
        <Route path="/food-partner/:id" element={<Profile />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
