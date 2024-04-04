import GoldSilverChart from "../components/GoldSilverChart/GoldSilverChart";
import "./dashboard.css"

const Dashboard = () => {
  
  return (
    <>
      <div className="cardBoxes">
        <div className="card">
          <div>
            <div className="numbers">154</div>
            <div className="cardName">Customers</div>
          </div>

          <div className="iconBx">
            <ion-icon name="person-outline"></ion-icon>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">290</div>
            <div className="cardName">Books</div>
          </div>

          <div className="iconBx">
            <ion-icon name="podium-outline"></ion-icon>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">9</div>
            <div className="cardName">Orders</div>
          </div>

          <div className="iconBx">
            <ion-icon name="documents-outline"></ion-icon>
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers"> 590k</div>
            <div className="cardName">Sales</div>
          </div>

          <div className="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </div>
      </div>

      {/* <!-- Order Detail List --> */}

      <div className="charts1">
        <div className="chart11">
          <h2>Gold & Silver Rate</h2>
    
        </div>
        <div className="chart11" id="doughnut-chart">
          <h2>Order Ratio</h2>
          <canvas id="piechart"></canvas>
        </div>

        
      </div>
      
      <GoldSilverChart/>
    </>
  );
}

export default Dashboard;
