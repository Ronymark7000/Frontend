import { Button, Dropdown, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../../services/ItemInstance";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../axiosInstance";
import DataTable from "../DataTable";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";

const ItemDashboard = () => {
    const navigate = useNavigate();
   
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [activePage, setActivePage] = useState(1); // State for active page
    const [itemsPerPage, setItemsPerPage] = useState(4); // State for items per page
  
    const [currentGoldPrice, setCurrentGoldPrice] = useState(null);
    const { data: itemData, isLoading: itemLoading, refetch: itemRefetch } = useQuery({
        queryKey: ["ItemInstance"],
        queryFn: () => getItems(),
    });

    useEffect(() => {
        const getCurrentPrices = async () => {
            try {
                // Fetch current metal prices from your API
                const response = await getCurrentMetalPrice();
                
                // Check if the response was successful
                if (response.data.success) {
                    // Extract gold price (goldTola) from the response
                    const { goldTola } = response.data.response;
                    
                    // Update state with the current gold price
                    setCurrentGoldPrice(goldTola);
                } else {
                    // Handle API error if needed
                    console.error('Error fetching current metal prices:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching current metal prices:', error);
            }
        };

        getCurrentPrices();
    }, []);

    const filteredData = useMemo(() => {
        if (!itemData) return [];
        if (!searchQuery) return itemData?.data?.response ?? [];

        // Filter data based on searchQuery
        return itemData?.data?.response.filter((item) => {
            // Logic to filter based on searchQuery
            return (
                item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.karat.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [itemData, searchQuery]);

    const paginatedData = useMemo(() => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, activePage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setActivePage(1); // Reset activePage when search query changes
    };

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    // Function to handle items per page change
    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setActivePage(1); // Reset activePage when items per page changes
    };

    // Define columns for DataTable
    const columns = useMemo(() => {
        return [
          {
            accessorKey: "itemCode",
            header: "Code",
            cell: ({ getValue }) => {
              return <div>{getValue()}</div>;
            },
          },
          {
            accessorKey: "itemName",
            header: "Item Name",
            cell: ({ getValue }) => {
              return <div>{getValue()}</div>;
            },
          },
          {
            accessorKey: "material",
            header: "Material",
            cell: ({ getValue }) => {
              return <div>{getValue()}</div>;
            },
          },
          {
            accessorKey: "karat",
            header: "Karat",
            cell: ({ getValue }) => {
              return <div>{getValue()}k</div>;
            },
          },
          {
            accessorKey: "grossWeight",
            header: "Grs.Wt",
            cell: ({ getValue }) => {
              return <div>{getValue()}</div>;
            },
          },
          {
            accessorKey: "wastage",
            header: "Wst.",
            cell: ({ getValue }) => {
              return <div>{getValue()}%</div>;
            },
          },
          {
            accessorKey: "netWeight",
            header: "Net.Wt",
            cell: ({ getValue }) => {
              return <div>{getValue()} </div>;
            },
          },
          {
            accessorKey: "costOfStone",
            header: "Stn.Cost",
            cell: ({ getValue }) => {
              return <div>Rs {getValue()}</div>;
            },
          },
          {
            accessorKey: "manufactureCost",
            header: "Mfg. Cost",
            cell: ({ getValue }) => {
              return <div>Rs {getValue()}</div>;
            },
          },
          {
            accessorKey: "itemImageUrl",
            header: <div style={{ marginLeft: "30px" }}>Image</div>,
            cell: ({ getValue }) => {
                const [imageUrl, setImageUrl] = useState(null);
        
                useEffect(() => {
                    const fetchImageUrl = async () => {
                        try {
                            const imageUrl = await getValue(); // Assuming getValue() fetches the image URL asynchronously
                            setImageUrl(imageUrl);
                        } catch (error) {
                            console.error('Error fetching image URL:', error);
                        }
                    };
        
                    fetchImageUrl();
                }, [getValue]);

                console.log(imageUrl)
        
                return (
                    <div>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                // src={`http://localhost:8081/${imageUrl}`}
                                // src= `http://localhost8081/static/${imageUrl}`
                                alt="Item"
                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                            />
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "totalCosts",
            header: "Total Cost",
            cell: ({ row }) => {
                const netWeight = row?.original?.netWeight;
                const manufactureCost = row?.original?.manufactureCost || 0; // Default to 0 if manufactureCost is not provided
                const stoneCost = row?.original?.costOfStone || 0; // Default to 0 if stoneCost is not provided
                const karat = row?.original?.karat; // Get the selected Karat

                let goldPriceInt = parseInt(currentGoldPrice.replace("Rs", ""));
                
                // Adjust gold price based on the selected Karat
                if (karat === 24) {
                    goldPriceInt = goldPriceInt * 1;
                } else if (karat === 22) {
                    goldPriceInt = goldPriceInt * 0.916;
                } else if (karat === 18) {
                    goldPriceInt = goldPriceInt * 0.75;
                } else if (karat === 14) {
                    goldPriceInt = goldPriceInt * 0.58;
                }

                let totalCosts = (goldPriceInt * netWeight) + manufactureCost + stoneCost; 
                totalCosts = Math.ceil(totalCosts); // Round up the total cost

                // Round up to the nearest 5 or 10
                if (totalCosts % 10 !== 0) {
                    totalCosts = Math.ceil(totalCosts / 10) * 10;
                }

                return <div>Rs {totalCosts}</div>; 
            },
        },
        {
            accessorKey: "actions",
            header: "Delete Item",
            cell: ({ row }) => {
              const itemCode = row.original.itemCode;
              const itemName = row.original.itemName;

              const handleDelete = () => {
                console.log("Delete clicked for ID:", itemCode, itemName);
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this item?"
                );
                if (confirmDelete) {
                  axiosInstance
                    .delete(`/item/${itemCode}`)
                    .then(() => {
                      itemRefetch();
                      console.log("Delete successful for Item:", itemCode);
                      window.alert("Successfully deleted");
                    })
                    .catch((error) => {
                      console.error("Error deleting item:", error);
                      window.alert("Could not delete the data");
                    });
                }
              }
    
              return (
                <div>
                  <button
                    className="btn2 btn-danger"
                    style={{ background: "#fa5768" }}
                    onClick={() => handleDelete(itemCode)}
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              );
            },
          },
        ];
      }, [navigate, currentGoldPrice, itemRefetch]);

    // Render loading state while fetching data
    if (itemLoading || currentGoldPrice === null) {
        return <div>Loading...</div>;
    }

    // Render DataTable with filtered and paginated data
    return (
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
            </div>
        </>
    );
};

export default ItemDashboard;
