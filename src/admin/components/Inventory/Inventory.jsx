import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { getPublicItems } from "../../../services/ItemInstance";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";
import NoSuchData from "../../../assets/NoItemFound.svg";

const Inventory = ({item}) => {
    const [items, setItems] = useState([]);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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
        let goldPriceInt = parseInt(currentGoldPrice.replace("Rs", ""));

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

    const filteredItems = useMemo(() => {
        const filteredData = items.filter(item => {
            // Filter by search query
            const matchesSearch = (
                item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.karat.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                calculateTotalCost(item).toString().toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Filter by availability
            return matchesSearch && item.available === true;
        });

        return filteredData;
    }, [items, searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
             <div className="searchbar mt-3 mb-2">
                <label className="d-flex align-items-center">
                   <input type="text" placeholder="Filter search here ..." value={searchQuery} onChange={handleSearchInputChange} />
                   <ion-icon name="search-outline"></ion-icon>
                </label>
            </div>
                   
            <div style={{marginLeft:"280px", minWidth:"1130px"}}>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4" style={{ paddingTop: "60px" }}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <div key={index} className="col">
                            <div style={{ display: "flex", justifyContent: "center"}}>
                            <Card style={{ width: "250px", height: "380px", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
                                <img alt={item.itemName} src={item.itemImageUrl} style={{ width: "203px", height: "220px", left: "10px", marginLeft: "10px", marginTop: "10px" }} />
                                <CardBody>
                                    <CardTitle tag="h5" style={{ fontSize: "bolder" }}>{item.itemName}</CardTitle>
                                    <CardText> <b>Price</b>: {currentGoldPrice ? `Nrs ${calculateTotalCost(item).toLocaleString()}` : 'Price Loading...'}</CardText>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Link to={`/admin/inventory/${item.itemCode}` }>
                                        <Button style={{ background: "#2192FF", fontSize: "0.875rem", height: "40px", width: "150px", marginLeft:"20px" }}>View Details</Button>
                                        </Link>
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
                        <p className="text-center" style={{ fontSize: "36px" }}>No items found</p>
                    </div>
                )}
            </div>    
            </div>
        </>
    )
}

export default Inventory;
