import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard/DashBoard";
import PrivateRoute from "./ProtectedRoute";

const RouterConfig = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="app" element={<Dashboard />}>
            <PrivateRoute
              isAuth={true}
              path="account"
              // component={<Login />}
              redirectTo="/login"
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default RouterConfig;
