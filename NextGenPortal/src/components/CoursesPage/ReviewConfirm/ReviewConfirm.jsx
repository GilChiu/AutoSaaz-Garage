import './ReviewConfirm.css';
import { Link } from "react-router-dom";
const ReviewConfirm = () => {
  return (
    <div className="review-container">
      <div className="review-card">
        <h2 className="title">Review & Confirm</h2>
        <p className="subtitle">
          Please review your information before completing enrollment
        </p>

        <div className="section">
          <h3>Order Summary:</h3>
          <div className="order-grid">
            <div>
              <p><strong>Course:</strong> NC Prelicensing</p>
              <p><strong>Category:</strong> North Carolina</p>
            </div>
            <div className="order-right">
              <p><strong>Duration:</strong> 75 Hours Required</p>
              <p className="price">$478</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone" />
            <input type="date" placeholder="Date of Birth" />
            <input type="text" placeholder="Address" className="full-width" />
          </div>
        </div>

        <div className="section">
          <h3>Payment Method</h3>
          <div className="payment-method">
            Credit/Debit Card
          </div>
        </div>

        <div className="checkboxes">
          <label>
            <input type="checkbox" /> I agree to the <a href="#">Terms and Conditions</a> and understand the course requirements and refund policy.
          </label>
          <label>
            <input type="checkbox" /> I agree to the <a href="#">Privacy Policy</a> and consent to receive course-related communications.
          </label>
        </div>

        <div className="buttons">
          <Link to="/payment" className="back-btn">← Back</Link>
          <button className="enroll-btn">Complete Enrollment</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirm;
