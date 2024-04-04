import React, { useEffect, useState } from "react";
import { goldSilverLineHelper } from "./GoldSilverLineHelper";

function GoldSilverLineChart({ metal, priceData }) {
  const [linedata, setLineData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("1 Month");

  const fetchFilteredData = () => {
    const filteredData = goldSilverLineHelper(priceData, metal, selectedRange);
    setLineData(filteredData);
  };

  useEffect(() => {
    fetchFilteredData();
  }, [priceData, metal, selectedRange]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <div>
      <div>
        <select value={selectedRange} onChange={handleRangeChange}>
          <option value="1 Month">1 Month</option>
          <option value="3 months">3 Months</option>
          <option value="6 months">6 Months</option>
          <option value="1 year">1 Year</option>
        </select>
      </div>
      <div id="gold-silver-line-chart"></div>
    </div>
  );
}

export default GoldSilverLineChart;
