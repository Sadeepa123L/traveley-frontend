import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TravelerNavBar.css'; 

const TravelerNavBar = () => {
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const menuRef = useRef(null);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/TravelerHome' }, 
    { name: 'Agencies', path: '/TravelerAgencies' },
    { name: 'Packages', path: '/TravelerPackages' },
    { name: 'Booking', path: '/TravelerBooking' }
  ];

  const movePill = (element) => {
    if (!element || !menuRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();

    setPillStyle({
      left: elRect.left - menuRect.left,
      width: elRect.width,
      opacity: 1
    });
  };

  const alignPillToActive = () => {
    const activeLink = menuRef.current?.querySelector('.active-link');
    if (activeLink) {
      movePill(activeLink);
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };
  useEffect(() => {
    alignPillToActive();
  }, [location.pathname]);

  const handleMouseLeave = () => {
    alignPillToActive();
  };

  return (
    <nav className="custom-navbar">
      
      <Link to="/TravelerHome" className="navbar-logo">
        <span className="logo-text">Traveley</span>
      </Link>
      <div className="nav-menu-pill" ref={menuRef} onMouseLeave={handleMouseLeave}>
  
        <div className="sliding-pill" style={pillStyle}></div>

        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`nav-item ${location.pathname === link.path ? 'active-link' : ''}`}
            onMouseEnter={(e) => movePill(e.target)}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="navbar-actions">
        <button className="book-now-btn">
          Book Now
        </button>
      </div>

    </nav>
  );
};

export default TravelerNavBar;  