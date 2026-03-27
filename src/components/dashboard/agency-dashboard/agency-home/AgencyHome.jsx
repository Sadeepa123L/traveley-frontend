import React, { useEffect, useState } from 'react';
import { FaWallet, FaBoxOpen, FaRegCalendarAlt, FaRegComments, FaMapMarkerAlt, FaUsers, FaCircle, FaInfoCircle } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AgencyHome.css';
import toast, { Toaster } from 'react-hot-toast';

import { getTopPackages, getWeeklyRevenue, resentBookings } from '../../../../services/bokkingService';

const AgencyHome = () => {
  
  const [topPackages, setTopPackages] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const stats = [
    { id: 1, title: "Total Earnings", value: "$4,250", icon: <FaWallet />, color: "earnings-card" },
    { id: 2, title: "Active Packages", value: "12", icon: <FaBoxOpen />, color: "packages-card" },
    { id: 3, title: "New Bookings", value: "8", icon: <FaRegCalendarAlt />, color: "bookings-card" },
    { id: 4, title: "Unread Messages", value: "5", icon: <FaRegComments />, color: "messages-card" }
  ];

  const isDataEmpty = topPackages.length === 0 && recentBookings.length === 0;

  // Fetch top packages data from the backend
  const fetchTopPackages = async () => {
    try {
      const data = await getTopPackages();
      if(Array.isArray(data.data)){
        setTopPackages(data.data);
      } else {
        setTopPackages(data || []);
      }
    } catch (error) {
      toast.error("Error Loading top Packages");
    }
  }

  // Fetch weekly revenue chart data from the backend
  const fetchWeeklyRevenue = async () => {
    try {
      const data = await getWeeklyRevenue();
      setChartData(data);
      console.log(data);
    } catch (error) {
      toast.error("Error loading chart data");
    }
  };

  // Fetch recent bookings data from the backend
  const fetchResentPackages = async () => {
    try {
      const data = await resentBookings();
      setRecentBookings(data || []);
    } catch(error) {
      toast.error("Error loading Recent bookings");
    }
  }

  // Load all initial dashboard data
  useEffect(() => {
    fetchTopPackages();
    fetchWeeklyRevenue();
    fetchResentPackages();
  }, []);

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

      {isDataEmpty && (
        <div className="empty-state-banner" style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', border: '1px solid #ffe69c' }}>
          <FaInfoCircle size={30} color="#856404" />
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: '#856404' }}>Complete Your Setup!</h3>
            <p style={{ margin: '0', color: '#856404' }}>It looks like you don't have any bookings or packages yet. Please make sure your <strong>Agency Profile</strong> is updated and add your first Tour Package to start seeing your stats here.</p>
          </div>
        </div>
      )}

      <div className="dashboard-main-content">
        
        <div className="top-row-grid">
          <div className="chart-section">
            <h2>Revenue Overview (This Week)</h2>
            <div className="chart-container" style={{ width: "100%", height: "350px" }}>
              {chartData && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart key={chartData.length} data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c87a2c" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#c87a2c" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="dateName" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#111' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#c87a2c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <p>Loading Chart Data...</p>
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-header">
              <h2>Recent Bookings</h2>
              <button className="view-all-text-btn">View All</button>
            </div>
            
            <div className="recent-activity-list">
              {recentBookings.length > 0 ? (
                recentBookings.map(booking => (
                  <div className="activity-item-modern" key={booking.id}>
                    <div className="activity-bullet new">
                      <FaCircle />
                    </div>
                    <div className="activity-content-modern">
                      <p>
                        <span className="activity-user">{booking.travelerName}</span> booked <span className="activity-pkg">{booking.tourPackageName}</span>
                      </p>
                      <small>{booking.travelDate} • {booking.guestCount} Guests • <span style={{fontWeight: 'bold', color: '#c87a2c'}}>${booking.totalPrice}</span></small>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No recent bookings found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bottom-full-section">
          <h2>Top Performing Packages</h2>
          <div className="top-packages-grid">
            {topPackages.length > 0 ? (
              topPackages.map((pkg, index) => (
                <div className="top-package-card" key={pkg.id || index}>
                  <div className="pkg-image-wrapper">
                    <div className="pkg-rank-badge">#{index + 1}</div>
                    <img src={pkg.imageUrl || pkg.image} alt={pkg.title || pkg.name} />
                  </div>
                  <div className="top-pkg-content">
                    <h4>{pkg.title || pkg.name}</h4>
                    <p>{pkg.count || pkg.totalBookings} Total Bookings</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#888' }}>No top packages to display yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgencyHome;