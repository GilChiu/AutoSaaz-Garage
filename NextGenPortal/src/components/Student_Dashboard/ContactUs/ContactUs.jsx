import "./ContactUs.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar"; 

const ContactUs = () => {
  return (
    <div className="contact-layout"> 
      <Sidebar />

      <div className="contact-wrapper">
        <h2 className="page-title">Get In Touch</h2>

        <div className="contact-card">
          <div className="contact-form-section">
            <h1 className="contact-title">
              Get in <span>Touch</span>
            </h1>
            <p className="contact-subtext">
              Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel,
              ornare non id blandit netus.
            </p>

            <form className="contact-form">
              <input type="text" placeholder="Name *" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone number *" required />
              <select required>
                <option value="">How did you find us?</option>
                <option value="google">Google</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
              </select>
              <button type="submit">SEND MESSAGE</button>
            </form>

            <div className="contact-info">
              <div>
                <FaPhone className="contact-icon" />
                <a href="tel:9802294940">980-229-4940</a>
              </div>
              <div>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:helen@queenhelen.net">helen@queenhelen.net</a>
              </div>
            </div>
          </div>

          <div className="contact-blue-panel" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
