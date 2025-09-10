import './South.css';

const South = () => {
  return (
    <section className="sc-licensing-section">
      <h2 className="sc-section-title">South Carolina Real Estate Licensing</h2>
      <p className="sc-section-subtitle">Approved real estate education programs in South Carolina</p>
      <div className="sc-underline"></div>

      <section className="sc-cards-container">
        <article className="sc-course-card sc-card-orange">
          <h3 className="sc-course-title">
            <span role="img" aria-label="book">📖</span>
            <a href="/sc-prelicensing" className="sc-link">SC Prelicensing</a>
          </h3>
          <p className="sc-course-hours">⏱️ 90 Hours Total</p>
          <p className="sc-course-price">$ <strong>478</strong></p>
          <div className="sc-course-content">
            <p className="sc-course-structure-title"><strong>Course Structure:</strong></p>
            <ul className="sc-course-list">
              <li>Unit I: 60 hours</li>
              <li>Unit II: 30 hours</li>
              <li>Combined NextGen Course</li>
            </ul>
            <p className="sc-requirements-title"><strong>Requirements:</strong></p>
            <ul className="sc-course-list">
              <li>18+ years old</li>
              <li>High school diploma or GED</li>
              <li>Complete 90-hour course</li>
              <li>Pass state/national PSI exam</li>
              <li>Background check & application</li>
            </ul>
          </div>
        </article>
        <article className="sc-course-card sc-card-green">
          <h3 className="sc-course-title">
            <span role="img" aria-label="book">📖</span>
            <a href="/sc-continuing-education" className="sc-link">SC Continuing Education</a>
          </h3>
          <p className="sc-course-hours">Hours Every 2 Years</p>
          <p className="sc-course-price">
            $ <strong>69</strong> per 4 hour course / $ <strong>79</strong> per 6 hour course
          </p>
          <div className="sc-course-content">
            <p className="sc-requirements-title"><strong>Requirements:</strong></p>
            <ul className="sc-course-list">
              <li>4-hour Core course</li>
              <li>6-hour Electives</li>
              <li>Renewal every 2 years</li>
            </ul>
            <p><strong>SC Real Estate Commission Website:</strong></p>
            <ul className="sc-links-list">
              <li><a href="https://www.llr.sc.gov/re/" target="_blank" rel="noopener noreferrer">llr.sc.gov/re</a></li>
              <li><a href="/fingerprinting" target="_blank" rel="noopener noreferrer">Fingerprinting & Background Info (PDF)</a></li>
              <li><a href="/exam-guide" target="_blank" rel="noopener noreferrer">PSI Exam Guide</a></li>
              <li><a href="/bulletin" target="_blank" rel="noopener noreferrer">PSI Bulletin</a></li>
              <li><a href="/license-application" target="_blank" rel="noopener noreferrer">SC Real Estate License Application - Apply Online</a></li>
            </ul>
            <div className="sc-note-box">
              <strong>Note:</strong> All required materials are emailed prior to class. Hardcopy or eBook available at additional cost.
            </div>
          </div>
        </article>
      </section>
    </section>
  );
};

export default South;


