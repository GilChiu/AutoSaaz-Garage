import { Link } from 'react-router-dom';
import './Enrollment.css';

const Enrollment = () => {
  return (
    <div className="enrollment-container">
      <div className="enrollment-card">
        <h2>Personal Information</h2>
        <p>Please provide your personal details for enrollment</p>
        <form className="enrollment-form">
          <div className="row">
            <input type="text" placeholder="First name *" required />
            <input type="text" placeholder="Last Name *" required />
          </div>
          <div className="row">
            <input type="email" placeholder="Email Address *" required />
            <input type="tel" placeholder="Phone Number *" required />
          </div>
          <div className="row">
            <input type="text" placeholder="Address *" required />
          </div>
          <div className="row">
            <input type="text" placeholder="City *" required />
            <input type="text" placeholder="State *" required />
            <input type="text" placeholder="ZIP Code *" required />
          </div>
          <div className="row">
            <input type="date" placeholder="Date of Birth *" required />
          </div>
          <div className="button-row">
            <Link to="/courses" className="btn back">← Back</Link>
            <Link to="/payment" className="btn next">Continue to payment →</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Enrollment;
