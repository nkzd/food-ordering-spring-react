import React, { createContext, useReducer } from "react";

const initialState = {
  token: "",
  username: "",
  isAuthenticated: "false"
};
const authStore = createContext(initialState);
const { Provider } = authStore;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "login":
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        return {
          token: action.payload.token,
          username: action.payload.username,
          isAuthenticated: true
        };

      case "checkLogin":
        return "hehe";
      case "logout":
        localStorage.clear();
        return {
          token: "",
          username: "",
          isAuthenticated: false
        };
      default:
        throw new Error("Nemam ovakav tip");
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authStore, AuthProvider };
