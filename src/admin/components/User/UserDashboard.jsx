import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import DataTable from "../DataTable";
import { getUsers } from "../../../services/UserInstance";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import { emitInfoToast } from "../../../site/components/Toast/EmitToast";
import "./User.css"
import { Pagination, Dropdown } from "react-bootstrap";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activePage, setActivePage] = useState(1); // State for active page
  const [itemsPerPage, setItemsPerPage] = useState(1); // State for items per page

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["UserInstance"],
    queryFn: () => getUsers(),
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data?.data?.response ?? [];

  // Filter data based on searchQuery
  return data?.data?.response.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
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
        accessorKey: "actions",
        header: "Edit User",
        cell: ({ row }) => {
          const userId = row.original.userId;

          const handleEdit = () => {
            // console.log("Edit clicked for ID:", userId);
            navigate(`/admin/edit-user/${userId}`);
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
        <div className="searchbar mt-3 mb-2">
          <label className= "d-flex align-items-center">
            <input type="text" placeholder="Search here..." value={searchQuery} onChange={handleSearchInputChange}/>
            <ion-icon name="search-outline"></ion-icon> 
          </label>  
        </div>
        <div className="mt-5">
          <DataTable style={{color: "#62605A"}} columns={columns} data={paginatedData} />
        </div>

        <div className="mt-3 d-flex align-items-center">
          <span>Show items per page:</span>
          <Dropdown className="ml-2">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {itemsPerPage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(1)}>1</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(2)}>2</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(3)}>3</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(4)}>4</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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

export default UserDashboard;