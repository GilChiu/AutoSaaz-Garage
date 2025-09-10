import './SouthCarolina.css';

const SouthCarolina = () => {
  return (
    <section className="sc-licensing-section">
      <h2 className="sc-title">South Carolina Real Estate Licensing</h2>
      <p className="sc-subtitle">Approved real estate education programs in South Carolina</p>
      <div className="sc-underline"></div>

      <div className="sc-cards-container">
        <div className="sc-card orange-border">
          <h3 className="sc-card-title">
            <span role="img" aria-label="book">📖</span>{' '}
            <span className="blue-text">SC Prelicensing</span>
          </h3>
          <p className="sc-hours">90 Hours Total</p>
          <p className="sc-price">
            <span>$</span><span className="price-value">478</span>
          </p>
          <hr />
          <p className="sc-subheading">Course Structure:</p>
          <ul className="sc-list">
            <li>Unit I: 60 hours</li>
            <li>Unit II: 30 hours</li>
            <li>Combined NextGen Course</li>
          </ul>
          <p className="sc-subheading">Requirements:</p>
          <ul className="sc-list">
            <li>18+ years old</li>
            <li>High school diploma or GED</li>
            <li>Complete 90-hour course</li>
            <li>Pass state/national PSI exam</li>
            <li>Background check & application</li>
          </ul>
        </div>

        <div className="sc-card green-border">
          <h3 className="sc-card-title">
            <span role="img" aria-label="book">📖</span>{' '}
            <span className="blue-text">SC Continuing Education</span>
          </h3>
          <p className="sc-hours">Hours Every 2 Years</p>
          <p className="sc-price">
            <span>$</span>
            <span className="price-value green-text">69</span> per 4 hour course /{' '}
            <span className="price-value green-text">$79</span> per 6 hour course
          </p>
          <hr />
          <p className="sc-subheading">Requirements:</p>
          <ul className="sc-list">
            <li>4-hour Core course</li>
            <li>6-hour Electives</li>
            <li>Renewal every 2 years</li>
          </ul>

          <div className="sc-links">
            <p>
              SC Real Estate Commission Website:{' '}
              <a href="https://llr.sc.gov/re" target="_blank" rel="noreferrer">
                llr.sc.gov/re
              </a>
            </p>
            <p>Fingerprinting & Background Info (PDF)</p>
            <p>
              <a href="#" target="_blank" rel="noreferrer">
                View PDF
              </a>
            </p>
            <p>PSI Exam Guide</p>
            <p>
              <a href="#" target="_blank" rel="noreferrer">
                PSI Bulletin
              </a>
            </p>
            <p>SC Real Estate License Application</p>
            <p>
              <a href="#" target="_blank" rel="noreferrer">
                Apply Online
              </a>
            </p>
          </div>

          <div className="sc-note">
            <strong>Note:</strong> All required materials are emailed prior to class. Hardcopy or
            eBook available at additional cost.
          </div>
        </div>

        {/* Optional third card with purple border */}
        {/* Uncomment and fill content if needed */}
        {/* 
        <div className="sc-card purple-border">
          <h3 className="sc-card-title">
            <span role="img" aria-label="book">📖</span>{' '}
            <span className="blue-text">Third Course Title</span>
          </h3>
          // Add your content here
        </div> 
        */}
      </div>

      <div className="sc-info-box">
        <h3>🏠 Why Become a Real Estate Associate in South Carolina?</h3>

        <div className="sc-info-columns">
          <div>
            <p>
              <strong>💼 High Earning Potential</strong>
            </p>
            <p>
              Agents in South Carolina average over $95,000 a year and sometimes earn well over
              $100,000. For specifics, or you can work as an agent part-time to earn some extra
              cash.
            </p>
            <a href="#" className="salary-link">
              See salary details →
            </a>
          </div>
          <div>
            <p>
              <strong>People-Focused Industry</strong>
            </p>
            <p>
              Enjoy networking, negotiating, and working with clients? Help others find the homes
              and properties of their dreams.
            </p>

            <p>
              <strong>Flexible Schedule</strong>
            </p>
            <p>Are you tired of your 9-5 job? Work as often or as little as you want.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SouthCarolina;
