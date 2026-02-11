import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TravelerSignUp.css';
import { FcGoogle } from 'react-icons/fc'; 
import { FaEnvelope, FaUser, FaPhone, FaLock, FaEye, FaEyeSlash, FaGlobe } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SideImg from '../../../assets/BackgroundOne.jpg'; 
import MainImg from '../../../assets/SignUpImg.jpg'

const TravelerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="ts-container">
      
      <img src={SideImg} alt="Background" className="ts-bg-img" />
      <div className="ts-overlay"></div>

      <div className="ts-card" data-aos="zoom-in">
        

        <div className="ts-form-section">
  
          <div className="ts-top-brand">
            <FaGlobe className="brand-icon" />
            <span>TRAVELEY</span>
          </div>

          <div className="ts-header">
            <h1>Start your journey.</h1>
            <p>Sign up to unlock exclusive deals and plan your dream vacation.</p>
          </div>

          <button className="ts-google-btn">
            <FcGoogle className="google-icon" /> 
            Continue with Google
          </button>

          <div className="ts-divider">
            <span>or sign up with email</span>
          </div>

          <form className="ts-form">
            <div className="ts-input-group">
              <FaUser className="ts-icon" />
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="ts-input-group">
              <FaEnvelope className="ts-icon" />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="ts-input-group">
              <FaPhone className="ts-icon" />
              <input type="tel" placeholder="Mobile Number" required />
            </div>
            <div className="ts-input-group">
              <FaLock className="ts-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create Password" 
                required 
              />
              <span className="ts-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="ts-submit-btn">
              Create Account
            </button>
          </form>

          <p className="ts-login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

        </div>

        <div className="ts-image-section">
          <img src={MainImg} alt="Travel Destination" className="ts-main-img" />
          <div className="ts-img-overlay">
            <div className="ts-location-info">
              <h3>Ella, Sri Lanka</h3>
              <p>Explore Nature</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TravelerSignUp;