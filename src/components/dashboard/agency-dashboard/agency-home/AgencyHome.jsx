import React from 'react';
import { FaWallet, FaBoxOpen, FaRegCalendarAlt, FaRegComments, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AgencyHome.css';
import { Toaster } from 'react-hot-toast';

const AgencyHome = () => {

  const stats = [
    { id: 1, title: "Total Earnings", value: "$4,250", icon: <FaWallet />, color: "earnings-card" },
    { id: 2, title: "Active Packages", value: "12", icon: <FaBoxOpen />, color: "packages-card" },
    { id: 3, title: "New Bookings", value: "8", icon: <FaRegCalendarAlt />, color: "bookings-card" },
    { id: 4, title: "Unread Messages", value: "5", icon: <FaRegComments />, color: "messages-card" }
  ];

  const chartData = [
    { name: 'Mon', bookings: 4, revenue: 1200 },
    { name: 'Tue', bookings: 7, revenue: 2100 },
    { name: 'Wed', bookings: 3, revenue: 900 },
    { name: 'Thu', bookings: 8, revenue: 2400 },
    { name: 'Fri', bookings: 12, revenue: 3600 },
    { name: 'Sat', bookings: 15, revenue: 4500 },
    { name: 'Sun', bookings: 10, revenue: 3000 },
  ];

  const upcomingTours = [
    { id: 1, package: "Kandy Cultural Tour", date: "26", month: "Oct", guests: 4, location: "Kandy" },
    { id: 2, package: "Ella Train Journey", date: "28", month: "Oct", guests: 2, location: "Ella" },
    { id: 3, package: "Sigiriya Sunrise", date: "02", month: "Nov", guests: 6, location: "Sigiriya" },
  ];

  const topPackages = [
    { 
      id: 1, 
      name: "Ella 3-Day Adventure", 
      bookings: 45, 
      image: "https://images.unsplash.com/photo-1586222818106-47c627ba1407?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 2, 
      name: "Mirissa Whale Watching", 
      bookings: 38, 
      image: "https://images.unsplash.com/photo-1598890777032-bdeef3ebe4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 3, 
      name: "Galle Fort Heritage Walk", 
      bookings: 29, 
      image: "https://images.unsplash.com/photo-1537551080512-faf7ec8beee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
  ];

  return (
    <div className="agency-home-container">
      <Toaster position="top-right" />
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
        
        <div className="top-row-grid">
          <div className="chart-section">
            <h2>Revenue Overview (This Week)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c87a2c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#c87a2c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#111' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#c87a2c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="sidebar-section">
            <h2>Upcoming Departures</h2>
            <div className="upcoming-list">
              {upcomingTours.map(tour => (
                <div className="upcoming-item" key={tour.id}>
                  <div className="date-badge">
                    <span>{tour.date}</span>
                    <small>{tour.month}</small>
                  </div>
                  <div className="upcoming-info">
                    <h4>{tour.package}</h4>
                    <p><FaMapMarkerAlt /> {tour.location} &nbsp;&nbsp; <FaUsers /> {tour.guests} Guests</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-full-section">
          <h2>Top Performing Packages</h2>
          <div className="top-packages-grid">
            {topPackages.map((pkg, index) => (
              <div className="top-package-card" key={pkg.id}>
                <div className="pkg-image-wrapper">
                  <div className="pkg-rank-badge">#{index + 1}</div>
                  <img src={pkg.image} alt={pkg.name} />
                </div>
                <div className="top-pkg-content">
                  <h4>{pkg.name}</h4>
                  <p>{pkg.bookings} Total Bookings</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgencyHome;