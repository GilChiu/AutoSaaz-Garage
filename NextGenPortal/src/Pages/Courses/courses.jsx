// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/Homepage/Navbar/Navbar';
import North from '../../components/CoursesPage/North/North';
import South from '../../components/CoursesPage/South/South';


const Coursespage = () => {
  return (
    <div>
      <Navbar />
      <North />
      <div>
      <South />
      </div>
    </div>
  );
};

export default Coursespage;