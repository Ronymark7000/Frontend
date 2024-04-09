import axiosInstance from "../../axiosInstance";

export const getItems = async () => {
    return axiosInstance.get('/items');
};

export const getPublicItems = async () => {
    return axiosInstance.get('/store/items')
}

export const getPublicItemCode = async () => {
    return axiosInstance.get('/store/item/${itemCode}');
};


