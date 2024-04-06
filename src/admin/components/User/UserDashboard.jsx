import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import DataTable from "../DataTable";
import { getUsers } from "../../../services/UserInstance";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import { emitInfoToast } from "../../../site/components/Toast/EmitToast";
import "./User.css"
import { Pagination, Dropdown, Button } from "react-bootstrap";
import Popup from "../../../site/components/Popup/Popup"
import AddUser from "./AddUser";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activePage, setActivePage] = useState(1); // State for active page
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
  const [openPopup, setOpenPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if editing or adding

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["UserInstance"],
    queryFn: () => getUsers(),
  });

  const handleDataChange = () => {
    refetch();
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data?.data?.response ?? [];

    // Filter data based on searchQuery
    return data?.data?.response.filter((user) => {
    // Convert the boolean value of enabled to string "Enabled" or "Disabled"
    const accStatus = user.enabled ? "Enabled" : "Disabled";

    // Check if any value contains the search query or if the account status matches the search query
    const containsQuery = Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    ) || accStatus.toLowerCase().includes(searchQuery.toLowerCase());

        return containsQuery;
      });
    }, [data, searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
  };

  const paginatedData = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, activePage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },

      {
        accessorKey: "firstname",
        header: "First Name",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },

      {
        accessorKey: "lastname",
        header: "Last Name",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },

      {
        accessorKey: "email",
        header: "User Email",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },

      {
        accessorKey: "contact",
        header: "Contact Number",
        cell: ({ getValue }) => {
          return <div>{getValue()}</div>;
        },
      },
   
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => {
          const isAvailable = getValue();
          return <div>{String(isAvailable)}</div>;
        },
      },

      {
        accessorKey: "enabled",
        header: "Acc Status",
        cell: ({ getValue }) => {
          const isEnabled = getValue();
          return <div>{isEnabled ? "Enabled" : "Disabled"}</div>;
        },
      },

      {
        accessorKey: "actions",
        header: "Edit User",
        cell: ({ row }) => {
          const userId = row.original.userId;

          const handleEdit = () => {
            const user = row.original;
              if (user) {
                setCurrentUser(user);
                setIsEditing(true);
                setOpenPopup(true);
              } else {
                console.log("User not found");
              }
            // setCurrentUser(row.original)
            // setOpenPopup(true)
            // console.log("Edit clicked for ID:", userId);
            // navigate(`/admin/edit-user/${userId}`);
          };

          return (
            <div>
              <button
                className="btn2 btn-primary"
                style={{ background: "#36c971" }}
                onClick={() => handleEdit(userId)}
              >
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
            </div>
          );
        },
      },

      {
        accessorKey: "actions",
        header: "Delete User",
        cell: ({ row }) => {
          const userId = row.original.userId;

          const handleDelete = () => {
            console.log("Delete clicked for ID:", userId);
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this user?"
            );
            if (confirmDelete) {
              axiosInstance
                .delete(`/user/${userId}`)
                .then(() => {
                  refetch();
                  console.log("Delete successful for ID:", userId);
                  // window.confirm("Deleted Successfully....");
                  window.alert("Successfully deleted");
                  emitInfoToast("User Deleted Successfully")
                })
                .catch((error) => {
                  console.error("Error deleting user:", error);
                  window.alert("Could not delete the data");
                });
            }
          }

          return (
            <div>
              <button
                className="btn2 btn-danger"
                style={{ background: "#fa5768" }}
                onClick={() => handleDelete(userId)}
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
    return <div>Loading...Please Wait</div>;
  }

  return (
    <>
      <div className="mt-5 d-flex flex-column">
        <div className="mt-3 d-flex align-items-center w-50" style={{paddingLeft:"28px"}}>
          <span><b style={{color:"#62605A"}}>No of Records:</b></span>
          <Dropdown className="ml-2" >
            <Dropdown.Toggle variant="light" id="dropdown-basic" style={{marginLeft:"10px", width:"60px"}}>
              {itemsPerPage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(15)}>15</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          

            <div style={{marginLeft:"20px"}}>
              {/* <Link to={"/admin/add-user"}> */}
              <Button color="primary m-2 w-100" onClick={() => { setOpenPopup(true); setIsEditing(false); }} >Add User </Button>
              {/* </Link> */}
              
            </div>
        </div>

        

        <div className="searchbar mt-3 mb-2">
          <label className= "d-flex align-items-center">
            <input type="text" placeholder="Filter search here ..." value={searchQuery} onChange={handleSearchInputChange}/>
            <ion-icon name="search-outline"></ion-icon> 
          </label>  
        </div>
        </div>

        <div className="d-flex flex-column align-items-center">
        <div className="mt-1">
          <DataTable style={{color: "#62605A"}} columns={columns} data={paginatedData} />
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

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
              <AddUser handleClosePopup={handleClosePopup} currentUser={currentUser} isEditing={isEditing} onDataChange={handleDataChange}/>
      </Popup>
    </>
  );
};

export default UserDashboard;