import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import { useState } from "react";
import AddItem from "./AddItems";

function EditItem(){
    const navigate = useNavigate(); 
    const { itemCode } = useParams();
    const [item, setItem] = useState(null);

    const getItem = async () => {
        const response = await axiosInstance
          .get(`/item/${itemCode}`)
          .then((res) => res?.data)
          .catch(() => null);
    
        if (!response) {
          navigate("/admin/item-dashboard");
        } else {
          setItem(response?.response);
        }
      };

      useEffect(() => {
        if (itemCode) {
          getItem();
        } else {
          navigate("/admin/item-dashboard");
        }
      }, [itemCode]);
      if (item) return <AddItem editItem={item} />;
    }

   export default EditItem;