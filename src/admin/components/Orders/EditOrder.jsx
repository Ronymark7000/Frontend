import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddOrder from "./AddOrder";
import axiosInstance from "../../../../axiosInstance";

function EditOrder(){
        const navigate = useNavigate();

        const { orderId } = useParams();

        const [order, setOrder] = useState(null);

        const getOrder = async () => {
        const response = await axiosInstance
            .get(`/admin/order/${orderId}`)
            .then((res) => res?.data)
            .catch(() => null);

        if (!response) {
            navigate("/admin/order-dashboard");
        } else {

            setOrder(response?.response);
        }
        };

        useEffect(() => {
        if (orderId) {
            getOrder();
        } else {
            navigate("/admin/order-dashboard");
        }
        }, [orderId]);
        if (order) 
        
        return <AddOrder editOrder={order} />;
        
}

export default EditOrder;



