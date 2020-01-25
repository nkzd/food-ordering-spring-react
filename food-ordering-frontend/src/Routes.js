import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { authStore } from "./store/AuthStore";
const ProtectedRoute = ({ component: Component, authRequired, ...rest }) => {
  const authContext = useContext(authStore);

  switch (authRequired) {
    case "admin":
        if (!authContext.state.adminState.isAuthenticated) {
          return <Redirect from="" to="/admin/login" noThrow />;
        } else {
          return <Component {...rest} />;
        }
    case "user":
      if (!authContext.state.userState.isAuthenticated) {
        return <Redirect from="" to="/login" noThrow />;
      } else {
        return <Component {...rest} />;
      }
    default:
      throw new Error("no case");
  }

  
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Component {...rest} />;
};
export { ProtectedRoute, PublicRoute };
