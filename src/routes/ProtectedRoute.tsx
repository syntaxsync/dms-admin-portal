import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

export interface PrivateRouteType {
  Component: ReactElement<any, any>;
  redirectTo: string;
  isAuth: Boolean;
  path: string;
  role: string;
  allowedRoles: string[];
}

const PrivateRoute = ({
  Component,
  redirectTo,
  isAuth,
  path,
  allowedRoles,
  role,
  ...props
}: PrivateRouteType) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Route {...props} path={path} element={Component} />;
};

export default PrivateRoute;
