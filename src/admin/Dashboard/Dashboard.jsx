// import GoldSilverChart from "../components/GoldSilverChart/GoldSilverChart";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/UserInstance";
import GoldLineChart from "../components/GoldSilverChart/LineChart";
import SilverLineChart from "../components/GoldSilverChart/SilverLineChart";
import OrderPieChart from "../components/OrderChart/PieChart";
import "./dashboard.css"
import { getItems } from "../../services/ItemInstance";
import { getAllOrders } from "../../services/OrderInstance";
import { getAllBooking } from "../../services/BookingInstance";

const Dashboard = () => {

  const formatNumber = (number) => {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + " Cr";
    } else if (number >= 1000000) {
      return Math.floor(number / 1000000) + " Lac"; 
    } else if (number >= 100000) {
        return (number / 100000).toFixed(2) + " Lac";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + " K";
    } else {
      return number
    }
  };
  // const formatNumber = (number) => {
  //   if (number >= 100000000) {
  //     return (number / 10000000).toFixed(2) + " Crs"; // ---1 Crores or more
  //   } else if (number >= 1000000) {
  //     return (number / 100000).toFixed(2) + " Lac"; // --- more than 1 lakh and less than 1 Crores
  //   } else if (number >= 1000) {
  //     return (number / 1000).toFixed(2) + " K"; // --- more htan thousand and less than 1 Lakhs
  //   } else {
  //     return number;
  //   }
  // };

  // formatNumber(123456789) returns "123 M"
  // formatNumber(98765432) returns "98 M"
  // formatNumber(1234567) returns "1.23 M"
  // formatNumber(123456) returns "123 K"
  // formatNumber(987) returns "987"

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: "users", // Update queryKey to a simple string
    queryFn: getUsers,
  });

  const { data: itemsData, isLoading: itemsLoading } = useQuery({
    queryKey: "items",
    queryFn: getItems,
  });

  const totalInvestment = itemsData?.data?.response.reduce(
    (total, item) => total + item.totalCost,
    0
  );

  // const totalNetWeight = itemsData?.data?.response.reduce(
  //   (total, item) => total + item.netWeight,
  //   0
  // );

  const totalNetWeightGold = itemsData?.data?.response
  .filter(item => item.material === "Gold" && item.available)
  .reduce((total, item) => total + item.netWeight, 0)
  .toFixed(2);


  // console.log(totalNetWeightGold);

 const totalNetWeightSilver = itemsData?.data?.response
  .filter(item => item.material === "Silver")
  .reduce((total, item) => total + item.netWeight, 0);

  // console.log(totalNetWeightSilver);

  const totalInStockItems = itemsData?.data?.response
  .filter(item => item.available)
  .length;

  const filterItemsByPurity = (purity) => itemsData?.data?.response
  .filter(item => item.material === "Gold" && item.karat === purity && item.available);

const totalItems24K = filterItemsByPurity(24)?.length || 0;
const totalNetWeight24K = filterItemsByPurity(24)
  ?.reduce((total, item) => total + item.netWeight, 0)
  .toFixed(2) || 0;

const totalItems22K = filterItemsByPurity(22)?.length || 0;
const totalNetWeight22K = filterItemsByPurity(22)
  ?.reduce((total, item) => total + item.netWeight, 0)
  .toFixed(2) || 0;

const totalItems18K = filterItemsByPurity(18)?.length || 0;
const totalNetWeight18K = filterItemsByPurity(18)
  ?.reduce((total, item) => total + item.netWeight, 0)
  .toFixed(2) || 0;

const totalItems14K = filterItemsByPurity(14)?.length || 0;
const totalNetWeight14K = filterItemsByPurity(14)
  ?.reduce((total, item) => total + item.netWeight, 0)
  .toFixed(2) || 0;

  const formattedInvestment = formatNumber(totalInvestment);
  const formattedNetWeightG = formatNumber(totalNetWeightGold);
  const formattedNetWeightS = formatNumber(totalNetWeightSilver);

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: "orders",
    queryFn: getAllOrders,
  });
  
  return (
    <>  
      <div className="cardBoxes">
        <div className="card">
          <div>
          <div className="numbers"  style={{marginTop:"18px"}}>
            {usersLoading ? (
              "..." // Display "Loading..." while data is being fetched
            ) : (
              usersData?.data?.response?.length // Display the length of the users array if data is loaded
            )}
            </div>
            {/* <div className="cardName">Customers</div> */}
          </div>

          <div className="iconBx">
            <ion-icon name="person-outline"></ion-icon>
            <div className="cardName" style={{backgroundColor:"", marginTop:"-12px", marginLeft:"11px"}}>Users</div>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers"  style={{marginTop:"18px"}}>
            {itemsLoading ? (
              "..." // Display "Loading..." while data is being fetched
            ) : (
              itemsData?.data?.response?.length // Display the length of the users array if data is loaded
            )}
            </div>
            {/* <div className="cardName">Items</div> */}
          </div>

          <div className="iconBx">
            
            <ion-icon name="server-outline"></ion-icon>
            <div className="cardName" style={{backgroundColor:"", marginTop:"-12px", marginLeft:"11px"}}>Items</div>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers" style={{fontSize:"19px", marginTop:"8px"}}>
            {/* {ordersLoading ? (
              "..." // Display "Loading..." while data is being fetched
            ) : (
              ordersData?.data?.response?.length // Display the length of the users array if data is loaded
            )}  */}
             {formattedNetWeightG} Tola
            </div>
            {/* <div className="cardName">Tola</div> */}
          </div>

          <div className="iconBx">
            {/* <ion-icon name="documents-outline"></ion-icon> */}
            {/* <ion-icon name="podium-outline"></ion-icon> */}
            <ion-icon name="stats-chart"></ion-icon>
            <div className="cardName" style={{backgroundColor:"", marginTop:"-12px", marginLeft:"11px"}}>Gold</div>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers" style={{fontSize:"20px", marginTop:"15px"}}>
            {formattedNetWeightS} Tola
            </div>
            {/* <div className="cardName">Investment</div> */}
          </div>

          <div className="iconBx">
            {/* <ion-icon name="cash-outline"></ion-icon> */}
            <ion-icon name="stats-chart-outline"></ion-icon>
            <div className="cardName" style={{backgroundColor:"", marginTop:"-12px", marginLeft:"11px"}}>Silver</div>
          </div>
        </div>
      </div>

      {/* <!-- Order Detail List --> */}

      <div className="charts1">
        <div className="chart22">

          <div className="chart222">
            <div className="text"> Available Stock Items: {totalInStockItems}</div>
          </div>
          
          <div className="chart222">
            <div className="text"> 24K Items : {totalItems24K} ({totalNetWeight24K} Tola)</div>
          </div>

          <div className="chart222">
            <div className="text"> 22K Items : {totalItems22K} ({totalNetWeight22K} Tola)</div>
          </div>

          <div className="chart222">
          <div className="text" style={{fontSize:"1.1rem", paddingTop:"20px"}}> 
            <p> 
              18K Items : {totalItems18K} ({totalNetWeight18K} Tola)<br/>
              14K Items : {totalItems14K} ({totalNetWeight14K} Tola)
            </p>
          </div>
          </div>

         
        </div>
 
        <div className="chart11">
          <h2>Gold Market Trend Graph</h2>
          <GoldLineChart/>
        </div>
        

        
      </div>

      <div className="charts2">
        <div className="chart11" style={{width:"99%", marginLeft:"15px"}}>
          <h2>Order Ratio</h2>
          <OrderPieChart/>
        </div>
        <div className="chart11" id="doughnut-chart">
          <h2>Silver Market Trend Graph</h2>
          <SilverLineChart/>
        </div>

        
      </div>
      
     
    </>
  );
}

export default Dashboard;
