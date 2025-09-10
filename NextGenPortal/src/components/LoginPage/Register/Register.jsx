// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Register.css";
import registerImage from "../../../assets/photo-by-gul.png";
import googleIcon from "../../../assets/google-logo.png";       

import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-container">
      <div className="main-content">
        <img src={registerImage} alt="Student" className="background-image" />
        <div className="form-container">
          <div className="form-card">
            <h2 className="welcome-title">Welcome to NextGEN</h2>
            <form className="register-form">
              <div className="input-group">
                <label className="input-label" htmlFor="fullName">
                  Full Name <span>*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="fullName"
                    className="input-field"
                    placeholder="Enter Contact Person Name"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">
                  Email <span>*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="password">
                  Password <span>*</span>
                </label>
                <div className="password-wrapper">
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    placeholder="Enter Password"
                    required
                  />
                </div>
              </div>

              <Link to="/verification" className="register-button">
                Register
              </Link>

              <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-text">or</div>
                <div className="divider-line"></div>
              </div>

              <button type="button" className="google-button">
                <img src={googleIcon} className="google-icon" alt="Google icon" />
                <span className="google-button-text">Continue with Google</span>
              </button>
            </form>

            <div className="login-section">
              Already have an account?
              <Link to="/login-button" className="login-link">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
