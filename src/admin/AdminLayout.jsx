import { Outlet } from "react-router-dom";
import Sidebar from "../admin/sidebar/Sidebar";
// import ReactToast from "../site/components/Toast/ReactToast";
import "./AdminLayout.css";


const AdminLayout = () => {
  return (
    <>
 
      {/* <div className="container mt-2"> */}
      <div className="row1a">
        <div className="acol"> 
          <Sidebar />
        </div>
        <div className="bcol">
          <Outlet />
        </div>
      </div>
    {/* </div> */}
    </>
  );
};

export default AdminLayout;
