export const goldSilverLineHelper = (priceData = [], selectedMetal, selectedRange) => {
  let filteredData = [];

  // Set the y-axis range and interval based on the selected metal
  let yAxisStart = 0;
  let yAxisEnd = 0;
  let yAxisStep = 0;

  if (selectedMetal === "Gold") {
    yAxisStart = 100000;
    yAxisEnd = 250000;
    yAxisStep = 15000;
  } else if (selectedMetal === "Silver") {
    yAxisStart = 500;
    yAxisEnd = 50000;
    yAxisStep = 4000;
  }

  // Get the current date
  const currentDate = new Date();

  // Filter data based on the selected range
  switch (selectedRange) {
    case "1 Month":
      // Filter data for the current month with a 2-day interval
      filteredData = filterDataByMonth(priceData, currentDate, 1, yAxisStart, yAxisEnd, yAxisStep, 2);
      break;
    case "3 months":
      // Filter data for the past 3 months with a 7-day interval
      filteredData = filterDataByMonth(priceData, currentDate, 3, yAxisStart, yAxisEnd, yAxisStep, 7);
      break;
    case "6 months":
      // Filter data for the past 6 months with a 15-day interval
      filteredData = filterDataByMonth(priceData, currentDate, 6, yAxisStart, yAxisEnd, yAxisStep, 15);
      break;
    case "1 year":
      // Filter data for the past 1 year with a 1-month interval
      filteredData = filterDataByMonth(priceData, currentDate, 12, yAxisStart, yAxisEnd, yAxisStep, 30);
      break;
    default:
      // Default to current month if no valid range is selected
      filteredData = filterDataByMonth(priceData, currentDate, 1, yAxisStart, yAxisEnd, yAxisStep, 2);
  }

  return filteredData;
};

const filterDataByMonth = (priceData, currentDate, months, yAxisStart, yAxisEnd, yAxisStep, intervalDays) => {
  const filteredPriceData = [["Date", "Price"]];

  // Get the date range based on the selected time range
  const startDate = new Date(currentDate);
  startDate.setMonth(startDate.getMonth() - months);

  // Filter price data
  for (let i = 0; i < priceData.length; i++) {
    const item = priceData[i];
    if (new Date(item.date) >= startDate && new Date(item.date) <= currentDate) {
      filteredPriceData.push([item.date, item.price]);
    }
  }

  return filteredPriceData;
};
