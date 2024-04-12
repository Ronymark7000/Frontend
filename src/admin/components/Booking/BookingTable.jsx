import BookingStatus from "./BookingStatus";
import axiosInstance from "../../../../axiosInstance";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { Dropdown, Pagination } from "react-bootstrap";
import "./Booking.css"

function BookingTable(){

    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [activePage, setActivePage] = useState(1); // State for active page
    const [itemsPerPage, setItemsPerPage] = useState(4); // State for items per page
    const [booking, setBooking] = useState([]); // State for booking data
  
    useEffect(() => {
      const fetchBooking = async () => {
        try {
          const response = await axiosInstance.get('/admin/booked-items');
          setBooking(response?.data?.response);
        } catch (error) {
          console.error("Error fetching booking:", error);
        }
      };
      fetchBooking();
    }, []);
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
      setActivePage(1); // Reset activePage when search query changes
    };
  
    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
    };
  
    const handleItemsPerPageChange = (items) => {
      setItemsPerPage(items);
      setActivePage(1); // Reset activePage when items per page changes
    };
  
    const filteredData = useMemo(() => {
        if (!booking) return [];
        if (!searchQuery) return booking;
    
        const filterByQuery = (data) => {
          // Check if the data is an object
          if (typeof data === 'object' && data !== null) {
            // Iterate over all properties of the object
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                const value = data[key];
                // Recursively call filterByQuery for nested objects
                if (typeof value === 'object') {
                  if (filterByQuery(value)) {
                    return true; // Return true if any nested property matches the query
                  }
                } else {
                  // Convert value and search query to lowercase for case-insensitive comparison
                  const lowercaseValue = value.toString().toLowerCase();
                  const lowercaseQuery = searchQuery.toLowerCase();
                  // Check if the value includes the search query
                  if (lowercaseValue.includes(lowercaseQuery)) {
                    return true; // Return true if any property matches the query
                  }
                }
              }
            }
          }
          return false; // Return false if no property matches the query
        };
    
        return booking.filter((bookingItem) => filterByQuery(bookingItem));
      }, [booking, searchQuery]);
    
  
    const paginatedData = useMemo(() => {
      const startIndex = (activePage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredData.slice(startIndex, endIndex);
    }, [filteredData, activePage, itemsPerPage]);
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return(
        <>
        <div className="mt-5 d-flex flex-column">
            <div className="mt-3 d-flex align-items-center w-50" style={{ paddingLeft: "28px" }}>
                <span><b style={{ color: "#62605A" }}>No of Records:</b></span>
                <Dropdown className="ml-2" >
                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ marginLeft: "10px", width: "60px" }}>
                    {itemsPerPage}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(4)}>4</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(8)}>8</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(15)}>15</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="searchbar mt-3 mb-2">
                <label className="d-flex align-items-center">
                    <input type="text" placeholder="Filter search here ..." value={searchQuery} onChange={handleSearchInputChange} />
                    <ion-icon name="search-outline"></ion-icon>
                </label>
            </div>

        <div className="d-flex flex-column align-items-center">
          <div className="mt-4">
            <table className="table table-rounded table-hover h-100 table-light">
              <thead>
                <tr>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>B.ID</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Item Image</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Item Code</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Item Name</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Username</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Contact</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Status</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Booked Date</th>
                    <th style={{color:"#62605A", backgroundColor:"#E0DBD3"}}>Action</th>
                    </tr>
              </thead>
              <tbody>
                {paginatedData.map((bookingItem, idx) => (
                  <BookingStatus key={idx} booking={bookingItem} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item key={page + 1} active={page + 1 === activePage} onClick={() => handlePageChange(page + 1)}>
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingTable;