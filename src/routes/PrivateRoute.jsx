import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ authenticate }) => {
  return authenticate ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
