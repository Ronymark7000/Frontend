import { Outlet } from "react-router-dom";
// import ReactToast from "./components/Toast/ReactToast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./HomePage/FooterSection/Footer";

const SiteLayout = () => {
  return (
    <div>
      <Navbar />
   
      <Outlet />

      <Footer/>
    </div>
  );
};

export default SiteLayout;
