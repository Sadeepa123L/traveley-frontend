import React, { useEffect, useState } from 'react';
import { FaWallet, FaBoxOpen, FaRegCalendarAlt, FaRegComments, FaMapMarkerAlt, FaUsers, FaCircle } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AgencyHome.css';
import toast, { Toaster } from 'react-hot-toast';


import { getTopPackages, getWeeklyRevenue } from '../../../../services/bokkingService';

const AgencyHome = () => {
  
  const [topPackages, setTopPackages] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([
    { id: 1, user: "Alex Carter", action: "booked", package: "Ella Train Journey", time: "10 mins ago", type: "booking" },
    { id: 2, user: "Sarah Smith", action: "booked", package: "Sigiriya Sunrise", time: "2 hours ago", type: "booking" },
    { id: 3, user: "David John", action: "booked", package: "Kandy Cultural Tour", time: "5 hours ago", type: "booking" },
    { id: 4, user: "Emma Wilson", action: "booked", package: "Yala Safari", time: "1 day ago", type: "booking" },
  ]);

  const stats = [
    { id: 1, title: "Total Earnings", value: "$4,250", icon: <FaWallet />, color: "earnings-card" },
    { id: 2, title: "Active Packages", value: "12", icon: <FaBoxOpen />, color: "packages-card" },
    { id: 3, title: "New Bookings", value: "8", icon: <FaRegCalendarAlt />, color: "bookings-card" },
    { id: 4, title: "Unread Messages", value: "5", icon: <FaRegComments />, color: "messages-card" }
  ];

  const fetchTopPackages = async () => {
      try {
        const data = await getTopPackages();
        
        if(Array.isArray(data.data)){
          setTopPackages(data.data);
        }else{
          setTopPackages(data);
        }
       } catch (error) {
        toast.error("Error Loading top Packages")
       }
  }

  const fetchWeeklyRevenue = async () => {
    try {
      const data = await getWeeklyRevenue();
      setChartData(data);
    } catch (error) {
      toast.error("Error loading chart data");
    }
  };

  useEffect (() => {
    fetchTopPackages();
    fetchWeeklyRevenue();
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
              {recentBookings.map(activity => (
                <div className="activity-item-modern" key={activity.id}>
                  <div className={`activity-bullet ${activity.type}`}>
                    <FaCircle />
                  </div>
                  <div className="activity-content-modern">
                    <p>
                      <span className="activity-user">{activity.user}</span> {activity.action} <span className="activity-pkg">{activity.package}</span>
                    </p>
                    <small>{activity.time}</small>
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
                  <p>{pkg.totalBookings} Total Bookings</p>
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