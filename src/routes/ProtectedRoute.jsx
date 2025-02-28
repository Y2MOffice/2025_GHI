import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userType = JSON.parse(sessionStorage.getItem("user"))?.userType;
  const isAuthorized = userType === "admin" || userType === "super_admin";

  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
