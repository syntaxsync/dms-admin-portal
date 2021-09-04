import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard/DashBoard";
import PrivateRoute from "./ProtectedRoute";
import { AuthContext } from "../App";

const RouterConfig = () => {
  return (
    <AuthContext.Consumer>
      {({ isAuth }) => {
        console.log(isAuth);
        return (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
