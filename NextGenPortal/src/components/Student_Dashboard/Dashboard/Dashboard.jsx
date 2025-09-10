import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import courseImg from "../../assets/Student-Dashboard/course-thumb.png";

// Import icons
import { FaBook, FaClock, FaPlay, FaFileAlt } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Real Estate Fundamentals",
    description: "Learn the basics of real estate investing and property management",
    nextClass: "Today at 3:00 PM",
    progress: "75%",
    documents: 3,
    image: courseImg,
  },
  {
    id: 2,
    title: "Real Estate Fundamentals",
    description: "Learn the basics of real estate investing and property management",
    nextClass: "Today at 3:00 PM",
    progress: "75%",
    documents: 3,
    image: courseImg,
  },
  {
    id: 3,
    title: "Real Estate Fundamentals",
    description: "Learn the basics of real estate investing and property management",
    nextClass: "Today at 3:00 PM",
    progress: "75%",
    documents: 3,
    image: courseImg,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Welcome back, Student!</h2>
          <p>Continue your real estate education journey</p>
        </header>

        <section className="stats-cards">
          <div className="stat-card total-courses">
            <div className="icon-wrapper">
              <FaBook className="stat-icon" />
            </div>
            <div>
              <h4>Total Courses</h4>
              <p><strong>3</strong></p>
            </div>
          </div>

          <div className="stat-card average-progress">
            <div className="icon-wrapper green">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#2ebd85"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                className="stat-icon"
                aria-hidden="true"
              >
                <polyline points="3 17 9 11 13 15 21 7" />
              </svg>
            </div>
            <div>
              <h4>Average Progress</h4>
              <p><strong>73%</strong></p>
            </div>
          </div>

          <div className="stat-card next-class">
            <div className="icon-wrapper purple">
              <FaClock className="stat-icon" />
            </div>
            <div>
              <h4>Next Class</h4>
              <p><strong>Jan 15, 11:00 AM</strong></p>
            </div>
          </div>
        </section>

        <section className="courses-section">
          <h3>My Courses</h3>
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <div className="image-wrapper">
                  <img src={course.image} alt={`${course.title} thumbnail`} />
                  <span className="badge">{course.progress} Completed</span>
                </div>
                <h4>{course.title}</h4>
                <p>{course.description}</p>

                <div className="class-info">
                  <FaClock className="course-icon purple" />
                  Next Class: {course.nextClass}
                </div>

                <div className="course-buttons">
                  <button className="btn btn-primary">
                    <FaPlay className="btn-icon" /> Join Live Class
                  </button>
                  <button className="btn btn-outline">
                    <FaFileAlt className="btn-icon" /> Documents ({course.documents})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
