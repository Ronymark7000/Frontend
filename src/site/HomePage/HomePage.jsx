import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import CarouselPage from "./CarousalPages/CarousalPage";
import Cards from "./ImageCard/Cards";
import Cards2 from "./ImageCard/Cards2";

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
        <p className="fw-bolder d-flex justify-content-center"> 
          <h1> Elevate Your Shopping</h1>
        </p>
        <p className="d-flex justify-content-center">
          <h3>Shop by Category</h3>
        </p>
        <div className="containers">

          <div class="top-row">
            <Cards/>
          </div>
          <div class="bottom-row">
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

    <div >
    Footer
    </div>
    </>
  )
};

export default HomePage;
