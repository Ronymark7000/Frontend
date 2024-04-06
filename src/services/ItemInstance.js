import axiosInstance from "../../axiosInstance";
import { emitInfoToast } from "../site/components/Toast/EmitToast";

export const getItems = async () => {
    return axiosInstance.get('/items');
};

export const getItemCode = async () => {
    return axiosInstance.get('/item/${itemCode}' , itemCode);
};


