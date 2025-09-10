// eslint-disable-next-line no-unused-vars
import React from 'react';
import './North.css';

const North = () => {
  return (
    <section className="courses-section">
      <h2 className="section-title">North Carolina Real Estate Licensing</h2>
      <p className="section-subtitle">Approved real estate education programs in North Carolina</p>
      <div className="underline"></div>

      <section className="courses-container">
        <article className="course-card card-yellow">
          <h3 className="course-title">
            <a href="/prelicensing-faqs" target="_blank" rel="noopener noreferrer">
              <span role="img" aria-label="book">📖</span> Prelicensing
            </a>
          </h3>
          <p className="course-hours"><span>⏱️</span> 75 Hours Required</p>
          <p className="course-price"><span>$</span><strong>449</strong></p>

          <div className="course-content">
            <p className="course-section-title">Topics Include:</p>
            <ul className="course-list">
              <li>NC License Law</li>
              <li>Fair Housing</li>
              <li>Contract</li>
              <li>Property Law</li>
              <li>Trust Account</li>
              <li>Math & Brokerage Practices</li>
            </ul>

            <p className="course-section-title requirements-title">Requirements:</p>
            <ul className="course-list">
              <li>Must be 18+ years old</li>
              <li>U.S citizenship or lawful presence</li>
              <li>Complete 75-hour course</li>
              <li>Background check & application</li>
              <li>Pass NC real estate exam</li>
            </ul>
          </div>

          <a href="/prelicensing-faqs" className="course-link" target="_blank" rel="noopener noreferrer">
            Prelicensing FAQs ↗
          </a>
        </article>

        <article className="course-card card-blue">
          <h3 className="course-title">
            <a href="/post-licensing-faqs" target="_blank" rel="noopener noreferrer">
              <span role="img" aria-label="clipboard">📋</span> Postlicensing
            </a>
          </h3>
          <p className="course-hours"><span>⏱️</span> 90 Hours Total (3 courses/ 30 Hours Each)</p>
          <p className="course-price">
            <span>$</span><strong>239</strong> / per course
          </p>

          <div className="course-content">
            <p className="course-section-title requirements-title">Required Courses:</p>
            <ul className="course-list">
              <li>Post 301-Brokerage relationship</li>
              <li>Post 302-Contract & Closing</li>
              <li>Post 303-NC Law & Legal Concept</li>
            </ul>
            <div className="highlight-box-yellow">
              <strong>Important:</strong> Must complete within 18 months of provisional license
            </div>
          </div>

          <a href="/post-licensing-faqs" className="course-link" target="_blank" rel="noopener noreferrer">
            Post Licensing FAQs ↗
          </a>
        </article>

        <article className="course-card card-green">
          <h3 className="course-title">
            <a href="/continuing-education-faqs" target="_blank" rel="noopener noreferrer">
              <span role="img" aria-label="check">✅</span> Continuing Education
            </a>
          </h3>
          <p className="course-hours"><span>⏱️</span> 8 Hours Annually</p>
          <p className="course-price">
            <span>$</span><strong>69</strong> <small>per course (4 hour)</small>
          </p>

          <div className="course-content">
            <p className="course-section-title requirements-title">Required Courses:</p>
            <ul className="course-list">
              <li>4-hour Update or BIC Update</li>
              <li>4-hour Elective</li>
              <li>Required after 2nd renewal</li>
              <li>Complete by June 10 annually</li>
            </ul>

            <div className="highlight-box-green">
              <strong>Tips:</strong> Don’t wait until the last minute! Take courses early for better availability.
            </div>
          </div>

          <a href="/continuing-education-faqs" className="course-link" target="_blank" rel="noopener noreferrer">
            Continuing Education FAQs ↗
          </a>
        </article>
      </section>
    </section>
  );
};

export default North;
