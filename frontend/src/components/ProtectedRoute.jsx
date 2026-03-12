import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role_id");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Only check role if token exists
  if (location.pathname.startsWith("/admin") && roleId !== "1") {
    return <Navigate to="/auth" replace />;
  }

  if (location.pathname.startsWith("/student") && roleId !== "2") {
    return <Navigate to="/auth" replace />;
  }

  if (location.pathname.startsWith("/staff") && roleId !== "3") {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;