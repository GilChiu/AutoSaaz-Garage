import { Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Homepage from "./Pages/Home/home";
import LoginPage from "./Pages/Login/login";
import LoginButtonPage from "./Pages/Login-Button/login-button";
import Registration from "./Pages/Register/register";
import Verify from "./Pages/verify/verify"; 
import Forgot from "./Pages/Forgot/forgot"; 
import Resend from "./Pages/Resend-code/resend";
import Codeverification from "./Pages/Codeverification/codeverification";
import Newpass from "./Pages/Newpass/new-pass";
import PassSuccess from "./Pages/PassSuccess/passsuccess";
import About from "./Pages/About/about"; 
import Course from "./Pages/Courses/courses";
import Prelicencing from "./Pages/Precisiling/prelicensing-faqs";
import Enrollment from "./Pages/Enrollment/enrollment";
import Payment from "./Pages/Payment/payment";
import Review from "./Pages/Review/review"; 
import Contact from "./Pages/Contact/contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-button" element={<LoginButtonPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/verification" element={<Verify />} />
      <Route path="/code-verification" element={<Codeverification />} /> 
      <Route path="/forgot-password" element={<Forgot />} />
      <Route path="/resend-code" element={<Resend />} />
      <Route path="/new-password" element={<Newpass />} />
      <Route path="/password-success" element={<PassSuccess />} />
      <Route path="/about" element={<About />} />  
      <Route path="/courses" element={<Course />} />
      <Route path="/prelicensing-faqs" element={<Prelicencing />} />
      <Route path="/enrollment" element={<Enrollment />} />
      <Route path="/payment" element={<Payment />} />  
      <Route path="/review" element={<Review />} /> 
      <Route path="/contact" element={<Contact />} />   
    </Routes>
  );
}

export default App;