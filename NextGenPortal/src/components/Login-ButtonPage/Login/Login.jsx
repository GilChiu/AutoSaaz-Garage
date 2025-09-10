// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Login.css";
import loginImage from "../../../assets/photo-by-gul-isik.png";
import googleIcon from "../../../assets/google-logo.png"; 
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="main-content">
        <img src={loginImage} alt="Graduation" className="background-image" />

        <div className="form-container">
          <div className="form-card">
            <h2 className="welcome-title">Welcome Back to NextGen</h2>
            <form className="login-form">
              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input type="email" id="email" className="input-field" placeholder="Enter Email" required />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input type="password" id="password" className="input-field" placeholder="Enter Password" required />
                </div>
              </div>

              <Link to="/forgot-password" className="forgot-password">
                Forgot your password?
              </Link>

              <button type="submit" className="login-button">Log in</button>

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

            <div className="register-section">
                Don’t have an account?
            <Link to="/register" className="register-link">Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
