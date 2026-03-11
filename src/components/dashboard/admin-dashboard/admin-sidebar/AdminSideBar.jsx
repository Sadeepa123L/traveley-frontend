import React from 'react';
import { FaTachometerAlt, FaUsers, FaBuilding, FaSignOutAlt, FaTimes, FaUserShield } from 'react-icons/fa';
import './AdminSideBar.css';

function AdminSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && <div className="admin-overlay" onClick={() => setIsOpen(false)}></div>}

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <FaUserShield className="brand-icon" />
          <h2>Traveley <span>Admin</span></h2>
          <button className="close-sidebar-btn" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="admin-nav-menu">
          {/* 1. Dashboard Link */}
          <button className="admin-nav-btn active">
            <FaTachometerAlt className="nav-icon" /> Home
          </button>
          
          {/* 2. Travelers Link */}
          <button className="admin-nav-btn">
            <FaUsers className="nav-icon" /> Travelers
          </button>
          
          {/* 3. Agencies Link */}
          <button className="admin-nav-btn">
            <FaBuilding className="nav-icon" /> Agencies
          </button>
        </nav>

        <div className="admin-logout-wrapper">
          <button className="admin-logout-btn">
            <FaSignOutAlt className="nav-icon" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;