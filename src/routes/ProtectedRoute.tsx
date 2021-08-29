import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

export interface PrivateRoute {
  // component:;
  redirectTo: string;
  isAuth: Boolean;
  path: string;
}

const PrivateRoute = ({
  // component,
  redirectTo,
  isAuth,
  path,
  ...props
}: PrivateRoute) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }
  // return <Route path={path} element={<component />} />;
};

export default PrivateRoute;
