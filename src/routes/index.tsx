import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard/DashBoard";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./ProtectedRoute";
import { AuthContext } from "../App";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

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
          </Routes>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default RouterConfig;
