import { Link } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  return (
    <section className="payment-section">
      <div className="payment-container">
        <h2 className="payment-title">Payment Information</h2>
        <p className="payment-subtext">Secure payment processing</p>

        <div className="order-summary">
          <div className="summary-text">
            <p className="summary-title">Order Summary</p>
            <p className="summary-description">NC Prelicensing</p>
            <p className="summary-hours">75 Hours Required</p>
          </div>
          <div className="summary-price">$478</div>
        </div>

        <form className="payment-form">
          <label>
            Payment Method
            <input type="text" placeholder="Credit/Debit Card" disabled />
          </label>

          <label>
            Name on Card *
            <input type="text" required />
          </label>

          <label>
            Card Number *
            <input type="text" placeholder="1234 3456 7890 1234" required />
          </label>

          <div className="form-row">
            <label>
              Expiry Date *
              <input type="text" placeholder="MM/YY" required />
            </label>

            <label>
              CVV *
              <input type="text" placeholder="123" required />
            </label>
          </div>

          <p className="secure-note">
            Your payment information is secure and encrypted using industry-standard SSL technology.
          </p>

          <div className="form-actions">
            <Link to="/enrollment" className="back-btn">← Back</Link>
            <Link to="/review" className="review-btn">Review Order →</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;
