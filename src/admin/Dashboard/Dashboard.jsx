// import GoldSilverChart from "../components/GoldSilverChart/GoldSilverChart";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/UserInstance";
import LineChart from "../components/GoldSilverChart/LineChart";
import PieChart from "../components/OrderChart/PieChart";
import "./dashboard.css"
import { getItems } from "../../services/ItemInstance";
import { getAllOrders } from "../../services/OrderInstance";
import { getAllBooking } from "../../services/BookingInstance";

const Dashboard = () => {

  const formatNumber = (number) => {
    if (number >= 100000000) {
      return (number / 100000000).toFixed(0) + " M";
    } else if (number >= 10000000) {
      return Math.floor(number / 1000000) + " M"; 
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + " M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + " K";
    } else {
      return number
    }
  };

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

  const formattedInvestment = formatNumber(totalInvestment);

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: "orders",
    queryFn: getAllOrders,
  });
  
  return (
    <>  
      <div className="cardBoxes">
        <div className="card">
          <div>
          <div className="numbers">
            {usersLoading ? (
              "..." // Display "Loading..." while data is being fetched
            ) : (
              usersData?.data?.response?.length // Display the length of the users array if data is loaded
            )}
            </div>
            <div className="cardName">Customers</div>
          </div>

          <div className="iconBx">
            <ion-icon name="person-outline"></ion-icon>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">
            {itemsLoading ? (
              "..." // Display "Loading..." while data is being fetched
            ) : (
              itemsData?.data?.response?.length // Display the length of the users array if data is loaded
            )}
            </div>
            <div className="cardName">Items</div>
          </div>

          <div className="iconBx">
            <ion-icon name="podium-outline"></ion-icon>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">
            {ordersLoading ? (
              "..." // Display "Loading..." while data is being fetched
            ) : (
              ordersData?.data?.response?.length // Display the length of the users array if data is loaded
            )} 
            </div>
            <div className="cardName">Orders</div>
          </div>

          <div className="iconBx">
            <ion-icon name="documents-outline"></ion-icon>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers" style={{fontSize:"20px", marginTop:"15px"}}>
            {formattedInvestment}
            </div>
            <div className="cardName">Investment</div>
          </div>

          <div className="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </div>
      </div>

      {/* <!-- Order Detail List --> */}

      <div className="charts1">
        <div className="chart11">
          <h2>Gold Market Trend Graph</h2>
          <LineChart/>
        </div>
        <div className="chart11" id="doughnut-chart">
          <h2>Order Ratio</h2>
          <PieChart/>
        </div>

        
      </div>
      
     
    </>
  );
}

export default Dashboard;
