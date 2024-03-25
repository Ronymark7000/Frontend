import { Link } from "react-router-dom";
import PageError from "../../assets/404.svg";
import "./404Page.css";

const PageNotFound = () => {
  return (
    <>
            <div className="cont-404">
                <img src={PageError} alt="svg" />
                <Link to={"/"} className="nav-link">
                  <button>Back to Home</button>
                </Link>
            </div>
        </>
  )
};

export default PageNotFound;
