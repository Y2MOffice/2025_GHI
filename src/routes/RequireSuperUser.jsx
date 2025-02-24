import { Navigate } from "react-router-dom";

const RequireSuperUser = ({ superUser, children }) => {
  if (!superUser) {
    return <Navigate to="/admin" replace />; // superUser가 false면 /admin으로 리디렉트
  }
  return children; // superUser가 true이면 정상적으로 페이지 렌더링
};

export default RequireSuperUser;
