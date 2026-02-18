import React from 'react';
import { FaWallet, FaBoxOpen, FaRegCalendarAlt, FaRegComments, FaClock, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import './AgencyHome.css';

const AgencyHome = () => {
  const stats = [
    { id: 1, title: "Total Earnings", value: "$4,250", icon: <FaWallet />, color: "earnings-card" },
    { id: 2, title: "Active Packages", value: "12", icon: <FaBoxOpen />, color: "packages-card" },
    { id: 3, title: "New Bookings", value: "8", icon: <FaRegCalendarAlt />, color: "bookings-card" },
    { id: 4, title: "Unread Messages", value: "5", icon: <FaRegComments />, color: "messages-card" }
  ];

  const recentBookings = [
    { id: "BOK-901", traveler: "Kasun Perera", package: "Ella Adventure Trail", date: "Oct 15, 2026", status: "Pending" },
    { id: "BOK-902", traveler: "Sarah Smith", package: "Royal Heritage Tour", date: "Oct 18, 2026", status: "Confirmed" },
    { id: "BOK-903", traveler: "Nuwan Silva", package: "Mirissa Beach Stay", date: "Oct 20, 2026", status: "Confirmed" },
    { id: "BOK-904", traveler: "Emma Watson", package: "Yala Safari", date: "Oct 22, 2026", status: "Pending" }
  ];

  return (
    <div className="agency-home-container">
      
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Serendipity Travels!</h1>
          <p>Here is what's happening with your business today.</p>
        </div>
        <button className="create-pkg-btn">
          + Create New Package
        </button>
      </div>

      <div className="stats-grid">
        {stats.map(stat => (
          <div className={`stat-card ${stat.color}`} key={stat.id}>
            <div className="stat-icon-wrapper">
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-main-content">
        
        <div className="recent-bookings-section">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <button className="view-all-btn">View All <FaArrowRight className="arrow-icon"/></button>
          </div>
          
          <div className="bookings-list">
            {recentBookings.map(booking => (
              <div className="booking-list-item" key={booking.id}>
                <div className="booking-main-info">
                  <div className="avatar-placeholder">
                    {booking.traveler.charAt(0)}
                  </div>
                  <div>
                    <h4>{booking.traveler}</h4>
                    <p>{booking.package}</p>
                  </div>
                </div>
                <div className="booking-meta">
                  <span className="booking-date">{booking.date}</span>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status === "Confirmed" ? <FaCheckCircle /> : <FaClock />} 
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-tips-section">
          <h2>Quick Tips</h2>
          <div className="tip-card">
            <h4>Optimize Your Packages</h4>
            <p>Add high-quality images to your packages to increase bookings by up to 40%.</p>
          </div>
          <div className="tip-card">
            <h4>Respond Fast</h4>
            <p>Agencies that reply within 1 hour get more confirmed bookings. Check your messages!</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgencyHome;