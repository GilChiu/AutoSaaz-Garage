// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import HeaderImage from "../../../assets/Pexels Photo by energepic.com.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="header-section">
      <div className="header-container">
        <div className="header-left">
          <img src={HeaderImage} alt="Login Illustration" />
        </div>
        <div className="header-right">
          <h1>Welcome to NextGen
             Career Institute</h1>
          <button className="login-button" onClick={() => navigate("/login-button")}>
            Login
          </button>
          <p className="register-text">
            Don’t have an account?{" "}
            <span
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
