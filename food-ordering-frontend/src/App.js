import React from "react";
import { Router } from "@reach/router";
import AdminSignup from "./pages/AdminSignup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./store/AuthStore";
import Nav from "./components/Nav";
import Restaurants from "./pages/Restaurants";
import CreateRestaurant from "./pages/CreateRestaurant";
import Restaurant from "./pages/Restaurant";
import CreateFoodArticle from "./pages/CreateFoodArticle";
const App = () => {
  return (
    <AuthProvider>
      <Nav />
      <Router>
        <Home path="/" />
        <AdminSignup path="signup" />
        <Login path="login" />
        <Restaurants path="restaurants" />
        <CreateRestaurant path="restaurants/create" />
        <Restaurant path="restaurants/:restaurantId" />
        <CreateFoodArticle path="restaurants/:restaurantId/AddFoodArticle" />
      </Router>
    </AuthProvider>
  );
};
export default App;
