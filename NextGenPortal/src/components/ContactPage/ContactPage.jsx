import './ContactPage.css';

import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';

import mapImage from '../../assets/Contact/Rectangle 19.png';
import leftShapes from '../../assets/Contact/Group 81.png';
import rightShapes from '../../assets/Contact/Group 82.png';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <img src={leftShapes} alt="Left Shapes" className="shape-left" />
      <img src={rightShapes} alt="Right Shapes" className="shape-right" />

      <div className="contact-card">
        <h2 className="contact-title">CONTACT US</h2>
        <div className="contact-content">
          <div className="contact-form">
            <h3>Leave us a message</h3>
            <input type="text" placeholder="First_Name Last_Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Your Message"></textarea>
            <button className="send-btn">Send</button>
          </div>
          <div className="contact-info">
            <p>
              📍 NextGen Career Institute<br />
              11709 Fruehauf Drive, Suite 126<br />
              Charlotte, NC 28273
            </p>
            <p>📞 980-229-4940</p>
            <p>
              📧 <a href="mailto:helen@queenhelen.net" className="email-link">helen@queenhelen.net</a>
            </p>


            <div className="social-icons">
              <a href="#" target="_blank" rel="noreferrer"><FaYoutube className="icon" /></a>
              <a href="#" target="_blank" rel="noreferrer"><FaFacebookF className="icon" /></a>
              <a href="#" target="_blank" rel="noreferrer"><FaInstagram className="icon" /></a>
            </div>

            <img className="map" src={mapImage} alt="Map" />
            <button className="ticket-btn">Help desk ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
