import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TravelerSignUp.css';
import { FcGoogle } from 'react-icons/fc'; 
import {FaUser, FaLock, FaEye, FaEyeSlash, FaGlobe } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast, { Toaster } from 'react-hot-toast';

import SideImg from '../../../assets/BackgroundOne.jpg'; 
import MainImg from '../../../assets/SignUpImg.jpg'

import { registerTraveler, redirectToGoogle } from '../../../services/travelerService';

const TravelerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState ('');
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try{
    const result = await registerTraveler(username, password);
    toast.success(result.message || "Registration Successful!");
    setUsername('');
    setPassword('');
   }catch (err) {
    toast.error(err.message || "Something went wrong!");
   }finally{
    setIsLoading(false);
   }
  };

  return (
  
    <div className="ts-container">

      <Toaster position="top-right" />
      
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

          <button className="ts-google-btn" onClick={redirectToGoogle}>
            <FcGoogle className="google-icon" /> 
            Continue with Google
          </button>

          <div className="ts-divider">
            <span>or sign up with email</span>
          </div>

          <form className="ts-form" onSubmit={handleSignUp}>
            <div className="ts-input-group">
              <FaUser className="ts-icon" />
              <input type="text" placeholder="Username or Email Address" required
               value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="ts-input-group">
              <FaLock className="ts-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="ts-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="ts-submit-btn" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
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