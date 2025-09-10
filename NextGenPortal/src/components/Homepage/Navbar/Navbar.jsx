// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/WhatsApp_Image_2025-07-12_at_8.08.02_PM-removebg-preview 1.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-gap"></div>

        <div className="nav-logo">
          <img src={logo} alt="NextGen Logo" />
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["/", "/about", "/courses", "/contact"].map((path, idx) => {
            const labels = ["Home", "About us", "Courses", "Contact us"];
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={isActive ? "active-link" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {labels[idx]}
              </Link>
            );
          })}
        </div>

        <div className={`nav-auth ${menuOpen ? "open" : ""}`}>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
