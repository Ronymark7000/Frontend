import "./ImageCard.css";
import img1 from "../../../assets/Category/Rings.png";
import img2 from "../../../assets/Category/Necklace.png";
import img3 from "../../../assets/Category/EarRing.png";
import img4 from "../../../assets/Category/Pendant.png";
import { Link } from "react-router-dom";

function Cards() {
return (
    <>
    <div className="container">
        <Link to={"/product"}>
            <div className="card">
                <img src={img1} alt="Rings"/>
                <div className="intro" style={{color:"white"}}>
                    <h1 style={{margin:'10px', fontSize:'28px'}}>Rings</h1>
                    <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '8px'}}>From classic solitaires to intricate designs, find the perfect ring to symbolize your love or make a bold statement.</p>
                </div>
            </div>
        </Link>

        <Link to={"/product"}>
            <div className="card">
                <img src={img2} alt="Necklace"/>
                <div className="intro" style={{color:"white"}}>
                    <h1 style={{margin:'10px', fontSize:'28px'}}>Necklace</h1>
                    <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '8px'}}>Elevate your neckline with our exquisite collection of necklaces, from delicate chains to dazzling pendants.</p>
                </div>
            </div>
        </Link>

        <Link to={"/product"}>
            <div className="card">
                <img src={img3} alt="Ear Rings"/>
                <div className="intro" style={{color:"white"}}>
                    <h1 style={{margin:'10px', fontSize:'28px'}}>Ear Rings</h1>
                    <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '8px'}}>Discover elegance for your ears. Explore our chic earring collection today.</p>
                </div>
            </div>
        </Link>


        <Link to={"/product"}>
        <div className="card">
            <img src={img4} alt="Pendant"/>
            <div className="intro" style={{color:"white"}}>
                <h1 style={{margin:'10px', fontSize:'28px'}}>Pendant</h1>
                <p style={{color:'white', fontSize: '14px', marginLeft: '5px', marginRight: '5px'}}>Add a touch of elegance with our pendant collection – perfect for every occasion and style.</p>
            </div>
        </div>
        </Link>
    </div>    
    </>
    )
}

export default Cards