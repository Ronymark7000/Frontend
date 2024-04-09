import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "reactstrap";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";
import axiosInstance from "../../../../axiosInstance";

const InventoryView = () => {
    const { itemCode } = useParams();
    const [itemInfo, setItemInfo] = useState(null);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);

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
        if (!item) {
            return 0; // Return 0 if item is null
        }
    
        const { netWeight, manufactureCost, costOfStone, karat } = item;
        let goldPriceInt = 0;
    
        if (currentGoldPrice) {
            goldPriceInt = parseInt(currentGoldPrice.replace(/\D/g, ""));
        }
    
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
    
        if (totalCosts % 10 !== 0) {
            totalCosts = Math.ceil(totalCosts / 10) * 10;
        }
        return totalCosts;
    };

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axiosInstance.get(`/store/item/${itemCode}`);
                setItemInfo(response.data?.response); // Assuming response.data contains item details
                setImageUrl(response.data?.response?.itemImageUrl); // Assuming imageUrl is the property containing the image URL
                setVideoUrl(response.data?.response?.itemVideoUrl);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchItemDetails();
    }, [itemCode]);

    return(
        <>
        <div style={{marginLeft:"154px", minWidth:"1130px"}}>
        <div style={{ minHeight: "75vh", marginBottom:"30px" }}>
                <div style={{marginTop:"20px", width: "100%", minHeight: "1vh", backgroundColor: "#FEFAF3", paddingBottom:"10px" }}>
                    <div style={{ textAlign: "center", paddingTop: "5px", fontSize: "26px", fontWeight: "bolder" }}>
                        {itemInfo ? (
                        <div>
                           <p style={{color:"#62605A"}}>{itemInfo.itemName}</p>
                        </div>
                ) : (
                    <p>Loading Item Name...</p>
                )}
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    {/* Left side of Item Detials */}
                    <div style={{ width: "42%",marginLeft:"100px", minHeight:"20vh", backgroundColor:"" }}>
                        <div  style={{width: "320px", height: "auto", marginTop: "10px", marginLeft:"13%"}}>
                             {imageUrl && (
                                <img
                                    src={imageUrl} // Assuming imageUrl is the property containing the image URL
                                    alt="Item"
                                    style={{ width: "85%", height: "280px", borderRadius:"5px"}}
                                />
                            )}
                        </div>
                        <p style={{marginLeft:"135px"}}><b>Image Preview</b></p>

                        <br/>
                   
                        <div  style={{width: "320px", height: "auto", marginTop: "10px", marginLeft:"5%"}}>
                        {videoUrl && (
                            <video controls width="350px" height="200px" style={{borderRadius:"5px"}}>
                                <source src={videoUrl} type="video/mp4" /> 
                            </video>
                        )}
                        </div>
                        <p style={{marginLeft:"135px"}}><b>Video Preview</b></p>
                    </div>

                    {/* Right Side of Item Details */}
                    <div style={{ width: "42%",marginTop:"10px", marginRight: "100px", minHeight:"20vh",color:"#62605A", backgroundColor:"#f9f9f9", borderRadius:"5px", paddingLeft:"20px", paddingTop:"20px", paddingRight:"20px" }}>
                        {/* Item Name Display */}
                        {itemInfo ? (
                            <div>
                            <p style={{fontSize:"22px", paddingLeft:"20px"}}><b>Item Name :</b> {itemInfo.itemName}</p>
                            </div>
                        ) : (
                            <p>Loading Item Name...</p>
                        )}
                         {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        
                        {/* Item Price Display */}
                        <div className="mb-2 pt-1 " style={{height:"40px", backgroundColor:""}}>
                          
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>{currentGoldPrice ? `Nrs ${calculateTotalCost(itemInfo).toLocaleString()}` : 'Price Loading...'}</p>
                                </div>
                           
                        </div>

                        {/* Item Booking Button Display  */}
                        <div className="mb-4" style={{height:"40px"}}>
                           
                                <Link to="/admin/inventory">
                                    <Button style={{ background: "#03C988", fontSize: "0.875rem", height: "40px", width: "150px", marginLeft:"10px" }}>Back to Inventory</Button>
                                </Link>
                           
                        </div>

                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                       
                        {/* Item Material Display  */}
                        <div className="d-flex" style={{height:"40px", paddingTop:"6px",  background: "#E0DBD3"}}>
                            <div style={{ width:"50%"}}>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Category : </b></p>
                            </div>
                            {itemInfo ? (
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>{itemInfo.category}</p>
                                </div>
                            ) : (
                                <p>Loading Item Category...</p>
                            )}
                        </div>

                        <div className="d-flex" style={{height:"40px", paddingTop:"6px"}}>
                            <div style={{ width:"50%"}}>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Material : </b></p>
                            </div>
                            {itemInfo ? (
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>{itemInfo.material}</p>
                                </div>
                            ) : (
                                <p>Loading Item Material...</p>
                            )}
                        </div>

                        <div className="d-flex" style={{height:"40px", paddingTop:"6px",  background: "#E0DBD3"}}>
                            <div style={{ width:"50%"}}>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Karat : </b></p>
                            </div>
                            {itemInfo ? (
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>{itemInfo.karat}k</p>
                                </div>
                            ) : (
                                <p>Loading Item Karat...</p>
                            )}
                        </div>

                        <div className="d-flex" style={{height:"40px", paddingTop:"6px"}}>
                            <div style={{ width:"50%"}}>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Net Weight : </b></p>
                            </div>
                            {itemInfo ? (
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>{itemInfo.netWeight} tola</p>
                                </div>
                            ) : (
                                <p>Loading Item Weight...</p>
                            )}
                        </div>

                        <div className="d-flex" style={{height:"40px", paddingTop:"6px",  background: "#E0DBD3"}}>
                            <div style={{ width:"50%"}}>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Cost Of Stone : </b></p>
                            </div>
                            {itemInfo ? (
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>NRs {itemInfo.costOfStone.toLocaleString()}</p>
                                </div>
                            ) : (
                                <p>Loading Item Stome Cost...</p>
                            )}
                        </div>

                        <div className="d-flex" style={{height:"40px", paddingTop:"6px"}}>
                            <div style={{ width:"50%"}}>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Manufacture Cost : </b></p>
                            </div>
                            {itemInfo ? (
                                <div>
                                <p style={{fontSize:"18px" , paddingLeft:"20px"}}>NRs {itemInfo.manufactureCost.toLocaleString()}</p>
                                </div>
                            ) : (
                                <p>Loading Item Manufacture Cost...</p>
                            )}
                        </div>

                        <div style={{height:"110px", paddingTop:"6px",   background: "#E0DBD3"}}>
                            
                            <p style={{fontSize:"18px" , paddingLeft:"20px"}}><b>Description : </b></p>
                        {itemInfo ? (
                            <div>
                            <p style={{fontSize:"18px" , paddingLeft:"20px"}}>{itemInfo.description}</p>
                            </div>
                        ) : (
                            <p>Loading Item Description...</p>
                        )}
                    </div>

                        <div className="d-flex mt-1" style={{height:"55px", paddingTop:"13px"}}>
                           
                                <p style={{fontSize:"22px" , paddingLeft:"20px"}}><b>Total Price : </b></p>
                            
                                <div>
                                <p style={{fontSize:"22px" , paddingLeft:"20px"}}>{currentGoldPrice ? `Nrs ${calculateTotalCost(itemInfo).toLocaleString()}` : 'Price Loading...'}</p>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default InventoryView;