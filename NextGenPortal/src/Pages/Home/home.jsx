// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/Homepage/Navbar/Navbar';
import Header from '../../components/Homepage/Header/Header';
import InstructorSection from '../../components/Homepage/Instructor/Instructor';
import Courses from '../../components/Homepage/Courses/Courses';
import SouthCarolina from '../../components/Homepage/SouthCarolina/SouthCarolina';
import JoinTeam from '../../components/Homepage/JoinTeam/JoinTeam';
import CDLProgramSection from '../../components/Homepage/CDLProgramSection/CDLProgramSection';
import Footer from '../../components/Homepage/Footer/Footer';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div>
      <InstructorSection />
      <Courses />
      <SouthCarolina />
      <JoinTeam />
      <CDLProgramSection />
      <Footer />
      </div>
    </div>
  );
};

export default Homepage;