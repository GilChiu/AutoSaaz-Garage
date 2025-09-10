// eslint-disable-next-line no-unused-vars
import React from "react";
import "./verify.css";
import { Link } from "react-router-dom";
const Verify = () => {
  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2>Enter Verification Code</h2>
        <p>We’ve sent a 6-digit code to your email or phone number.</p>
        <form className="verify-form" onSubmit={(e) => e.preventDefault()}>
          <div className="code-inputs">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="code-input"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
              />
            ))}
          </div>
          <div className="resend-text">
            Didn&apos;t get the code? <a href="#resend">Resend Code</a>
          </div>
          <Link to="/forgot-password" className="verify-button">
            Verify Code
          </Link>

        </form>
        <a href="#back" className="back-link">
          ← Back
        </a>
      </div>
    </div>
  );
};

export default Verify;
