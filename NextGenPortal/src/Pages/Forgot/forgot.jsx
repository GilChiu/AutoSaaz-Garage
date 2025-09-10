// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/LoginPage/Navbar/Navbar';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';


const Loginpage = () => {
  return (
    <div>
      <Navbar />
      
      <div>
      <ForgotPassword />
      </div>
    </div>
  );
};

export default Loginpage;