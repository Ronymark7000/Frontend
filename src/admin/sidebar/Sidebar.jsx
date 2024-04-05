import "../sidebar/sidebar.css";
import { useState, useEffect } from "react";
import Prof from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { handleLogout } from "../../services/UserInstance";
import { getCurrentMetalPrice } from "../../services/PriceInstance";

function Sidebar(){
    useEffect(() => {
        // Function to handle the "mouseover" event on navigation items
        const activeLink = (event) => {
          const list = document.querySelectorAll(".navigation li");
          list.forEach((item) => {
            item.classList.remove("hovered");
          });
          event.target.classList.add("hovered");
        };
  
        // Add "mouseover" event listeners to navigation items
        const navigationItems = document.querySelectorAll(".navigation li");
        navigationItems.forEach((item) =>
          item.addEventListener("mouseover", activeLink)
        );
  
        // Function to handle menu toggle
        const handleToggle = () => {
          const navigation = document.querySelector(".navigation");
          const main = document.querySelector(".main");
          navigation.classList.toggle("active");
          main.classList.toggle("active");
        };
  
        // Add click event listener to the toggle button
        const toggleButton = document.querySelector(".toggle");
        toggleButton.addEventListener("click", handleToggle);
  
        // Cleanup event listeners on component unmount
        return () => {
          navigationItems.forEach((item) =>
            item.removeEventListener("mouseover", activeLink)
          );
          toggleButton.removeEventListener("click", handleToggle);
        };
      }, []);

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
    if (priceString) {
      const price = parseFloat(priceString.replace(/[^0-9.-]+/g," ")); // Remove non-numeric characters and convert to number
      return price.toLocaleString('en-IN');
    } else {
      return ""; // or any default value you want to return if priceString is null or undefined
    }
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

    return (
    <>
        <div className="first">
            <div className="container1">
              <div className="navigation">
                <ul>
                  <li>
                    <a href="#">
                      <span className="icon">
                        <b>
                          <ion-icon name="diamond-outline"></ion-icon>
                        </b>
                      </span>
                      <span className="title" style={{ fontSize: "26px"}}>
                        <b>JewelHub</b>
                      </span>
                    </a>
                  </li>
    
                  <li>
                    <Link to={"/admin"}>
                      <span className="icon">
                        <ion-icon name="home-outline"></ion-icon>
                      </span>
                      <span className="title">Dashboard</span>
                    </Link>
                  </li>

                  <li>
                    <Link to={"/admin/user-dashboard"}>
                      <span className="icon">
                        <ion-icon name="people-outline"></ion-icon>
                      </span>
                      <span className="title">User Details</span>
                    </Link>
                  </li>
    
                  <li>
                    <Link to={"/admin/item-dashboard"}>
                      <span className="icon">
                      <ion-icon name="grid-outline"></ion-icon>
                      </span>
                      <span className="title">Item Dashboard</span>
                    </Link>
                  </li>
                  

                  <li>
                    <Link to={"/admin/add-item"}>
                      <span className="icon">
                        <ion-icon name="add-circle-outline"></ion-icon>
                      </span>
                      <span className="title">Add Items</span>
                    </Link>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="push-outline"></ion-icon>
                      </span>
                      <span className="title">Update Items</span>
                    </a>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="remove-circle-outline"></ion-icon>
                      </span>
                      <span className="title">Remove Items</span>
                    </a>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                      </span>
                      <span className="title">Inventory</span>
                    </a>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="search-circle-outline"></ion-icon>
                      </span>
                      <span className="title">Product Valuation</span>
                    </a>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="receipt-outline"></ion-icon>
                      </span>
                      <span className="title">Customer Order</span>
                    </a>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="megaphone-outline"></ion-icon>
                      </span>
                      <span className="title">Feedbacks</span>
                    </a>
                  </li>
    
                  <li>
                    <a href="#">
                      <span className="icon">
                        <ion-icon name="desktop-outline"></ion-icon>
                      </span>
                      <span className="title">Webpage</span>
                    </a>
                  </li>
    
                  <li>
                    <Link to="#" onClick={handleLogout}>
                      <span className="icon">
                        <ion-icon name="exit-outline"></ion-icon>
                      </span>
                      <span className="title">Sign Out</span>
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
    
            <div className="main2">
              <div className="topbar2">
                <div className="toggle">
                  {/* <ion-icon name="menu-outline"></ion-icon> */}
                </div>
    
                <div className="rates" style={{pointerEvents: "all"}}>
                    <label>
                        <input type="text" placeholder={`Gold Rate: Nrs ${formatPrice(currentGoldPrice)}`} disabled/>
                        {/* <ion-icon name="search-outline"></ion-icon>  */}
                    </label>
                </div>

                <div className="rates1" style={{pointerEvents: "all"}}>
                    <label>
                        <input type="text" placeholder={`Silver Rate: Nrs ${formatPrice(currentSilverPrice)}`} disabled/>
                        {/* <ion-icon name="search-outline"></ion-icon>  */}
                    </label>
                </div>

             

                {/* Image For profile Pic */}
                <div className="user">
                  
                  <img src={Prof} alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export default Sidebar;