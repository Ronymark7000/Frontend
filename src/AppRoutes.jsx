import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./site/SiteLayout";
import ReactToast from "./site/components/Toast/ReactToast";
import HomePage from "./site/HomePage";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard/Dashboard";
import Login from "./site/Auth/Login";
import PageNotFound from "./site/404Page/404Page";
import Sidebar from "./admin/sidebar/Sidebar";
import IsAdmin from "./authentication/IsAdmin";
import Public from "./authentication/Public";
import Confirmation from "./authentication/EmailVerify/Confirmation";
import AddUser from "./admin/components/User/AddUser";
import UserDashboard from "./admin/components/User/UserDashboard";
import EditUser from "./admin/components/User/EditUser";
import ItemDashboard from "./admin/components/Items/ItemDashboard";
import AddItems from "./admin/components/Items/AddItems";
import UpdateItem from "./admin/components/Items/UpdateItem";
import Item from "./site/OtherPages/ProductPage/Item";
import ItemDetails from "./site/OtherPages/ProductPage/ItemDetailPage";
import Inventory from "./admin/components/Inventory/Inventory";
import InventoryView from "./admin/components/Inventory/InventoryView";
import Profile from "./site/OtherPages/ProfilePage/Profile";
import BookList from "./site/OtherPages/BookListPage/BookList";
import AboutUs from "./site/OtherPages/AboutUsPage/AboutUs";
import BookedItem from "./site/OtherPages/BookedPage/BookedItem";
import BookingTable from "./admin/components/Booking/BookingTable";
import OrderDashboard from "./admin/components/Orders/OrderDashboard";
import AddOrder from "./admin/components/Orders/AddOrder";
import EditOrder from "./admin/components/Orders/EditOrder";
import Payment from "./admin/components/Payment/Payment"


const AppRoutes = () => {
  return (
    <>
    <ReactToast/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/api/auth/confirm-account" element={<Confirmation/>} />
        <Route path="/product" element={<Item/>}/>
        <Route path="/product/:itemCode" element={<ItemDetails/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/booklist" element={<BookList/>}/>
        <Route path="/booklistItemss" element={<BookList/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/booked" element={<BookedItem/>}/>
        

          {/* For Public Route only */}
          <Route
              path="login"
              element={
                <Public>
                  <Login />
                </Public>
              }
            />
          </Route>
        
        {/* For Admin Routing Only */}
        <Route
          path="/admin"
          element={
            <IsAdmin>
              <AdminLayout />
            </IsAdmin>
          }
        >
          <Route path="nav" element={<Sidebar />} />
          <Route index element={<Dashboard />} />
          
          <Route path="user-dashboard" element={<UserDashboard />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="edit-user/:id" element={<EditUser />} />

          <Route path="item-dashboard" element={<ItemDashboard />} />
          <Route path="add-item" element={<AddItems />} />
          <Route path="edit-item/:itemCode" element={<UpdateItem />} />

          <Route path="inventory" element={<Inventory/>} />
          <Route path="inventory/:itemCode" element={<InventoryView/>}/>

          <Route path="booking" element={<BookingTable/>}/>

          <Route path="order-dashboard" element={<OrderDashboard />} />
          <Route path="add-order" element={<AddOrder />} />
          <Route path="edit-order/:orderId" element={<EditOrder />} />

          <Route path="payment" element={<Payment/>} />

       
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default AppRoutes;
