import { Link } from "react-router-dom";
import "./Detail.css";

const PrelicensingFaqs = () => {
  return (
    <div className="container">
      <h2 className="title">
        📘 <span>Prelicensing</span>
      </h2>
      <p className="subtitle">
        Complete 75-hour prelicensing course required to obtain your real estate license.
      </p>
      <div className="course-info">
        <p><i className="fas fa-clock"></i> 75 Hours Required</p>
        <p><i className="fas fa-dollar-sign"></i></p>
      </div>

      <div className="topics-requirements">
        <div className="column">
          <h4>Course Topics:</h4>
          <ul>
            <li><i className="fas fa-check-square green"></i> NC License Law</li>
            <li><i className="fas fa-check-square green"></i> Fair Housing</li>
            <li><i className="fas fa-check-square green"></i> Contract</li>
            <li><i className="fas fa-check-square green"></i> Property Law</li>
            <li><i className="fas fa-check-square green"></i> Trust Account</li>
            <li><i className="fas fa-check-square green"></i> Math & Brokerage Practices</li>
          </ul>
        </div>
        <div className="column">
          <h4>Requirements:</h4>
          <ul>
            <li><i className="fas fa-info-circle blue"></i> Must be 18+ years old</li>
            <li><i className="fas fa-info-circle blue"></i> U.S citizenship or lawful presence</li>
            <li><i className="fas fa-info-circle blue"></i> Complete 75-hour course</li>
            <li><i className="fas fa-info-circle blue"></i> Background check & application</li>
            <li><i className="fas fa-info-circle blue"></i> Pass NC real estate exam</li>
          </ul>
        </div>
      </div>

      <div className="included-box">
        <h4>What&apos;s Included:</h4>
        <ul>
          <li><i className="fas fa-check green"></i> Online course materials and resources</li>
          <li><i className="fas fa-check green"></i> Interactive learning modules</li>
          <li><i className="fas fa-check green"></i> Practice exams and quizzes</li>
          <li><i className="fas fa-check green"></i> Provide meeting link</li>
          <li><i className="fas fa-check green"></i> 24/7 student support</li>
          <li><i className="fas fa-check green"></i> Certificate of completion</li>
          <li><i className="fas fa-check green"></i> Mobile-friendly platform</li>
        </ul>
      </div>

      <div className="buttons">
        <Link to="/courses" className="btn back">← Back to courses</Link>
        <Link to="/enrollment" className="btn enroll">Continue to Enrollment →</Link>
      </div>
    </div>
  );
};

export default PrelicensingFaqs;
