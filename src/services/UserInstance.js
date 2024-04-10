import axiosInstance from "../../axiosInstance";
import { emitInfoToast } from "../site/components/Toast/EmitToast";
import { getAllFromBooklist } from "./BooklistInstance";

export const getUsers = async () => {
    return axiosInstance.get(`/admin/users`);
  };

export const getProfile = async () => {
    await axiosInstance
    .get("/profile")
    .then((res) => {const response= res?.data 
        if (response?.success){
            console.log("first profile")
            localStorage.setItem("userProfile", JSON.stringify(response?.response ?? []));
        }
    })
    .catch(() => null);
}; 

export const handleLogout = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("bookList");
    Cookies.remove("token"); 
    emitInfoToast("You have been logged out successfully.");
    // localStorage.removeItem("cart");
  };