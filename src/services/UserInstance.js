import axiosInstance from "../../axiosInstance";

export const getUsers = async () => {
    return axiosInstance.get(`/admin/users`);
  };

export const getProfile = async () => {
    await axiosInstance
    .get("/profile")
    .then((res) => {const response= res?.data 
        if (response?.success){
            localStorage.setItem("userProfile", JSON.stringify(response?.response ?? []));
        }
    })
    .catch(() => null);

}; 

export const handleLogout = () => {
    localStorage.removeItem("userProfile");
    Cookies.remove("token"); 
    // localStorage.removeItem("cart");
  };