import { useState } from "react";
import { FaHome, FaBook, FaComments, FaEnvelope, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/WhatsApp_Image_2025-07-12_at_8.08.02_PM-removebg-preview 1.png";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <aside className="sidebar desktop-only">
        <div className="sidebar-header">
          <img src={logo} alt="NextGen Career Institute Logo" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/">
                <FaHome className="icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/document">
                <FaBook className="icon" /> Courses
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FaEnvelope className="icon" /> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <FaComments className="icon" /> Live Chat
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="mobile-navbar mobile-only">
        <div className="mobile-nav-header">
          <img src={logo} alt="NextGen" className="mobile-logo" />
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-dropdown">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <FaHome className="icon" /> Home
            </Link>
            <Link to="/document" onClick={() => setMenuOpen(false)}>
              <FaBook className="icon" /> Courses
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <FaEnvelope className="icon" /> Contact Us
            </Link>
            <Link to="/chat" onClick={() => setMenuOpen(false)}>
              <FaComments className="icon" /> Live Chat
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
