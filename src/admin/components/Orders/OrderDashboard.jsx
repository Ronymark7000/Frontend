import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import DataTable from "../DataTable";
import { getAllOrders } from "../../../services/OrderInstance";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import { Pagination, Dropdown } from "react-bootstrap";
import "../User/User.css";

const OrderDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activePage, setActivePage] = useState(1); // State for active page
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["OrderInstance"],
    queryFn: () => getAllOrders(),
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data?.data?.response ?? [];

    // Filter data based on searchQuery
    return data?.data?.response.filter((order) => {
      // Check if any value contains the search query
      return Object.values(order).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, activePage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "orderDate",
        header: "Odr-Date",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },

      {
        accessorKey: "contact",
        header: "Contact",
        cell: ({ getValue }) => {
            return <div>{getValue()}</div>;
          },
      },

      {
        accessorKey: "orderName",
        header: "Order",
        cell: ({ getValue }) => {
            return <div>{getValue()}</div>;
          },
      },


      {
        accessorKey: "estimatedWeight",
        header: "Estm wt",
        cell: ({ getValue }) => {
          const estimatedWeight = getValue();
          return <div>{estimatedWeight.toFixed(2)} t</div>;
        },
      },

      {
        accessorKey: "advancePayment",
        header: "Advance Pay",
        cell: ({ getValue }) => {
          // Assuming advance payment is in Nepalese Rupees (Nrs)
          const advancePayment = getValue();
          const formattedAdvancePayment = new Intl.NumberFormat("en-NP", {
            style: "currency",
            currency: "NPR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(advancePayment);
          return <div>{formattedAdvancePayment}</div>;
        },
      },


      {
        accessorKey: "orderStatus",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          return <div>{status ? "Complete" : "Pending"}</div>;
        },
      },

      {
        accessorKey: "actions",
        header: "Edit User",
        cell: ({ row }) => {
          const orderId = row.original.orderId;

          const handleEdit = () => {
            navigate(`/admin/edit-order/${orderId}`);
          };

          return (
            <div>
              <button
                className="btn2 btn-primary"
                style={{ background: "#36c971" }}
                onClick={() => handleEdit(orderId)}
              >
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
            </div>
          );
        },
      },

      {
        accessorKey: "actions",
        header: "Delete Order",
        cell: ({ row }) => {
          const orderId = row.original.orderId;

          const handleDelete = () => {
            console.log("Delete clicked for ID:", orderId);
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this order?"
            );
            if (confirmDelete) {
              axiosInstance
                .delete(`/admin/order/${orderId}`)
                .then(() => {
                  refetch();
                  console.log("Delete successful for ID:", orderId);
                  window.alert("Successfully deleted");
                })
                .catch((error) => {
                  console.error("Error deleting order:", error);
                  window.alert("Could not delete the order");
                });
            }
          }

          return (
            <div>
              <button
                className="btn2 btn-danger"
                style={{ background: "#fa5768" }}
                onClick={() => handleDelete(orderId)}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          );
        },
      },

     
      
    ];
}, [navigate, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-5 d-flex flex-column">
        <div className="mt-3 d-flex align-items-center w-50" style={{ paddingLeft: "28px" }}>
          <span>
            <b style={{ color: "#62605A" }}>No of Records:</b>
          </span>
          <Dropdown className="ml-2">
            <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ marginLeft: "10px", width: "60px" }}>
              {itemsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(15)}>15</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="searchbar mt-3 mb-2">
          <label className="d-flex align-items-center">
            <input type="text" placeholder="Filter search here ..." value={searchQuery} onChange={handleSearchInputChange} />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center">
        <div className="mt-1">
          <DataTable style={{ color: "#62605A" }} columns={columns} data={paginatedData} />
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
    </>
  );
};

export default OrderDashboard;
