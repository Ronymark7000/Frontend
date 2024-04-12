import { useEffect, useState } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import axiosInstance from "../../../../axiosInstance";
import NoSuchData from "../../../assets/NoItemFound.svg";

function BookedItem() {
    const [itemsBooked, setItemsBooked] = useState([]);
    const fetchBooked = async () => {
        const response = await axiosInstance.get("booked-items");
        const itemBooked = response?.data?.response;
        setItemsBooked(itemBooked);
    };
    useEffect(() => {
        fetchBooked();
    }, []);

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

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

    return (
        <>
            <div style={{ minHeight: "75vh", marginTop:"8%" }}>
                <div className="container" style={{ width: "90%", marginTop: "" }}>
                    <Row style={{ width: "150%" ,  marginTop:"10%", backgroundColor:""}}>
                        <Col>
                            {itemsBooked && itemsBooked.length === 0 ? (
                                <>
                                <h3 style={{color:"#62605A", textAlign:"center"}}>You have not placed any order!!!</h3>
                                <div className="col text-center w-100 " style={{ marginTop: "5%" }}>
                                    <img src={NoSuchData} alt="svg" />
                                    <p className="text-center" style={{fontSize:"36px", color:"#62605A"}}>No Items Booked</p>
                                 </div>
                                
                                </>
                            ) : (
                                <ListGroup variant="flush">
                                    <h1 style={{ color: "#62605A" }}>Your Orders</h1>
                                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}> {/* Scrollable container */}
                                        {itemsBooked
                                           .filter(itemBooked => {
                                            const validTillDate = addDays(itemBooked.bookedDate, 7);
                                            const currentDate = new Date();
                                            // Check if the valid till date is after or equal to the start of the current day
                                            return new Date(validTillDate).getTime() >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
                                        })
                                            .map((itemBooked, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row style={{ width: "100%" }}>
                                                    <Col md={2}>
                                                        <Image
                                                            src={itemBooked?.item?.itemImageUrl}
                                                            alt={itemBooked?.item?.itemName}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col className="d-flex justify-content-center align-items-center" md={3}>{itemBooked?.item?.itemName}</Col>
                                                    <Col className="d-flex justify-content-center align-items-center" md={1}>{itemBooked?.item?.material}</Col>
                                                    <Col className="d-flex justify-content-center align-items-center" md={1}>{itemBooked?.item?.karat} Karat</Col>
                                                    <Col className="d-flex justify-content-center align-items-center" md={1}>{itemBooked?.item?.netWeight} Tola</Col>
                                                    <Col style={{paddingTop:"7%", paddingLeft:"5%"}} md={2}><b>--Booked Date--</b><br />{formatDate(itemBooked?.bookedDate)}</Col>
                                                    <Col style={{paddingTop:"7%", paddingLeft:"6%"}} md={2}><b>---Valid Till---</b><br />{formatDate(addDays(itemBooked?.bookedDate, 7))}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                    <div className="mt-5">
                                        <p style={{color:"#62605A", marginLeft:"9%", marginRight:"11%", textAlign: "center"}}>
                                            <b>Note : </b> 
                                            We kindly remind you that your booking with us is set to expire after the validated date.
                                            To ensure your reservation remains active, we encourage you to visit our store physically before this date. 
                                        </p>
                                    </div>
                                </ListGroup>
                            )}
                        </Col>
                       
                    </Row>
                </div>
            </div>
        </>
    )
}

export default BookedItem;
