import React from "react";
import { Route, Routes } from "react-router-dom";
import { Row, Col } from "antd";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/DashBoard";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./ProtectedRoute";
import { AuthContext } from "../App";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import { Empty } from "antd";
import Profile from "../pages/Profile/Profile";
import Degree from "../pages/Degree/Degree";
import Joining from "../pages/Joining/Joining";

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
            >
              <>
                <Route path="profile" element={<Profile />} />
                <Route path="my-degree" element={<Degree />} />
                <Route path="join-courses" element={<Joining />} />
              </>
            </PrivateRoute>
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
