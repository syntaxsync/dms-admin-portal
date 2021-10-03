import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

export interface PrivateRouteType {
  Component: ReactElement<any, any>;
  redirectTo: string;
  isAuth: Boolean;
  path: string;
  children: ReactElement<any, any>;
}

const PrivateRoute = ({
  Component,
  redirectTo,
  isAuth,
  path,
  children,
  ...props
}: PrivateRouteType) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }
  return (
    <Route {...props} path={path} element={Component}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
