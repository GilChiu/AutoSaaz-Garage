// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './PasswordSuccess.css';

const PasswordSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-box">
        <h2>Password Successfully Reset</h2>
        <p>Your password has been updated. You can now log in securely using your new password.</p>
        <Link to="/login" className="login-button">
          Back To Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordSuccess;
