import { Outlet } from "react-router-dom";
// import ReactToast from "./components/Toast/ReactToast";
import Navbar from "./components/Navbar/Navbar";

const SiteLayout = () => {
  return (
    <div>
      <Navbar />
   
      <Outlet />
    </div>
  );
};

export default SiteLayout;
