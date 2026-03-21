import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaSignOutAlt, FaTimes, FaUserShield } from 'react-icons/fa';
import './AdminSideBar.css';

function AdminSidebar({ isOpen, setIsOpen }) {
  return (
    <>
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
          <NavLink 
            to="/AdminDashBoard" 
            className={({ isActive }) => isActive ? "admin-nav-btn active" : "admin-nav-btn"}
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt className="nav-icon" /> Home
          </NavLink>
          
          <NavLink 
            to="/AdminTraveler" 
            className={({ isActive }) => isActive ? "admin-nav-btn active" : "admin-nav-btn"}
            onClick={() => setIsOpen(false)}
          >
            <FaUsers className="nav-icon" /> Travelers
          </NavLink>
          
          <NavLink 
            to="/AdminAgency" 
            className={({ isActive }) => isActive ? "admin-nav-btn active" : "admin-nav-btn"}
            onClick={() => setIsOpen(false)}
          >
            <FaBuilding className="nav-icon" /> Agencies
          </NavLink>
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