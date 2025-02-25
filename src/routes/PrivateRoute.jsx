import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ authenticate }) => {
  console.log("PrivateRoute 인증 상태:", authenticate);
  return authenticate ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
