import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, NavLink as Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import "antd/dist/antd.css";

import Logo from "./resources/images/logo.png";
import "./App.css";
import RouterConfig from "./routes";

import { User } from "./types/User";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

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
        <Layout style={{ minHeight: "100vh" }}>
          <Header className="header">
            <Link to="/">
              <img src={Logo} width={55} height={55} alt="DM Systems" />
              <Title level={2} style={{ display: "inline" }}>
                DM Systems
              </Title>
            </Link>
          </Header>
          <Content>
            <AuthContext.Provider
              value={{ user: state.user, isAuth: state.isAuth, login }}
            >
              <RouterConfig />
            </AuthContext.Provider>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            DM System ©2021 Created by Team Developer X
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
