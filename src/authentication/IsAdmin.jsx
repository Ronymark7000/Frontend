import { Navigate, useLocation } from "react-router-dom";

const IsAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userProfile"));

  const location = useLocation();

  if (user?.role !== "Admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default IsAdmin;