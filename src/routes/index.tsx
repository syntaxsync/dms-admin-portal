import React from "react";
import { Route, Routes } from "react-router-dom";
import { Row, Col } from "antd";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard/DashBoard";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./ProtectedRoute";
import { AuthContext } from "../App";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import { Empty } from "antd";

const RouterConfig = () => {
  return (
    <AuthContext.Consumer>
      {({ isAuth }) => {
        console.log(isAuth);
        return (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <PrivateRoute
              isAuth={isAuth}
              path="/"
              Component={<Dashboard />}
              redirectTo="/login"
            />
            <Route
              path="*"
              element={
                <Row
                  style={{ height: "calc(100vh - 134px)" }}
                  justify="space-around"
                  align="middle"
                >
                  <Col span={24}>
                    <Empty description={"No Page Found"} />
                  </Col>
                </Row>
              }
            ></Route>
          </Routes>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default RouterConfig;
