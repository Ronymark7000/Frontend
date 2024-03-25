import "./ImageCard2.css";
import img5 from "../../../assets/Category/JewelSet.png";
import img6 from "../../../assets/Category/Diamond.png";
import img7 from "../../../assets/Category/Bangles.png";
import { Link } from "react-router-dom";

function Cards2() {
return (
    <>
    <div className="container">
        <Link to={"/product"}>
            <div className="card">
                <img src={img5} className="img2" alt="Rings"/>
                <div className="intro2" style={{color:"white"}}>
                    <h1 style={{margin:'10px', fontSize:'28px'}}>Jewellery Set</h1>
                    <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '8px'}}>Where Tradition Meets Elegance:  Discover our curated jewelry sets, perfect for adding elegance to any occasion.</p>
                </div>
            </div>
        </Link>

        <Link to={"/product"}>
            <div className="card">
                <img src={img6} className="img2" alt="Diamond"/>
                <div className="intro2" style={{color:"white"}}>
                    <h1 style={{margin:'10px', fontSize:'28px'}}>Diamond Jewels</h1>
                    <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '8px'}}>Timeless Elegance: Elevate your style with our exclusive diamond collection </p>
                </div>
            </div>
        </Link>

        <Link to={"/product"}>
            <div className="card">
                <img src={img7} className="img2" alt="Ear Rings"/>
                <div className="intro2" style={{color:"white"}}>
                    <h1 style={{margin:'10px', fontSize:'28px'}}>Bangles</h1>
                    <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '8px'}}>Adorn Your Wrists: Discover our stunning collection of bangles, crafted to accentuate your grace and style.</p>
                </div>
            </div>
        </Link>

    </div>    
    </>
    )
}

export default Cards2