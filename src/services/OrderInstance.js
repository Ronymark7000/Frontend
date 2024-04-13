import axiosInstance from "../../axiosInstance";

export const getAllOrders = async () => {
    return axiosInstance.get('/admin/order');
};



