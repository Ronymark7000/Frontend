import React, { useEffect, useState } from "react";
import { getCurrentMetalPrice } from "../../../services/PriceInstance";
import { Link } from "react-router-dom";

function BookListItem({ booklist, handleDelete }) {
  const [currentGoldPrice, setCurrentGoldPrice] = useState(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await getCurrentMetalPrice();
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        setCurrentGoldPrice(response.data.response.goldTola);
      } catch (error) {
        console.error("Error fetching gold price:", error);
      }
    };

    fetchGoldPrice();
  }, []);

  const calculateTotalCost = () => {
    if (!booklist?.item) {
      return 0; // Return 0 if item is null
    }

    const { netWeight, manufactureCost, costOfStone, karat } = booklist.item;
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

    let totalCosts = goldPriceInt * netWeight + manufactureCost + costOfStone;
    totalCosts = Math.ceil(totalCosts);

    if (totalCosts % 10 !== 0) {
      totalCosts = Math.ceil(totalCosts / 10) * 10;
    }
    return totalCosts;
  };

  return (
    <div className="row mb-4 d-flex justify-content-between align-items-center" style={{ width: "730px" }}>
      <div className="col-md-3 col-lg-3 col-xl-3">
        <img
          src={booklist?.item?.itemImageUrl}
          className="img-fluid rounded-3"
          alt="Item Image"
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3" style={{ color: "#434343" }}>
        <h6 className="text mb-0">{booklist?.item?.itemName}</h6>
      </div>

      <div className="col-md-2 col-lg-2 col-xl-2" style={{ color: "#434343" }}>
        <h6 className="text mb-0">{booklist?.item?.category}</h6>
      </div>

      <div className="col-md-2 col-lg-2 col-xl-2 " style={{ color: "#434343" }}>
        <h6 className="mb-0">Nrs {calculateTotalCost().toLocaleString()}</h6>
      </div>

      <div className="col-md-1 col-lg-1 col-xl-1 ">
        <Link to={"#"} className="text-muted">
          <i
            className="fas fa-times"
            onClick={() => handleDelete(booklist['bookListID'])}
          ></i>
        </Link>
      </div>
    </div>
  );
}

export default BookListItem;
