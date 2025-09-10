// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Navbar.css';
import logo from '../../../assets/WhatsApp_Image_2025-07-12_at_8.08.02_PM-removebg-preview 1.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <Link to="/"> 
          <img src={logo} alt="NextGen Logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
