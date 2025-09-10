import './About.css';
import profileImg from '../../../assets/Homepage/Rectangle 2064.png'; 

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-text">
          <h2 className="about-heading">About Us</h2>
          <h3 className="about-name">Queen Helen</h3>

          <div className="license-buttons">
            <button className="license-btn">NC Instructor License #: 2052</button>
            <button className="license-btn">SC Instructor License #: 1318</button>
          </div>

          <a href="mailto:helen@nextgenci.com" className="about-email">
            helen@nextgenci.com
          </a>

          <p className="about-description">
            Helen Edwards-Jackson is a highly accomplished and licensed instructor in both North Carolina and South Carolina, bringing over a decade of extensive experience in the fields of real estate, education, and entrepreneurship. Her career reflects a deep commitment to excellence, innovation, and student success across all areas of her expertise.

            As the Education Director at NextGen Career Institute, Helen plays a pivotal role in shaping the next generation of real estate professionals and entrepreneurs. She blends her real-world experience with a passion for teaching, offering students a unique, purpose-driven learning environment that goes beyond textbooks and traditional instruction. Her teaching style is interactive, practical, and tailored to help students truly understand and apply key concepts in real-world scenarios.

            Helen’s journey spans years of successfully working in residential and commercial real estate, training aspiring agents, coaching business owners, and developing educational content that empowers learners to achieve personal and professional growth. She understands the challenges and opportunities within the industries she teaches and uses that insight to guide others with clarity, confidence, and care.
          </p>

          <p className="about-note">
            Helen is not just an instructor—she is a mentor, a motivator, and a mission-driven leader who is passionate about unlocking potential and transforming futures.
          </p>

          <div className="about-links">
            <p><strong>🌐 Website:</strong> <a href="https://nextgenci.com">queenhelen.net</a></p>
            <p><strong>📸 Instagram:</strong> <a href="https://instagram.com/carolinadownpaymentdiva">@carolinadownpaymentdiva</a></p>
          </div>

          <button className="about-btn">Join Us →</button>
        </div>
        <div className="about-image-wrapper">
          <img src={profileImg} alt="Queen Helen" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default About;
