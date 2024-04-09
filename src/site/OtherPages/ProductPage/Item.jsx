import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Pagination } from "react-bootstrap";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { getPublicItems } from "../../../services/ItemInstance";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";
import NoSuchData from "../../../assets/NoItemFound.svg";

function Item({item}) {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState("all"); // Default to show all items
    const [selectedCategory, setSelectedCategory] = useState(queryParams.get("category") || "all"); // Default to show all categories
    const [selectedKarat, setSelectedKarat] = useState("all"); // Default to show all karats
    const [searchQuery, setSearchQuery] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {   
        // Check if userProfile exists in localStorage
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            setUserLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on component mount
    }, []);
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getPublicItems();
                if (response.data && response.data.success) {
                    setItems(response.data.response);
                } else {
                    console.error('Error fetching items:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        const getCurrentPrices = async () => {
            try {
                const response = await getCurrentMetalPrice();
                if (response.data.success) {
                    const { goldTola } = response.data.response;
                    setCurrentGoldPrice(goldTola);
                } else {
                    console.error('Error fetching current metal prices:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching current metal prices:', error);
            }
        };

        getCurrentPrices();
    }, []);

    const calculateTotalCost = (item) => {
        const { netWeight, manufactureCost, costOfStone, karat } = item;
        let goldPriceInt = 0;

    if (currentGoldPrice) {
        goldPriceInt = parseInt(currentGoldPrice.replace("Rs", ""));
    }

        // Adjust gold price based on the selected Karat
        if (karat === 24) {
            goldPriceInt *= 1;
        } else if (karat === 22) {
            goldPriceInt *= 0.916;
        } else if (karat === 18) {
            goldPriceInt *= 0.75;
        } else if (karat === 14) {
            goldPriceInt *= 0.58;
        }

        let totalCosts = (goldPriceInt * netWeight) + manufactureCost + costOfStone;
        totalCosts = Math.ceil(totalCosts);

        // Round up to the nearest 5 or 10
        if (totalCosts % 10 !== 0) {
            totalCosts = Math.ceil(totalCosts / 10) * 10;
        }
        return totalCosts;
    };

    // Filter items based on selected price range, category, and karat
   // Filter items based on selected price range, category, and karat
const filteredItems = useMemo(() => {
    const filteredData = items.filter(item => {
        const totalCost = calculateTotalCost(item);
        
        const itemKarat = selectedKarat === "all" ? true : item.karat === parseInt(selectedKarat);
        const itemPrice = selectedPriceRange === "all" ? true : (
            (selectedPriceRange === "1k to 50k" && totalCost >= 1000 && totalCost <= 49999) ||
            (selectedPriceRange === "50k to 100k" && totalCost >= 50000 && totalCost <= 99999) ||
            (selectedPriceRange === "100k to 200k" && totalCost >= 100000 && totalCost <= 199999) ||
            (selectedPriceRange === "200k to 500k" && totalCost >= 200000 && totalCost <= 499999) ||
            (selectedPriceRange === "500k plus" && totalCost >= 500000)
        );

        // Include selected category filtering logic
        const itemCategory = selectedCategory === "all" ? true : item.category === selectedCategory;

        return itemPrice && itemKarat && itemCategory; // Adjust the order if necessary
    });

    if (!searchQuery) return filteredData;

    return filteredData.filter((item) => {
        return (
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.karat.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
}, [items, selectedCategory, selectedKarat, selectedPriceRange, searchQuery]);


    const paginatedItems = useMemo(() => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    }, [filteredItems, activePage, itemsPerPage]);
    

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setActivePage(1);
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setActivePage(1); // Reset activePage when items per page changes
    };

    return (
        <div style={{ minHeight: "75vh" }}>
            <div style={{ width: "100%", minHeight: "1vh", backgroundColor: "#f9f9f9" }}>
                <div style={{ textAlign: "center", paddingTop: "5px", fontSize: "26px", fontWeight: "bolder" }}>Products</div>
            </div>

            <div className="d-flex justify-content-end" style={{ backgroundColor: "#f9f9f9", paddingBottom: "5px", paddingRight: "15px" }}>
                <div className="d-flex justify-content-start " style={{  marginRight: "670px"}}>
                    <span style={{ marginTop:"5px" }}><b style={{ color: "#62605A"}}>Items Per Page :</b></span>
                    <Dropdown className="ml-2" >
                        <Dropdown.Toggle variant="light" id="dropdown-basic" style={{marginLeft:"5px", width: "60px" }}>
                            {itemsPerPage}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(4)}>4</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(8)}>8</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(12)}>12</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(16)}>16</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="searchbar mb-2 w-25" style={{left:"17%"}}>
                    <label className="d-flex">
                        <input type="text" style={{backgroundColor:"#ebebeb"}} placeholder="Search item name here ..." value={searchQuery} onChange={handleSearchInputChange} />
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                    </div>
                </div>

               

                <div style={{ paddingTop: "5px" }}> Category :</div>
                <div>
                    <div className="col-sm-12 d-flex justify-content-center align-items-center">
                    <select className="form-control" style={{ backgroundColor: "#ebebeb", marginLeft: "4px" }} name="category" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="all">All</option>
                        <option value="Ring">Ring</option>
                        <option value="Necklace">Necklace</option>
                        <option value="Ear Ring">Ear Ring</option>
                        <option value="Pendant">Pendant</option>
                        <option value="JewelSet">Jewel Set</option>
                        <option value="Diamonds">Diamonds</option>
                        <option value="Bangles">Bangles</option>
                        <option value="Others">Others</option>
                    </select>

                    </div>
                </div>

                <div style={{ paddingLeft: "20px", paddingRight: "20px" }}></div>

                <div style={{ paddingTop: "5px" }}> Karat :</div>
                <div>
                    <div className="col-sm-12 d-flex justify-content-center align-items-center">
                        <select className="form-control" style={{ backgroundColor: "#ebebeb", marginLeft: "4px" }} name="category" onChange={(e) => setSelectedKarat(e.target.value)}>
                            <option value="all">All</option>
                            <option value="24">24k</option>
                            <option value="22">22k</option>
                            <option value="18">18k</option>
                            <option value="14">14k</option>
                        </select>
                    </div>
                </div>

                <div style={{ paddingLeft: "20px", paddingRight: "20px" }}></div>

                <div style={{ paddingTop: "5px" }}> Price :</div>
                <div>
                    <div className="col-sm-12 d-flex justify-content-center align-items-center">
                        <select className="form-control" style={{ backgroundColor: "#ebebeb", marginLeft: "4px" }} name="priceRange" onChange={(e) => setSelectedPriceRange(e.target.value)}>
                            <option value="all">All</option>
                            <option value="1k to 50k">1k to 50k</option>
                            <option value="50k to 100k">50k to 100k</option>
                            <option value="100k to 200k">100k to 200k</option>
                            <option value="200k to 500k">200k to 500k</option>
                            <option value="500k plus">500k plus</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {paginatedItems.length > 0 ? (
                    paginatedItems.map((item, index) => (
                    <div key={index} className="col">
                        <div style={{ marginRight: "5px", marginLeft: "1px", right: "10px" }}>
                            <Card style={{ width: "18rem", minHeight: "62vh", backgroundColor: "#f9f9f9" }}>
                                <img alt={item.itemName} src={item.itemImageUrl} style={{ width: "270px", height: "320px", left: "10px", marginLeft: "10px", marginTop: "10px" }} />
                                <CardBody>
                                    <CardTitle tag="h5" style={{ fontSize: "bolder" }}>{item.itemName}</CardTitle>
                                    <CardText> <b>Price</b>: {currentGoldPrice ? `Nrs ${calculateTotalCost(item).toLocaleString()}` : 'Price Loading...'}</CardText>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    
                                    {userLoggedIn ? (
                                        <>
                                        <Link to={`/product/${item.itemCode}` }>
                                            <Button style={{ background: "#2192FF", fontSize: "0.875rem", height: "40px", width: "120px" }}>Quick Details</Button>
                                        </Link>
                                        <Link to="#">
                                            <Button style={{ background: "#03C988", fontSize: "0.875rem", height: "40px", width: "120px" }}>Book Item</Button>
                                        </Link>
                                        </>
                                    ) : (
                                        <Link to={`/product/${item.itemCode}` }>
                                        <Button style={{ background: "#2192FF", fontSize: "0.875rem", height: "40px", width: "250px" }}>View Details</Button>
                                    </Link>
                                )}
                                    </div>
                                </CardBody>
                            </Card>
                            
                        </div>
                        
                    </div>
                    
                ))
            ) : (
                // Display "No items found" message
                <div className="col text-center w-100 " style={{ marginTop: "100px" }}>
                    <img src={NoSuchData} alt="svg" />
                    <p className="text-center" style={{fontSize:"36px"}}>No items found</p>
                </div>
                )}
            </div>
            <div className="d-flex flex-column align-items-center"> 
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
    );
}

export default Item;
