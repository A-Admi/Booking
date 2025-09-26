import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default AdminRoute;
