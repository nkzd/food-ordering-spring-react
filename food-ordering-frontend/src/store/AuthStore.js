import React, { createContext, useReducer } from "react";

let initialAdminState = {
  token: "",
  username: "",
  isAuthenticated: false
};

let initialUserState = {
  token: "",
  username: "",
  isAuthenticated: false
};

if (localStorage.getItem("adminAuthState")) {
  const cachedState = JSON.parse(localStorage.getItem("adminAuthState"));
  initialAdminState = {
    token: cachedState.token,
    username: cachedState.username,
    isAuthenticated: true
  };
}

if (localStorage.getItem("userAuthState")) {
  const cachedState = JSON.parse(localStorage.getItem("userAuthState"));
  initialUserState = {
    token: cachedState.token,
    username: cachedState.username,
    isAuthenticated: true
  };
}

const initialState={
  adminState: initialAdminState,
  userState: initialUserState
}

const authStore = createContext(initialState);
const { Provider } = authStore;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      
      case "adminLogin":
        if(action.payload.rememberMe){
          localStorage.setItem(
            "adminAuthState",
            JSON.stringify({
              token: action.payload.token,
              username: action.payload.username
            })
          );
        }
        return {
          ...state,
          adminState :{
            token: action.payload.token,
            username: action.payload.username,
            isAuthenticated: true
          }
        };

        case "userLogin":
        if(action.payload.rememberMe){
          localStorage.setItem(
            "userAuthState",
            JSON.stringify({
              token: action.payload.token,
              username: action.payload.username
            })
          );
        }
        return {
          ...state,
          userState:
          {
            token: action.payload.token,
            username: action.payload.username,
            isAuthenticated: true
          }
        };

      case "adminLogout":
        localStorage.clear();
        return {
          ...state,
          adminState:
          {
            token: "",
            username: "",
            isAuthenticated: false
          }
        };
        case "userLogout":
        localStorage.clear();
        return {
          ...state,
          userState:
          {
            token: "",
            username: "",
            isAuthenticated: false
          }
        };
      default:
        throw new Error("No case");
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authStore, AuthProvider };
