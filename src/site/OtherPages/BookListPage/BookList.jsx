import { Link } from "react-router-dom";
import BookListItem from "./BookListItem";
import { deleteItemFromBooklist } from "../../../services/BooklistInstance";
import { useState, useEffect } from "react";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";
import axiosInstance from "../../../../axiosInstance";

function BookList() {
    const booklist = localStorage.getItem("bookList");
    const [booklistData, setBooklistData] = useState(JSON.parse(booklist || "[]"));
    const [totalPrice, setTotalPrice] = useState(0);
    const [priceDate, setPriceDate] = useState(null);
    const [selectedDays, setSelectedDays] = useState("");

    const handleDaysChange = (event) => {
      setSelectedDays(event.target.value);
    };

    useEffect(() => {
      // Fetch current metal pricen
      const fetchCurrentMetalPrice = async () => {
        try {
          const response = await getCurrentMetalPrice();
          if (response?.data.success) {
            const currentGoldPrice = response.data.response.goldTola;
            const currentPriceDate = response.data.response.priceDate;
            setPriceDate(formatDate(currentPriceDate));
            // Calculate total price when the metal price is fetched
            const total = booklistData.reduce((acc, item) => {
              return acc + calculateTotalCost(item, currentGoldPrice);
            }, 0);
            setTotalPrice(total);
          } else {
            console.error("Failed to fetch current metal price:", response?.data.message);
          }
        } catch (error) {
          console.error("Error fetching current metal price:", error);
        }
      };
  
      fetchCurrentMetalPrice();
    }, [booklistData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        let daySuffix = 'th';
        if (day === 1 || day === 21 || day === 31) {
            daySuffix = 'st';
        } else if (day === 2 || day === 22) {
            daySuffix = 'nd';
        } else if (day === 3 || day === 23) {
            daySuffix = 'rd';
        }
        return `${day}${daySuffix} ${month}, ${year}`;
    };

    const calculateTotalCost = (item, currentGoldPrice) => {
        if (!item?.item) {
          return 0;
        }
        const { netWeight, manufactureCost, costOfStone, karat } = item.item;
        // Calculate total cost based on item details and current gold price
        // Example calculation:
        let goldPriceInt = parseInt(currentGoldPrice.replace(/\D/g, ""));
        if (karat === 24) {
            goldPriceInt *= 1;
        } else if (karat === 22) {
            goldPriceInt *= 0.916;
        } else if (karat === 18) {
            goldPriceInt *= 0.75;
        } else if (karat === 14) {
            goldPriceInt *= 0.58;
        }
        let totalCost = goldPriceInt * netWeight + manufactureCost + costOfStone;
        totalCost = Math.ceil(totalCost);
        if (totalCost % 10 !== 0) {
          totalCost = Math.ceil(totalCost / 10) * 10;
        }
        return totalCost;
      };

    const handleDelete = async (bookListId) => {
        console.log(booklist.bookListId)
        try {
          const response = await deleteItemFromBooklist(bookListId);
          if (response?.success) {
            const updatedBooklistData = booklistData.filter(item => item?.bookListId !== bookListId);
            setBooklistData(updatedBooklistData);
            alert("Item Deleted");
            window.location.reload();
          } else {
            alert("Unable to Remove Item");
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          alert("An error occurred while deleting the item");
        }
      };

      const addBookedItems = async () => {
        const requestData = {
          noOfDays: selectedDays, // Use the selectedDays state
          // Include any other necessary data in the request body
        };
      
        try {
          const response = await axiosInstance.post(`/booked-items`, requestData);
          if (response?.data?.success) {
            setBooklistData([]);
            localStorage.removeItem("bookList");
            window.alert("Successfully Placed Your Booking Order");
          } else {
            window.alert("Booking Order failed");
          }
        } catch (error) {
          console.error("Error confirming booking:", error);
          window.alert("An error occurred while confirming the booking");
        }
      };
      

      const totalCost = totalPrice;
      const numberOfItems = booklistData.length;
      
  return (
    <>
    <div style={{minHeight:"100vh", paddingTop:"15px"}}>
      <section
      
      >
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px", minHeight: "90vh" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0" style={{width:"1250px"}}>
                  <div className="col-lg-8">
                    <div className="p-5" >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold mb-0" style={{color:"#434343"}}>BookList Items</h2>
                            <h6 className="mb-0 text-muted">No of items: {numberOfItems}</h6>
                        </div>

                        <hr className="my-4" />

                        <div style={{ minHeight: "40vh", maxHeight:"51vh", overflowY: "auto" }}>
                        {booklistData.map((booklist, index) => (
                            <BookListItem  
                                key={index}
                                booklist={booklist}
                                handleDelete={handleDelete}
                           />
                        ))}
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-3"  style={{color:"#434343"}}>
                            <h5 className="text-uppercase">Total price</h5>
                            <h5>Nrs. {totalCost.toLocaleString()}</h5>
                        </div>

                        <Link to={`/` }>
                            <button type="button" className="btn btn-dark" data-mdb-ripple-color="dark">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="col-md-4 p-5"
                      style={{
                        minHeight: "90vh",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        background:
                          "linear-gradient(45deg, #808080, #ededed, #c7c7c7, #a3a3a3, #a3a3a3, #c7c7c7, #808080)",
                      }}
                >
                    <h3 className="fw-bold mb-3 mt-2 pt-1 text-center" style={{color:"#434343"}}>
                        Summary
                    </h3>
                    
                    <hr className="my-4" />

                   

                      <h5 className="text mb-3"  style={{color:"#434343"}}>
                        No. of Booking Days
                      </h5>

                      <div className="mb-4 pb-2">
                        <div className="input-group mb-3">
                          <label className="input-group-text">No. of Days</label>
                          <select
                            className="form-select w-25"
                            value={selectedDays} // Bind selected value to state
                            onChange={handleDaysChange} // Handle change event
                          >
                            <option value="7" selected disabled>
                              7 Days 
                            </option>
                          </select>
                        </div>
                      </div>

                      <p style={{width:"320px"}}><b>Note:</b> The total price of your Booklist only applies to the rate of {priceDate}</p>
                      <br/>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5" style={{color:"#434343"}}>
                        <h5 className="text">Total price</h5>
                        <h5>Nrs {totalCost.toLocaleString()}</h5>
                      </div>

                      <div className="d-grid gap-2 col-6 mx-auto">
                        <button
                          className="btn btn-dark btn-block w-100"
                          type="button"
                          onClick={addBookedItems}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default BookList;
