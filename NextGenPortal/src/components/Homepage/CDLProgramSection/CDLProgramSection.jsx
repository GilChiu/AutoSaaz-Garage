// eslint-disable-next-line no-unused-vars
import React from 'react';
import './CDLProgramSection.css';

const CDLProgramSection = () => {
  return (
    <section className="cdl-program-section">
      <h2 className="cdl-title">CDL Class A Trucking Program</h2>
      <div className="cdl-badges">
        <span className="cdl-badge blue">NextGen Logistics & Driving Scool</span>
        <span className="cdl-badge green">Coming soon</span>
      </div>

      <div className="cdl-cards-row">
        <div className="cdl-card left">
          <h3 className="cdl-card-header blue-bg">
            <i className="icon-calendar" /> Program Launch Details
          </h3>
          <div className="cdl-card-content">
            <div className="launch-item">
              <span className="icon">🟢</span>
              <div>
                <strong>Fall 2025</strong>
                <p>Date to be announced</p>
              </div>
            </div>
            <div className="launch-item">
              <span className="icon">📍</span>
              <div>
                <strong>Charlotte, NC</strong>
                <p>Training location</p>
              </div>
            </div>

            <div className="benefits-box">
              <strong>Early Registration Benefits</strong>
              <ul>
                <li>Priority placement in first cohort</li>
                <li>Early bird pricing discount</li>
                <li>Extended payment plan option</li>
                <li>Free per-course preparation materials</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="cdl-card right">
          <h3 className="cdl-card-header green-bg">
            <i className="icon-check" /> CLD Basic Requirements
          </h3>
          <div className="cdl-card-content">
            <ul className="requirements-list">
              <li>Must be 18 for interstate travel</li>
              <li>Valid driver’s license</li>
              <li>Pass DOT Physical & drug screening</li>
              <li>Obtain CLP (Commercial Learner’s Permit)</li>
              <li>Complete classroom & road instruction</li>
              <li>Pass NC CDL exam</li>
            </ul>

            <div className="benefits-box">
              <strong>Program Feature:</strong>
              <ul>
                <li>Comprehensive classroom instruction</li>
                <li>Hands-on driving experience</li>
                <li>Industry-experienced instruction</li>
                <li>Modern training equipment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CDLProgramSection;
