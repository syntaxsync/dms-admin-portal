import React from "react";
import { Route, Routes } from "react-router-dom";
import { Row, Col } from "antd";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/DashBoard";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./ProtectedRoute";
import PrivateRouteWithChildrens from "./ProtectedRouteWithChildrens";
import { AuthContext } from "../App";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import { Empty } from "antd";
import Profile from "../pages/Profile/Profile";
import Degree from "../pages/Degree/Degree";
import Joining from "../pages/Joining/Joining";
import DegreeList from "../pages/DegreeList/DegreeList";
import AddDegree from "../pages/DegreeDetails/DegreeDetails";
import CreateNewDegree from "../pages/CreateDegree/CreateNewDegree";
import DepartmentList from "../pages/Department/DepartmentList";
import AddNewDepartment from "../pages/Department/AddNewDepartment";
import Offerings from "../pages/Offerings/Offerings";
import DetailsOffering from "../pages/Offerings/DetailsOfferings";
import AddOfferings from "../pages/Offerings/AddOfferings";
import ManageJoinings from "../pages/ManageJoinings/ManageJoinings";
import ViewJoinings from "../pages/ViewJoinings/ViewJoinings";

const RouterConfig = () => {
  return (
    <AuthContext.Consumer>
      {({ isAuth, user }) => {
        return (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <PrivateRouteWithChildrens
              isAuth={isAuth}
              path="/"
              Component={<Dashboard />}
              redirectTo="/login"
            >
              <>
                <Route path="profile" element={<Profile />} />
                <PrivateRoute
                  isAuth={isAuth}
                  allowedRoles={["student"]}
                  role={user?.role}
                  path="my-degree"
                  Component={<Degree />}
                  redirectTo="/login"
                />
                <PrivateRoute
                  isAuth={isAuth}
                  path="join-courses"
                  allowedRoles={["student"]}
                  role={user?.role}
                  Component={<Joining />}
                  redirectTo="/login"
                />

                <PrivateRoute
                  isAuth={isAuth}
                  path="view-joinings"
                  allowedRoles={["student"]}
                  role={user?.role}
                  Component={<ViewJoinings />}
                  redirectTo="/login"
                />

                <Route path="degree-list">
                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path="/"
                    Component={<DegreeList />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path=":code"
                    Component={<AddDegree />}
                    redirectTo="/login"
                    role={user?.role}
                  />

                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path="add"
                    Component={<CreateNewDegree />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                </Route>

                <Route path="departments">
                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path="/"
                    Component={<DepartmentList />}
                    redirectTo="/login"
                    role={user?.role}
                  />

                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path="add"
                    Component={<AddNewDepartment />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                </Route>

                <Route path="offerings">
                  <PrivateRoute
                    allowedRoles={["admin", "teacher", "student"]}
                    isAuth={isAuth}
                    path="/"
                    Component={<Offerings />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                  <PrivateRoute
                    allowedRoles={["admin", "teacher", "student"]}
                    isAuth={isAuth}
                    path="/:degreeId/:offeringId"
                    Component={<DetailsOffering />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path="/add"
                    Component={<AddOfferings />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                </Route>

                <Route path="manage">
                  <PrivateRoute
                    allowedRoles={["admin"]}
                    isAuth={isAuth}
                    path="/joinings"
                    Component={<ManageJoinings />}
                    redirectTo="/login"
                    role={user?.role}
                  />
                </Route>
              </>
            </PrivateRouteWithChildrens>
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
