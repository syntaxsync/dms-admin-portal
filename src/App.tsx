import React, { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";

import "./App.css";
import RouterConfig from "./routes/Routes";
import PageHeader from "./components/PageHeader";

import { User } from "./types/User";
const { Content, Footer } = Layout;

type ReducerStateType = {
  user: User | null;
  isAuth: boolean;
};

type AuthType = {
  user: User | null;
  isAuth: boolean;
  login: (
    user: User,
    token: string,
    refreshToken: string,
    rememberMe: boolean
  ) => void | null;
  logout: () => void;
};

const AuthInitialState: AuthType = {
  user: JSON.parse(localStorage.getItem("user")),
  isAuth: JSON.parse(localStorage.getItem("user")) && true,
  login: null,
  logout: null,
};

const ReducerInitalState: ReducerStateType = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: JSON.parse(localStorage.getItem("user")) ? true : false,
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
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      return null;
  }
};

function App() {
  const [state, dispatch] = useReducer(AuthReducer, ReducerInitalState);
  const navigate = useNavigate();

  const login = (user, token, refreshToken, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken);
    }
    dispatch({ type: "LOGIN", payload: { user, isAuth: true } });
    navigate("/");
  };

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <PageHeader />
        <Content>
          <AuthContext.Provider
            value={{ user: state.user, isAuth: state.isAuth, login, logout }}
          >
            <RouterConfig />
          </AuthContext.Provider>
        </Content>
        {ReducerInitalState.isAuth || (
          <Footer style={{ textAlign: "center" }}>
            DM System ©2021 Created by Team Developer X
          </Footer>
        )}
      </Layout>
    </div>
  );
}

export default App;
