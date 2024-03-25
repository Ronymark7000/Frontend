import { Outlet } from "react-router-dom";
import ReactToast from "./components/Toast/ReactToast";
import Navbar from "./components/Navbar/Navbar";

const SiteLayout = () => {
  return (
    <div>
      <Navbar />
      <ReactToast/>
      <Outlet />
    </div>
  );
};

export default SiteLayout;
