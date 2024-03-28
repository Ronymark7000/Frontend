import { Link } from "react-router-dom"
import "./Location.css"

function Location(){
    return(
        <>
        <div style={{ width: "100%", color:"#62605A", marginTop:"25px"}}>
            <h1> 
                <p className="fw-bolder d-flex justify-content-center"> 
                Store Location
                </p>
            </h1>

            <div className="d-flex justify-content-between">
                <div style={{ width:"40%", height:"60vh", padding:"10px 70px"}}>
                    <div className="storeInfo">
                        <h2 style={{marginBottom:"15px"}}>Find Our Store</h2>
                        <p><ion-icon name="location-outline"></ion-icon>Address : Phasikeb Marg, Neworad</p>
                        <p><ion-icon name="call-outline"></ion-icon>Phone No : +977 9127365450</p>
                        <p><ion-icon name="mail-open-outline"></ion-icon>Email : sunchadigahana@gmail.com</p>
                        <br/>
                        <h2 style={{marginBottom:"15px"}}>Store Details</h2>
                        <p>
                        <ion-icon name="time-outline"></ion-icon>
                            Opening Time : 11:00am
                        </p>
                        <p>
                        <ion-icon name="hourglass-outline"></ion-icon>
                        Closing Time : 18:00pm
                        </p>
                        <p>
                        <ion-icon name="calendar-outline"></ion-icon>
                            Days : Sunday - Friday
                        </p>
                    </div>    
                </div>

                <div style={{ width:"60%"}}>
                    <div style={{backgroundColor:"green", height:"50vh", marginTop:"15px",marginRight:"100px"}}>
                    <iframe style={{width:"100%", height:"390px", frameBorder:"0", scroll:"no" }} src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ranjana%20Marg+(Sun%20Chadi%20Gahana)&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        <Link to="https://www.gps.ie/">GPS Tracker</Link>

                        
                    </iframe>
                    </div> 
                </div>
            </div>

            

           


        </div>
        </>
    )
}

export default Location