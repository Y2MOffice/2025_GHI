import React from "react";
import { Navigate } from "react-router-dom";
import MyPage from "../MyPage";

const PrivateRoute = ({ authenticate }) => {
  return authenticate == true ? <MyPage /> : <Navigate to="/login" />;
};

export default PrivateRoute;
