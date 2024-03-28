import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
    return(
        <>
        <div className="mainFooter text-white text-center text-lg-start" >
    
            <div className="d-flex">    
                <div className="aboutUs">
                    <h5 className="text"><b>About Us</b></h5>
                    <p>
                    Sun Chadi Gahana - established since 1968, providing 
                    custom jewelry for years since our ancestral period 
                    - both traditional and modern designs, 
                    located here at center of Kathmandu. 
                    </p>
                </div>

                <div className="links">
                    <h5>Pages</h5>
                    <ul className="list-unstyled mb-0">
                        <li>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <span className="titles">Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/product" style={{ textDecoration: 'none' }}>
                                <span className="titles">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contactus" style={{ textDecoration: 'none' }}>
                                <span className="titles">Contact Us</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="socials">
                    <h5 style={{marginBottom:"20px"}}> Connect With Us</h5>
                    <ul className="list-unstyled mb-0">
                        {/* <li>
                            <Link to="" style={{ textDecoration: 'none' }}>
                                <span className="titles"><i className="fab fa-facebook-f"/></span>
                            </Link>
                        </li>

                        <li>
                            <Link to="" style={{ textDecoration: 'none' }}>
                                <span className="titles"><i className="fab fa-instagram"/></span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="mailto:sunchadigahana@gmail.com" style={{ textDecoration: 'none' }}>
                                <span className="titles"><i className="fab fa-google"/></span>
                            </Link>
                        </li>
                        <li>
                            <Link to="viber://chat?number=+977 9863482149" style={{ textDecoration: 'none' }}>
                                <span className="titles"><i className="fab fa-viber"/></span>
                            </Link>
                        </li>
                    </ul>

                    <h5 style={{marginTop:"45px", marginBottom:"20px"}}>Contact  Us</h5>
                    <p style={{marginTop:"5px"}}><b>Phone no :</b> +977 9127365450</p>
                    <p style={{marginTop:"5px"}}><b>Email :</b> sunchadigahana@gmail.com</p>
                    
                </div>
            </div>
            

            {/* <!-- Copyright --> */}
            <div className=" foot text-center p-3"  style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © Copyrights, 2023:
                <a className="footIn" href="#"> Sun Chadi Gahana </a>

                <div className="line4" >`</div>
            </div>
            {/* <!-- Copyright --> */}
            </div>
        </>
    )   
}

export default Footer