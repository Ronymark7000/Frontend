import Location from "../../HomePage/LocationInfo/Location";
import "./AboutUs.css"
function AboutUs(){
    return(
        <>
        <div style={{minHeight:"90vh"}}>
            <div  className="headerMain">
                <p className="text-center pt-4 h1" style={{color:"#62605A"}}><b>Who We Are</b></p>
                <div className="description1">
                    <p>
                        Sun Chadi Gahana - established since 1968, providing 
                        custom jewelry for years since our ancestral period 
                        - both traditional and modern designs, 
                        located here at center of Kathmandu. 
                    </p>
                </div>

                <div className="d-flex">
                    <div className="aboutStore">
                        <p className="h3 p-4" style={{color:"#62605A"}}>GOLD SILVER JEWELLERY</p>
                        <p style={{color:"#62605A", marginLeft:"5%", marginRight:"7%", textAlign: "justify"}}>
                            Welcome to Sun Chadi Gahana, your premier destination for exquisite jewelry 
                            crafted with precision and passion right here in the heart of Kathmandu, Nepal. 
                            Nestled in the heart of our community, we pride ourselves on offering a unique blend of tradition
                        </p>
                        <p style={{color:"#62605A", marginLeft:"5%", marginRight:"7%", textAlign: "justify"}}>
                            From exquisite daily wear jewels to beautiful bridal Necklaces, Sun Chadi Gahana has every kind of piece to add to your beauty.
                            We deal in the highest quality of 24 karat jewellery and the most wonderful designs of 22 karat jewellery. 
                            We guarantee highest degree of purity and the finest and most detailed craftsmanship in all our products.
                           Also our Antique collection adds a lot of depth to any outfit and is perfect for a show stopping statement or marquee bridal wear.
                        </p>

                        <p style={{color:"#62605A", marginLeft:"5%", marginRight:"7%", textAlign: "justify"}}>
                            Sun Chadi Gahana also guarantees the purest silver ornaments and utensils. 
                        </p>
                    </div>

                    <div className="aboutService">
                        <p className="h3 p-4" style={{color:"#62605A"}}>Our Services</p>
                        <div className="aboutServiceBox">
                           <b>Authentic Craftsmanship</b>
                        </div>

                        <div className="aboutServiceBox">
                            <b>Exquisite  Gemstones</b>
                        </div>

                        <div className="aboutServiceBox">
                            <b>Stringent Quality Control</b>
                        </div>

                        <div className="aboutServiceBox">
                            <b>Online Jewelry Booking</b>
                        </div>

                        <div className="aboutServiceBox">
                            <b>Custom Hand-Crafted Jewelry</b>
                        </div>

                        <div className="aboutServiceBox">
                            <b>Designed and Produced in Nepal</b>
                        </div>
                        
                        <div className="aboutServiceBox">
                            <b>A Decade of Trust: Since 1968</b>
                        </div>

                    </div>

                </div>

                <div className="line14" >`</div>
            </div>
            <Location/>

        </div>
        </>
    )
}

export default AboutUs;