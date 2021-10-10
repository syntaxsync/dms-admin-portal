import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

export interface PrivateRouteWithChildrensType {
  Component: ReactElement<any, any>;
  redirectTo: string;
  isAuth: Boolean;
  path: string;
  children: ReactElement<any, any>;
}

const PrivateRouteWithChildrens = ({
  Component,
  redirectTo,
  isAuth,
  path,
  children,
  ...props
}: PrivateRouteWithChildrensType) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <Route {...props} path={path} element={Component}>
      {children}
    </Route>
  );
};

export default PrivateRouteWithChildrens;
