// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Header.css';
import studentImage from '../../../assets/Homepage/young-student-woman.png';
import iconStudent from '../../../assets/Homepage/02 (1).png';
import iconCourse from '../../../assets/Homepage/03.png';
import iconExpert from '../../../assets/Homepage/01.png';
import { FaCalendarAlt, FaIdCard, FaBriefcase } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header-section">
      <div className="bg-decor"></div>
      <div className="bg-circle one"></div>
      <div className="bg-circle two"></div>

      <div className="header-container">
        <div className="header-left">
          <h1>
            Up Your <span>Skills</span> <br />
            With <span>NextGEN</span> <br />
            To <span>Advance</span> Your <br />
            <span>Career</span> Path
          </h1>
          <p className="subheading">Purpose, Preparation, Provision.</p>

          <div className="features">
            <div className="feature">
              <FaCalendarAlt className="feature-icon" />
              <span>Flexible Start Date</span>
            </div>
            <div className="feature">
              <FaIdCard className="feature-icon" />
              <span>License Support</span>
            </div>
            <div className="feature">
              <FaBriefcase className="feature-icon" />
              <span>Job Placement Help</span>
            </div>
          </div>

          <button className="learn-more-btn">Learn More</button>
        </div>

        <div className="header-right">
          <div className="circle-bg">
            <img src={studentImage} alt="Student" className="main-image" />

            <div className="badge student">
              <img src={iconStudent} alt="Student Icon" />
              <div>
                <strong>2K+</strong>
                <div className="badge-subtext">Students Enrolled</div>
              </div>
            </div>

            <div className="badge course">
              <img src={iconCourse} alt="Course Icon" />
              <div>
                <strong>5K+</strong>
                <div className="badge-subtext">Courses</div>
              </div>
            </div>

            <div className="badge expert">
              <img src={iconExpert} alt="Expert Icon" />
              <div>
                <strong>Experts</strong>
                <div className="badge-subtext">Tutors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
