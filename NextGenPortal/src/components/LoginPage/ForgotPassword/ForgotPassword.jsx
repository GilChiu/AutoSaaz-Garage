// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ForgotPassword.css';
import { Link } from "react-router-dom";
function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive the verification code.</p>

        <label htmlFor="email">Enter Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email Address"
          required
        />

        <Link to="/resend-code" className="send-reset-code-btn">
            Send Reset Code
        </Link>

        <a href="#" className="back-link">
          ← Back
        </a>
      </div>
    </div>
  );
}

export default ForgotPassword;
