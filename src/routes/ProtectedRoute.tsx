import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

export interface PrivateRouteType {
  Component: ReactElement<any, any>;
  redirectTo: string;
  isAuth: Boolean;
  path: string;
}

const PrivateRoute = ({
  Component,
  redirectTo,
  isAuth,
  path,
  ...props
}: PrivateRouteType) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }
  return <Route {...props} path={path} element={Component} />;
};

export default PrivateRoute;
