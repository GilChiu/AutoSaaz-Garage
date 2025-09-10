import './Footer.css';

import ExpertIcon from '../../../assets/Homepage/Vector (2).png';
import LogsIcon from '../../../assets/Homepage/streamline_transfer-van.png';
import JobIcon from '../../../assets/Homepage/tick.png';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-header">
        <h3 className="footer-title">Why Choose NextGen CDL Training?</h3>
      </div>
      <div className="footer-icons-section">
        <div className="footer-icon-box">
          <img src={ExpertIcon} alt="Expert Instruction" />
          <p>Expert Instruction</p>
        </div>
        <div className="footer-icon-box">
          <img src={LogsIcon} alt="Electronic Logs" />
          <p>Electronic Logs</p>
        </div>
        <div className="footer-icon-box">
          <img src={JobIcon} alt="Job Placement" />
          <p>Job Placement</p>
        </div>
      </div>
      <div className="footer-bottom">
        <h3 className="footer-subtitle">Be the First to Know!</h3>
        <p className="footer-description">
          Register your interest now to receive update about program launch, pricing information,
          and early enrollment opportunities.
        </p>
        <div className="footer-buttons">
          <button className="btn-join">Join Interest List</button>
          <button className="btn-learn">Learn More</button>
        </div>
        <p className="footer-visit">
          Visit: <a href="https://nextgencareerinstitute.com" target="_blank" rel="noopener noreferrer">nextgencareerinstitute.com</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;