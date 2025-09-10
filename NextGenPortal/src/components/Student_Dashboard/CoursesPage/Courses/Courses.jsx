import Sidebar from '../../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  return (
    <div className="courses-page">
      <Sidebar />
      <main className="courses-content">
        <div className="courses-header">
          <Link to="/document" className="courses-documents-link">
            <h2>Courses Documents</h2>
          </Link>
          <h1>Courses</h1>
          <h3><b>North Carolina Real Estate Licensing</b></h3>
          <p>Approved real estate education programs in North Carolina</p>
        </div>
        <div className="cards">
          <div className="card yellow">
            <h4>📘 Prelicensing</h4>
            <p className="hours">75 Hours Required</p>
            <p className="price">$478</p>
            <ul>
              <li>NC License Law</li>
              <li>Fair Housing</li>
              <li>Property Law</li>
              <li>Trust Account</li>
              <li>Math & Brokerage Practices</li>
            </ul>
            <p className="footnote">
              Requirements: 18+, U.S. citizen, background check, NC real estate exam
            </p>
          </div>
          <div className="card blue">
            <h4>📗 Postlicensing</h4>
            <p className="hours">90 Hours Total (3 courses)</p>
            <p className="price">$239</p>
            <ul>
              <li>Post 301: Brokerage</li>
              <li>Post 302: Contract & Closing</li>
              <li>Post 303: Law & Legal</li>
            </ul>
            <p className="footnote">Must complete within 18 months of provisional license</p>
          </div>
          <div className="card green">
            <h4>📒 Continuing Education</h4>
            <p className="hours">8 Hours Annually</p>
            <p className="price">$89 or more</p>
            <ul>
              <li>4-hour BIC Update</li>
              <li>4-hour Elective</li>
              <li>Renewal required</li>
            </ul>
            <p className="footnote">
              Tip: Take early for better availability (before June 10)
            </p>
          </div>
        </div>
        <div className="courses-header sc-header">
          <h1>South Carolina Real Estate Licensing</h1>
          <p>Approved real estate education programs in South Carolina</p>
        </div>

        <div className="cards">
          <div className="card yellow">
            <h4>📙 SC Prelicensing</h4>
            <p className="hours">90 Hours Total</p>
            <p className="price">$449</p>

            <div className="topics">
              <h5>Course Structure:</h5>
              <ul>
                <li>Unit I: 60 hours</li>
                <li>Unit II: 30 hours</li>
                <li>Combined NextGen Course</li>
              </ul>
            </div>

            <div className="requirements">
              <h5>Requirements:</h5>
              <ul>
                <li>18+ years old</li>
                <li>High school diploma or GED</li>
                <li>Complete 90-hour course</li>
                <li>Pass state/national PSI exam</li>
                <li>Background check & application</li>
              </ul>
            </div>
          </div>
          <div className="card green">
            <h4>📗 SC Continuing Education</h4>
            <p className="hours">Hours Every 2 Years</p>
            <p className="price">$69 <span className="per-course">per course</span></p>

            <div className="requirements">
              <h5>Requirements:</h5>
              <ul>
                <li>4-hour Core course</li>
                <li>6-hour Electives</li>
                <li>Renewal every 2 years</li>
              </ul>
            </div>

            <div className="note-box">
              <strong>Note:</strong> All required materials are emailed prior to class. Hardcopy or eBook available at additional cost.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
