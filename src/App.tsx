import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

import "./App.css";
import RouterConfig from "./routes";
import { User } from "./types/User";

type ReducerStateType = {
  user: User | null;
  isAuth: boolean;
};

type AuthType = {
  user: User | null;
  isAuth: boolean;
  login: (user: User, token: string, refreshToken: string) => void | null;
};

const AuthInitialState: AuthType = {
  user: null,
  isAuth: false,
  login: null,
};

const ReducerInitalState: ReducerStateType = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  isAuth: false,
};

export const AuthContext = createContext(AuthInitialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
      };
    default:
      return null;
  }
};

function App() {
  const [state, dispatch] = useReducer(AuthReducer, ReducerInitalState);

  const login = (user, token, refreshToken) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    dispatch({ type: "LOGIN", payload: { user, isAuth: true } });
  };

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider
          value={{ user: state.user, isAuth: state.isAuth, login }}
        >
          <RouterConfig />
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
