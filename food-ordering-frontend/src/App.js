import React from "react";
import { Router } from "@reach/router";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import { AuthProvider } from "./store/AuthStore";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import CreateRestaurant from "./pages/admin/CreateRestaurant";
import EditRestaurant from "./pages/admin/EditRestaurant";
import AdminRestaurant from "./pages/admin/AdminRestaurant";
import CreateFoodArticle from "./pages/admin/CreateFoodArticle";
import EditFoodArticle from "./pages/admin/EditFoodArticle";
import NotFound from "./pages/admin/NotFound";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import UserRestaurants from "./pages/user/UserRestaurants";
import UserRestaurant from "./pages/user/UserRestaurant";

import { PublicRoute, ProtectedRoute } from "./Routes";
const App = () => {

  return (
    <AuthProvider>
      <Router>
        <PublicRoute component={UserLogin} path="/login" />
        <PublicRoute component={UserSignup} path="/signup" />
        <PublicRoute component={UserRestaurants} path="/restaurants" />
        <PublicRoute component={UserRestaurant} path="/restaurant" />

        
        <ProtectedRoute component={AdminRestaurants} path="/admin/" />
        <PublicRoute component={AdminSignup} path="/admin/signup" />
        <PublicRoute component={AdminLogin} path="/admin/login" />
        <ProtectedRoute component={AdminRestaurants} path="/admin/restaurants" />
        <ProtectedRoute
          component={CreateRestaurant}
          path="/admin/restaurants/create"
        />
        <ProtectedRoute
          component={AdminRestaurant}
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
export const apiUrl="http://localhost:8080";
export default App;

