// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Instructor.css";
import instructorImage from "../../../assets/Homepage/Rectangle 2064.png";
import borderImage from "../../../assets/Homepage/Rectangle 2065.png"; 

import {
  PiSealCheckFill,
  PiClockCountdownFill,
  PiUsersThreeFill,
  PiGearSixFill,
} from "react-icons/pi";

const Instructor = () => {
  return (
    <section className="instructor-section">
      <h2 className="section-title">Meet Your Instructor</h2>
      <p className="section-subtitle">
        Learn from an experienced educator with the credentials and real-world
        knowledge to guide your success.
      </p>

      <div className="instructor-container">
        <div className="instructor-image-wrapper">
          <img src={borderImage} alt="Dotted Border" className="dotted-border" />
          <img
            src={instructorImage}
            alt="Helen Edwards-Jackson"
            className="instructor-image"
          />
        </div>

        <div className="instructor-info">
          <h3 className="instructor-name">Helen Edwards-Jackson</h3>
          <p className="instructor-title">Education Director</p>

          <div className="license-buttons">
            <button className="license-btn">NC Instructor License #: 2052</button>
            <button className="license-btn">SC Instructor License #: 1318</button>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <PiSealCheckFill className="info-icon" />
            </div>
            <div>
              <p className="info-title">Licensed Professional</p>
              <p className="info-description">
                Licensed instructor in both North Carolina and South Carolina with
                all current certifications and continuing education requirements met.
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <PiClockCountdownFill className="info-icon" />
            </div>
            <div>
              <p className="info-title">Decade of Experience</p>
              <p className="info-description">
                Over 10 years of combined experience in real estate, education, and
                entrepreneurship, bringing real-world knowledge to the classroom.
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <PiUsersThreeFill className="info-icon" />
            </div>
            <div>
              <p className="info-title">Empowering Mission</p>
              <p className="info-description">
                Dedicated to helping students walk in purpose, receive proper
                preparation, and gain the provision needed to succeed in real estate
                and entrepreneurship.
              </p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <PiGearSixFill className="info-icon" />
            </div>
            <div>
              <p className="info-title">Empowering Mission</p>
              <p className="info-description">
                Dedicated to helping students walk in purpose, receive proper
                preparation, and gain the provision needed to succeed in real estate
                and entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
