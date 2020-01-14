import React, { createContext, useReducer } from "react";

let initialState = {
  token: "",
  username: "",
  isAuthenticated: false
};

if (localStorage.getItem("authState")) {
  const cachedState = JSON.parse(localStorage.getItem("authState"));
  initialState = {
    token: cachedState.token,
    username: cachedState.username,
    isAuthenticated: cachedState.isAuthenticated
  };
}

const authStore = createContext(initialState);
const { Provider } = authStore;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "login":
        localStorage.setItem(
          "authState",
          JSON.stringify({
            token: action.payload.token,
            username: action.payload.username,
            isAuthenticated: true
          })
        );
        return {
          token: action.payload.token,
          username: action.payload.username,
          isAuthenticated: true
        };
      case "logout":
        localStorage.clear();
        return {
          token: "",
          username: "",
          isAuthenticated: false
        };
      default:
        throw new Error("No case");
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authStore, AuthProvider };
