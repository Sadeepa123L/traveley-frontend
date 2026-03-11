import React from 'react';
import { FaBars } from 'react-icons/fa';
import './AdminNavBar.css'

function AdminNavBar({ setIsOpen }) {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button className="mobile-toggle-btn" onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
        <h1>Traveley</h1>
      </div>
      
      <div className="topbar-right">
        <div className="admin-profile-badge">
          <div className="admin-avatar">A</div>
          <div className="admin-info">
            <span className="admin-name">Super Admin</span>
            <span className="admin-role">System Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavBar;