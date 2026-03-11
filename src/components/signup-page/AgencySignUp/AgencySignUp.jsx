import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AgencySignUp.css';
import { FcGoogle } from 'react-icons/fc'; 
import { FaEnvelope, FaBuilding, FaPhone, FaLock, FaEye, FaEyeSlash, FaGlobe } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast, { Toaster } from 'react-hot-toast';

import {registerAgency} from '../../../services/agencyService'

import SideImg from '../../../assets/BackgroundTwo.jpg'; 
import MainImg from '../../../assets/SignUpImgTwo.jpg'

const AgencySignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSignUp = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try{
    const result = await registerAgency(username, password);
    toast.success(result.message || "Registration Successful!");
    setUsername('');
    setPassword('');
  }catch(err){
    toast.error(err.message || "Something went wrong!");
  }finally{
    setIsLoading(false);
  }
};

  return (
    <div className="as-container">

      <Toaster position="top-right" />
      
      <img src={SideImg} alt="Background" className="as-bg-img" />
      <div className="as-overlay"></div>

      <div className="as-card" data-aos="zoom-in">
        <div className="as-form-section">
          
          <div className="as-top-brand">
            <FaGlobe className="brand-icon" />
            <span>TRAVELEY</span>
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
          <form className="as-form" onSubmit={handleSignUp}>
            <div className="as-input-group">
              <FaBuilding className="as-icon" />
              <input type="text" placeholder="Username or Email Address" required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="as-input-group">
              <FaLock className="as-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <span className="as-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="as-submit-btn"disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
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