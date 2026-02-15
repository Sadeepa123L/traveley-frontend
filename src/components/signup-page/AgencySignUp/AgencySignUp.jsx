import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AgencySignUp.css';
import { FcGoogle } from 'react-icons/fc'; 
import { FaEnvelope, FaBuilding, FaPhone, FaLock, FaEye, FaEyeSlash, FaGlobe } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SideImg from '../../../assets/BackgroundTwo.jpg'; 
import MainImg from '../../../assets/SignUpImgTwo.jpg'

const AgencySignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="as-container">
      
      <img src={SideImg} alt="Background" className="as-bg-img" />
      <div className="as-overlay"></div>

      <div className="as-card" data-aos="zoom-in">
        <div className="as-form-section">
          
          <div className="as-top-brand">
            <FaGlobe className="brand-icon" />
            <span>TRAVELEY PARTNER</span>
          </div>

          <div className="as-header">
            <h1>Grow your business.</h1>
            <p>Register your agency to manage bookings.</p>
          </div>
          <button className="as-google-btn">
            <FcGoogle className="google-icon" /> 
            Continue with Google
          </button>

          <div className="as-divider">
            <span>or sign up with email</span>
          </div>
          <form className="as-form">
            <div className="as-input-group">
              <FaBuilding className="as-icon" />
              <input type="text" placeholder="Agency Name" required />
            </div>

            <div className="as-input-group">
              <FaEnvelope className="as-icon" />
              <input type="email" placeholder="Business Email" required />
            </div>

            <div className="as-input-group">
              <FaPhone className="as-icon" />
              <input type="tel" placeholder="Phone Number" required />
            </div>

            <div className="as-input-group">
              <FaLock className="as-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create Password" 
                required 
              />
              <span className="as-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="as-submit-btn">
              Register Agency
            </button>
          </form>

          <p className="as-login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>

        </div>

        <div className="as-image-section">
          <img src={MainImg} alt="Office" className="as-main-img" />
          <div className="as-img-overlay">
            <div className="as-location-info">
              <h3>Partner Dashboard</h3>
              <p>Manage Tours & Packages</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgencySignUp;