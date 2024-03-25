import { Navigate, useLocation } from "react-router-dom";

const Public = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default Public;
