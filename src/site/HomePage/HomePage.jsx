import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import CarouselPage from "./CarousalPages/CarousalPage";
import Cards from "./ImageCard/Cards";
import Cards2 from "./ImageCard/Cards2";
import Locations from "./LocationInfo/Location";

const HomePage = () => {
  return (
    <>     
    <CarouselPage/>

    {/* Div section for Card Category */}
    <div className="categories">
      <div className="line">
          `
      </div>
      <div className="category">
        <h1> 
          <p className="fw-bolder d-flex justify-content-center"> 
            Elevate Your Shopping
          </p>
        </h1>

        <h3>
          <p className="d-flex justify-content-center">
            Shop by Category
          </p>
        </h3>
        <div className="containers">

          <div className="top-row">
            <Cards/>
          </div>
          <div className="bottom-row">
            <Cards2/>
          </div>
        </div>
      </div>
      <div className="line" >
          `
      </div>
      <div>
        `
      </div>
    </div>

    <div>
    <Locations />
    </div>
    </>
  )
};

export default HomePage;
