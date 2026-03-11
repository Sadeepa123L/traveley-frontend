import React, { useState, useEffect } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginBg from '../../assets/HomeImg.jpg'; 

import {loginTraveler} from '../../services/travelerService'
import {loginAgency} from '../../services/agencyService'
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Login () {
  const [userType, setUserType] = useState('traveler'); 
  const [showPassword, setShowPassword] = useState(false);

  //Traveler Login states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  //Handle the login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      let result;

      if(userType === 'traveler'){
        result = await loginTraveler(username, password);
      }else{
        result = await loginAgency(username, password);
      }

      const jwtToken = result.data.accessToken;
      //save token in cookies
      Cookies.set('jwt_token', jwtToken, { expires: 7, secure: true, sameSite: 'strict' });

      const decodeToken = jwtDecode(jwtToken);
      const userRole = decodeToken.role;
      
      console.log("My Backend Sent This Role: ", userRole);

      toast.success(result.message || "Login Successful!");

      setTimeout(() => {
        if (userRole === 'TRAVELER') {
          navigate('/TravelerDashBoard');
        } else if (userRole === 'AGENCY') {
          navigate('/AgencyDashBoard');
        } else if (userRole === 'ADMIN') {
          navigate('/AdminDashBoard');
        } else {
          navigate('/'); 
        }
      }, 1000);

    }catch(err){
      toast.error(err.message || "Invalid username or password");
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">

      <Toaster position="top-right" />

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

        <form className="login-form" onSubmit={handleLogin}>
          
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Username or Email" required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

    
          <button type="submit" className="login-btn" disabled={isLoading}>
                 {isLoading 
              ? 'Signing in...' 
              : (userType === 'traveler' ? 'Login to Account' : 'Login to Dashboard')}
          </button>

       
          <div className="divider">
            <span>Or continue with</span>
          </div>

          {userType === 'traveler' && (
            <>
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <button type="button" className="google-btn">
                <FcGoogle className="google-icon" /> 
                Sign in with Google
              </button>
            </>
          )}

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