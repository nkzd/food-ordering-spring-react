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

//session cache
if (sessionStorage.getItem("adminAuthState")) {
  const cachedState = JSON.parse(sessionStorage.getItem("adminAuthState"));
  initialAdminState = {
    token: cachedState.token,
    username: cachedState.username,
    isAuthenticated: true
  };
}else{
  //"remember me" cache
  if (localStorage.getItem("adminAuthState")) {
    const cachedState = JSON.parse(localStorage.getItem("adminAuthState"));
    initialAdminState = {
      token: cachedState.token,
      username: cachedState.username,
      isAuthenticated: true
    };
  }
}

if (sessionStorage.getItem("userAuthState")) {
  const cachedState = JSON.parse(sessionStorage.getItem("userAuthState"));
  initialUserState = {
    token: cachedState.token,
    username: cachedState.username,
    isAuthenticated: true
  };
}else{
  if (localStorage.getItem("userAuthState")) {
    const cachedState = JSON.parse(localStorage.getItem("userAuthState"));
    initialUserState = {
      token: cachedState.token,
      username: cachedState.username,
      isAuthenticated: true
    };
  }
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

        sessionStorage.setItem(
          "adminAuthState",
          JSON.stringify({
            token: action.payload.token,
            username: action.payload.username
          })
        );

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

          sessionStorage.setItem(
            "userAuthState",
            JSON.stringify({
              token: action.payload.token,
              username: action.payload.username
            })
          );

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
        sessionStorage.clear();
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
        sessionStorage.clear();
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
