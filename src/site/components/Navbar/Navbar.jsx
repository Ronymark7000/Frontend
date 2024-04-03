import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";

function Navbar() {

  const navigate = useNavigate();

  // State to manage the navbar's openness
  const [isOpen, setIsOpen] = useState(false);

  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || ""
  // );

  // Function to toggle the navbar's openness
  const toggle = () => setIsOpen(!isOpen);

  const [currentGoldPrice, setCurrentGoldPrice] = useState(null);
  const [currentGoldPriceGm, setCurrentGoldPriceGm] = useState(null);
  const [currentSilverPrice, setCurrentSilverPrice] = useState(null);
  const [currentSilverPriceGm, setCurrentSilverPriceGm] = useState(null);
  const [currentPriceDate, setCurrentPriceDate] = useState(null);

  useEffect(() => {
    // Fetch current metal prices when the component mounts
    getCurrentPrices();
  }, []);

  const getCurrentPrices = async () => {
    try {
      // Fetch current metal prices from your API
      const response = await getCurrentMetalPrice();
  
      // Check if the response was successful
      if (response.data.success) {
        // Extract gold and silver prices from the response
        const { goldTola, gold10gm, silverTola, silver10gm, priceDate } = response.data.response;
  
        // Update state with the extracted prices
        setCurrentGoldPrice(goldTola);
        setCurrentGoldPriceGm(gold10gm);
        setCurrentSilverPrice(silverTola);
        setCurrentSilverPriceGm(silver10gm);
        setCurrentPriceDate(priceDate);
      } else {
        // Handle API error if needed
        console.error('Error fetching current metal prices:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching current metal prices:', error);
    }
  };

  const formatPrice = (priceString) => {
    const price = parseFloat(priceString.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters and convert to number
    return price.toLocaleString('en-IN');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Function to add the appropriate suffix to the day
    const addSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return day + 'th';
      }
      switch (day % 10) {
        case 1: return day + 'st';
        case 2: return day + 'nd';
        case 3: return day + 'rd';
        default: return day + 'th';
      }
    };
  
    return addSuffix(day) + ' ' + month + ', ' + year;
  };

  return(
    <div>
      <div className="topbar">
        <h4>    
          <div className="logo">
            <div className="icon">          
              <ion-icon name="diamond-outline"></ion-icon>
            </div>

            <b className="name"> JewelHub</b>
          </div>
        </h4>

        <div className="rate10">
          {currentPriceDate && <div>
            <div style={{width:"300px", marginLeft:"-90px"}} className="dropdown123">
              <span><b>Date</b> : {formatDate(currentPriceDate)}</span>
              <div className="dropdown123-content">
                <p>Latest Date of the price is </p>
                <p><b>{formatDate(currentPriceDate)}</b></p>
              </div>
            </div>
          </div>}
          

          {currentGoldPrice && <div>
            <div className="dropdown123">
              <span><b>Gold</b> : NRs {formatPrice(currentGoldPrice)}</span>
              <div className="dropdown123-content">
                <p><b>Gold Per Tola</b> : NRs {formatPrice(currentGoldPrice)}</p>
                <p><b>Gold 10 gm</b> : NRs {formatPrice(currentGoldPriceGm)}</p>
              </div>
            </div>
          </div>}

          {currentSilverPrice && <div>     
            <div className="dropdown123">
              <span><b>Silver</b> : NRs {formatPrice(currentSilverPrice)}</span>
              <div className="dropdown123-content" style={{paddingRight:"30px"}}>
                <p><b>Silver Per Tola</b> : NRs {formatPrice(currentSilverPrice)}</p>
                <p><b>Silver 10 gm</b> : NRs {formatPrice(currentSilverPriceGm)}</p>
              </div>
            </div>
          </div>}

        </div>
      </div>
  
      <div className="navclass">
        <nav className="navbar1 navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggle} // Toggle the navbar on button click
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
          
          {/* Navbar Links */}
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <Link to={"/"} className="nav-link">
                  <span className="link-text">Home</span>
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/items' ? 'active' : ''}`}>
                <Link to={"/items"} className="nav-link">
                  <span className="link-text">Products</span>
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" href="#">Cart</a>
              </li>

              <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                <Link to={"/login"} className="nav-link">
                  <span className="link-text">Login</span>
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                <Link to={"/profile"} className="nav-link">
                  <span className="link-text">Profile</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </nav>
        <div className="line">
          `
        </div>
      </div>

    </div>

  );
}

export default Navbar;
