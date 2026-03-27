import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AgencyNavBar.css'; 


const AgencyNavBar = () => {
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Dashboard', path: '/AgencyHome' }, 
    { name: 'Packages', path: '/AgencyPackage' },
    { name: 'Bookings', path: '/AgencyBookings' },
    { name: 'Messages', path: '/AgencyMessage' },
    { name: 'Settings', path: '/AgencySettings' }
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

  const handleLogout = () => {
    document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login')
  };

  return (
    <nav className="custom-navbar">
      
      <Link to="/AgencyHome" className="navbar-logo">
        <span className="logo-text">Traveley <span className="agency-badge">Agency</span></span>
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
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

    </nav>
  );
};

export default AgencyNavBar;