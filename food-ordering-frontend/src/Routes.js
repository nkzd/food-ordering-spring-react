import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { authStore } from "./store/AuthStore";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(authStore);
  if (!authContext.state.isAuthenticated) {
    return <Redirect from="" to="/admin/login" noThrow />;
  } else {
    return <Component {...rest} />;
  }
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Component {...rest} />;
};

export { ProtectedRoute, PublicRoute };
