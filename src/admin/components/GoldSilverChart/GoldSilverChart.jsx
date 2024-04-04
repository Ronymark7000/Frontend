import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosInstance";
import { Card } from "reactstrap";
import GoldSilverLineChart from "./GoldSilverLineChart"; // New chart component

function GoldSilverChart() {
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [goldPriceData, setGoldPriceData] = useState([]); // New state for gold price data
  const [silverPriceData, setSilverPriceData] = useState([]); // New state for silver price data
  const [selectedMetal, setSelectedMetal] = useState("Gold"); // New state for selected metal

  const getData = async () => {
    try {
      const metalPricesRes = await axiosInstance.get("/store/metal-prices");
      const metalPricesData = metalPricesRes?.data?.response;
      
      // Extract gold and silver price data from the response
      const goldPriceData = metalPricesData.map(item => ({
        date: item.priceDate,
        price: parseFloat(item.gold10gm.replace("Rs ", "").replace(",", ""))
      }));
      
      const silverPriceData = metalPricesData.map(item => ({
        date: item.priceDate,
        price: parseFloat(item.silver10gm.replace("Rs ", "").replace(",", ""))
      }));
  
      setGoldPriceData(goldPriceData);
      setSilverPriceData(silverPriceData);
    } catch (error) {
      console.error("Error fetching gold and silver price data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!window.google.visualization) {
      window.google.charts.load("current", { packages: ["corechart"] });
    }
    window.google.charts.setOnLoadCallback(() => {
      setChartsLoaded(true);
    });
  }, []);

  const handleMetalChange = (event) => {
    setSelectedMetal(event.target.value);
  };

  return (
    <div>
      <Card style={{ width: "100%", alignItems: "center", border: "none" }}>
        <select value={selectedMetal} onChange={handleMetalChange}>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select>
        {chartsLoaded && (
          <>
            <hr className="bg-info border-3 border-top border-secondary" />
            <GoldSilverLineChart 
              metal={selectedMetal}
              priceData={selectedMetal === "Gold" ? goldPriceData : silverPriceData}
            />
          </>
        )}
      </Card>
      <hr className="bg-info border-3 border-top border-white" />
    </div>
  );
}

export default GoldSilverChart;
