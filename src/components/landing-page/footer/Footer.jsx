import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';


function Footer() {

const navigate = useNavigate();

  return (
    <div className="footer-wrapper">
      <footer className="footer-container">
        
        <div className="footer-content">
        
          <div className="footer-brand">
            <h2 className="footer-logo">Traveley<span className="logo-span">Go</span></h2>
            <p className="brand-desc">
              Dedicated to your journey, every day. <br/>
              We connect you with Sri Lanka's best travel agencies for a seamless experience.
            </p>
          </div>
          <div className="footer-links-group">
            <div className="link-column">
              <h3>Explore</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Our Services</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h3>Get Started</h3>
              <ul>
                <li><a href="" onClick={() => navigate('/TravelerSignUp')}>Become a Traveler</a></li>
                <li><a href="" onClick={() => navigate('/AgencySignUp')}>Partner with Us</a></li>
              </ul>
            </div>

          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Traveley Go. All rights reserved.</p>
        </div>

      </footer>
    </div>
  );
};

export default Footer;