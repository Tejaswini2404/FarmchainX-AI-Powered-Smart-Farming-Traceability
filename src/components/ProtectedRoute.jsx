import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // stored at login

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Normalize for safety
  const normalizedUserRole = userRole?.toLowerCase();
  const normalizedRequiredRole = role?.toLowerCase();

  if (normalizedUserRole !== normalizedRequiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
