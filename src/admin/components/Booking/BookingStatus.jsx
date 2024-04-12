import { useState } from "react";
import axiosInstance from "../../../../axiosInstance";
import { emitInfoToast, emitWarnToast } from "../../../site/components/Toast/EmitToast";

function BookingStatus({booking}){
    const [status, setStatus] = useState("");
    //api
    const updateHandler = async (bookedItemId, status) => {
      const response = await axiosInstance.put( `/admin/booked-items/${bookedItemId}`,status);
      if (response.status === 200) {
        emitInfoToast("Updated Successfully")
      } else {
        // console.error("Error updating booking status:", response);
        emitWarnToast("Failed to Update")
      }
    }; 

    return(
        <>
            <tr>
            <td style={{maxHeight:"20px"}}>{booking?.bookedItemId}</td>
                <td style={{maxHeight:"20px"}}>
                     <img
                        src= {booking?.item?.itemImageUrl}        
                        alt="Item"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                    </td>
                <td style={{maxHeight:"20px"}}>{booking?.item?.itemCode}</td>
                <td style={{maxHeight:"20px"}}>{booking?.item?.itemName}</td>
                <td style={{maxHeight:"20px"}}>{booking?.user?.firstname} {booking?.user?.lastname}</td>
                <td style={{maxHeight:"20px"}}>{booking?.user?.contact}</td>
                <td style={{maxHeight:"20px"}}>
                    {
                    <select
                        value={status || booking?.status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            padding: "5px",
                            fontSize: "14px",
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            backgroundColor: "white",
                          }}
                    >
                        <option value="Booking Pending">Pending</option>
                        <option value="Booking Expired">Expired</option>
                    </select>
                    }
                </td>
                <td style={{maxHeight:"20px"}}>{booking?.bookedDate}</td>
                <td className="" style={{maxHeight:"20px"}}>
                    <button  
                   
                    style={{ background: "#36c971", width:"60px" }}
                    onClick={() => updateHandler(booking?.bookedItemId, status)}
                    type="button"
                    className="btn btn-success"
                    >
                     <ion-icon name="checkmark"></ion-icon>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default BookingStatus;