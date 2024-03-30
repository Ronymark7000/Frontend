import axiosInstance from "../../axiosInstance";

export const getCurrentMetalPrice = async () => {
    return axiosInstance.get(`/store/currentMetalPrice`);
  };

export const getAllMetalPrice = async () => {
    return axiosInstance.get(`/store/metal-prices`);
  };



