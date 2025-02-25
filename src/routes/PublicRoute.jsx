import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ authenticate }) => {
  return authenticate ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
