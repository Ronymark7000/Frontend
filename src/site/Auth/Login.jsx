import "../Auth/login.css";
import A from "../../assets/login.svg";
import B from "../../assets/signup.svg";
import Cookies from "js-cookie";
import { getProfile } from "../../services/UserInstance";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin, handleSignup } from "../../services/LoginInstance";
import { emitErrorToast, emitInfoToast, emitSuccessToast } from "../components/Toast/EmitToast";
import axiosInstance from "../../../axiosInstance";



const Login = () => {
  const containerRef = document.querySelector(".container");

  const [formType, setFormType] = useState("login");

  const handleSignUpClick = () => {
    containerRef.current.classList.add("sign-up-mode2");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("sign-up-mode2");
  };

  //state
  const navigate = useNavigate();

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  //const [user, setUser] = useState("User");

  //login function
  //    /api/auth/login -> success
  const handleClick = async () => {
    if (formType === "login") {
      const response = await handleLogin(email, password);

      if (response?.success == true && response!= null) {
        
        const response= await axiosInstance.get("/profile")
        localStorage.setItem("userProfile", JSON.stringify(response?.data?.response));
        const userRole = response?.data?.response?.role

        
        
        userRole === "Admin" ? navigate("/admin") : navigate("/");
        window.location.reload();
        emitSuccessToast("Logged In Successfully");
        //Cookies.set("userToken", JSON.stringify(response?.response));
        
      }else{
        emitErrorToast("Login Failed")
        emitErrorToast("Check email verification or login credentials")
      }
      //If the user is admin changes into admin page
    } else {
      const response = await handleSignup(firstname, lastname, password, email, contact, role);
      response?.success && handleLoginModel();
      if (response?.success && response!= null ){
        emitSuccessToast("User Registered Successfully")
        emitInfoToast("Please verify your email")
      }else{
        emitErrorToast("Registration Failed")
      }
    }
  };

  const handleLoginModel = () => {
    const cont = document.querySelector(".cont");
    cont.classList.remove("sign-up-mode");
    setFormType("login");
  };

  const handleSignupModel = () => {
    const cont = document.querySelector(".cont");
    cont.classList.add("sign-up-mode");
    setFormType("signup");
  };  
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#62605A",
      }}
    >
      <div className="cont">
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">
              <b>Log in</b>
            </h2>

            {/* <!--Input field for Username --> */}
            <div className="input-field">
              <div className="input-cont">
                <i className="fas fa-user"></i>
                <input 
                type="text"
                name="text"
                required
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* <!--Input field for Password --> */}
            <div className="input-field">
              <div className="input-cont">
                <i className="fas fa-lock"></i>
                <input 
                type="password" 
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            <button type="button" className="btn" onClick={handleClick}>
              Login
            </button>

            <p className="account-text">
              Don't have an account?
              <a href="#" id="sign-up-btn2" onClick={handleSignInClick}>
                Sign up
              </a>
            </p>
          </form>

          {/* <!-- For SignUp --> */}
          <form action="" className="sign-up-form">
            <h2 className="title">
              <b>Sign up</b>
            </h2>

            {/* <!--Input field for Username --> */}
            <div className="input-field">
              <div className="input-cont">
                <i className="fas fa-user"></i>
                <input 
                type="text" 
                name="text"
                required
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                />
              </div>
            </div>

            <div className="input-field">
              <div className="input-cont">
                <i className="fas fa-user"></i>
                <input 
                type="text" 
                name="text"
                required
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                />
              </div>
            </div>

            {/* <!--Input field for Email --> */}
            <div className="input-field">
              <div className="input-cont">
                <i className="fas fa-envelope"></i>
                <input 
                type="text"
                name="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* <!--Input field for Password --> */}
            <div className="input-field">
              <div className="input-cont">
                <i className="fas fa-lock"></i>
                <input 
                type="password" 
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            {/* <!--Input field for Contact --> */}
            <div className="input-field">
              <div className="input-cont">
              <i className="fas fa-thin fa-mobile"></i>
                <input 
                type="number" 
                name="text"
                required
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <button className="btn" type="button" onClick={handleClick}>
              Sign up
            </button> 
            <p className="account-text">
              Already have an account
              <a href="#" id="sign-in-btn2" onClick={handleSignUpClick}>
                Log in
              </a>
            </p>
          </form>
        </div>
        <div className="panels-cont">
          <div className="panel left-panel">
            <div className="content">
              <h3>Already Registered</h3>
              <p>Access your account via Login</p>
              <button
                className="btn"
                id="sign-in-btn"
                onClick={handleLoginModel}
                // onClick={() => {
                //   const cont = document.querySelector(".cont");
                //   cont.classList.remove("sign-up-mode");
                // }}
              >
                Log in
              </button>
            </div>

            <img src={B} alt="" className="image" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>Dont have an account</h3>
              <p>Elevate your shopping experience with your personal account</p>
              <button
                className="btn"
                id="sign-up-btn"
                onClick={handleSignupModel}
                // onClick={() => {
                //   const cont = document.querySelector(".cont");
                //   cont.classList.add("sign-up-mode");
                // }}
              >
                Sign up
              </button>
            </div>
            <img src={A} alt="" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
