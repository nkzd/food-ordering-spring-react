import React, { useContext } from "react";
import { Link } from "@reach/router";
import { authStore } from "../store/AuthStore";
const Nav = () => {
  const authState = useContext(authStore);
  const { dispatch } = authState;

  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link> <Link to="/signup">Signup</Link>{" "}
      <Link to="/restaurants">Restaurants</Link>{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
export default Nav;
