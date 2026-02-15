import React, { useState, useEffect } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginBg from '../../assets/HomeImg.jpg'; 

function Login () {
  
  const [userType, setUserType] = useState('traveler'); 
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="login-container">
      <img src={LoginBg} alt="Background" className="login-bg-img" />
      <div className="login-overlay"></div>

      <div className="login-card" data-aos="zoom-in">
        
        <div className="user-toggle">
          <button 
            className={userType === 'traveler' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setUserType('traveler')}
          >
            Traveler
          </button>
          <button 
            className={userType === 'agency' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setUserType('agency')}
          >
            Agency
          </button>
        </div>


        <div className="login-header">
          <h2>{userType === 'traveler' ? 'Welcome Back! 👋' : 'Partner Portal 🏢'}</h2>
          <p>
            {userType === 'traveler' 
              ? 'Login to explore the world with us.' 
              : 'Manage your business and bookings.'}
          </p>
        </div>

        <form className="login-form">
          
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Username or Email" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>


          <div className="form-actions">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

    
          <button type="submit" className="login-btn">
            {userType === 'traveler' ? 'Login to Account' : 'Login to Dashboard'}
          </button>

       
          <div className="divider">
            <span>Or continue with</span>
          </div>

       
          <button type="button" className="google-btn">
            <FcGoogle className="google-icon" /> 
            Sign in with Google
          </button>

        </form>

     
        <div className="login-footer">
          <p>
            Don't have an account? 
            <a href={userType === 'traveler' ? '/customer-signup' : '/agency-signup'}>
               {userType === 'traveler' ? ' Join as a Traveler' : ' Register Agency'}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;