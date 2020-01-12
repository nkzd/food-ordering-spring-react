import React from "react";
import { Router } from "@reach/router";
import AdminSignup from "./pages/AdminSignup";
import Login from "./pages/Login";
import { AuthProvider } from "./store/AuthStore";
import Restaurants from "./pages/Restaurants";
import CreateRestaurant from "./pages/CreateRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import Restaurant from "./pages/Restaurant";
import CreateFoodArticle from "./pages/CreateFoodArticle";
import EditFoodArticle from "./pages/EditFoodArticle";
import NotFound from "./pages/NotFound";
import { PublicRoute, ProtectedRoute } from "./Routes";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <PublicRoute component={Restaurants} path="/admin/" />
        <PublicRoute component={AdminSignup} path="/admin/signup" />
        <PublicRoute component={Login} path="/admin/login" />
        <ProtectedRoute component={Restaurants} path="/admin/restaurants" />
        <ProtectedRoute
          component={CreateRestaurant}
          path="/admin/restaurants/create"
        />
        <ProtectedRoute
          component={Restaurant}
          path="/admin/restaurants/:restaurantId"
        />
        <ProtectedRoute
          component={EditRestaurant}
          path="/admin/restaurants/:restaurantId/edit"
        />
        <ProtectedRoute
          component={CreateFoodArticle}
          path="/admin/restaurants/:restaurantId/AddFoodArticle"
        />
        <ProtectedRoute
          component={EditFoodArticle}
          path="/admin/restaurants/:restaurantId/:foodArticleId/edit"
        />

        <PublicRoute default component={NotFound} />
      </Router>
    </AuthProvider>
  );
};
export default App;
