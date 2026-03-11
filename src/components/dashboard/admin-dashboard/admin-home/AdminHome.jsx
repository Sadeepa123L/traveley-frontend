import React, { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaSuitcaseRolling, FaMoneyBillWave } from 'react-icons/fa';
import './AdminHome.css';

import toast, { Toaster } from 'react-hot-toast';
import {getPendingAgencies} from '../../../../services/adminService'

function AdminHome() {

  const [recentAgencies, setRecentAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dashboardStats = {
    totalTravelers: 1250,
    totalAgencies: 45,
    totalPackages: 320,
    totalRevenue: "$ 15,400"
  };

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getPendingAgencies();
        setRecentAgencies(data);
      } catch (error) {
        toast.error("Failed to load agencies");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  return (
    <div className="admin-home-container">
      <div className="admin-page-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, Super Admin! Here is what's happening today.</p>
      </div>

      {/* --- Top Summary Cards --- */}
      <div className="admin-stats-grid">
        
        <div className="stat-card">
          <div className="stat-icon-wrapper travelers-icon">
            <FaUsers />
          </div>
          <div className="stat-details">
            <h3>{dashboardStats.totalTravelers}</h3>
            <p>Total Travelers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper agencies-icon">
            <FaBuilding />
          </div>
          <div className="stat-details">
            <h3>{dashboardStats.totalAgencies}</h3>
            <p>Registered Agencies</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper packages-icon">
            <FaSuitcaseRolling />
          </div>
          <div className="stat-details">
            <h3>{dashboardStats.totalPackages}</h3>
            <p>Active Packages</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper revenue-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-details">
            <h3>{dashboardStats.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

      </div>

      {/* --- Recent Activity Table --- */}
      <div className="admin-recent-section">
        <div className="recent-header">
          <h3>Recently Registered Agencies</h3>
          <button className="view-all-btn">View All</button>
        </div>
        
        <div className="recent-table-wrapper">
          {isLoading ? (
             <p style={{ padding: '20px', textAlign: 'center' }}>Loading pending agencies...</p>
          ) : recentAgencies.length === 0 ? (
             <p style={{ padding: '20px', textAlign: 'center' }}>No pending agencies found.</p>
          ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Agency Name</th>
                <th>Registered Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAgencies.map((agency) => (
                <tr key={agency.id}>
                  <td>#{agency.id}</td>
                  <td>{agency.name}</td>
                  <td>{agency.date}</td>
                  <td>
                   <span className={`status-badge ${agency.status ? agency.status.toLowerCase() : ''}`}>
                   {agency.status || 'N/A'}
                   </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

    </div>
  );
}

export default AdminHome;