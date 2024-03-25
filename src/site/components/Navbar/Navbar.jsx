import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {

  const navigate = useNavigate();

  // State to manage the navbar's openness
  const [isOpen, setIsOpen] = useState(false);

  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || ""
  // );

  // Function to toggle the navbar's openness
  const toggle = () => setIsOpen(!isOpen);

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
          <div><b>Today's Rate</b></div>
          <div>Gold: Rs 1,21,000</div>
          <div>Silver: Rs 4,500</div>
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
