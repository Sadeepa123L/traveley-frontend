import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaStar } from 'react-icons/fa';
import './TravelerHome.css';

const TravelerHome = () => {
  const packages = [
    {
      id: 1,
      title: "Sigiriya & Dambulla Tour",
      agency: "Serendipity Travels",
      price: "$120",
      days: "2 Days",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Ella Train Journey & Hike",
      agency: "Wanderlust Lanka",
      price: "$85",
      days: "3 Days",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Mirissa Whale Watching",
      agency: "Ocean Blue Tours",
      price: "$150",
      days: "1 Day",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="traveler-home-container">
    
      <section className="home-hero-section">
        <div className="hero-content">
          <h1>Welcome back, Traveler!</h1>
          <p>Where do you want to go next? Let's find your perfect destination.</p>
          
          {/* Search Bar */}
          <div className="hero-search-bar">
            <div className="search-input-group">
              <FaMapMarkerAlt className="search-icon" />
              <input type="text" placeholder="Destination" />
            </div>
            <button className="hero-search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* --- 2. AI Recommendations Section --- */}
      <section className="home-section">
        <div className="section-header">
          <h2>Top Packages For You</h2>
          <p>Based on your preferences and trending destinations</p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <div className="card-image-wrapper">
                <img src={pkg.image} alt={pkg.title} className="card-image" />
                <div className="card-badge">{pkg.days}</div>
              </div>
              <div className="card-details">
                <div className="card-rating">
                  <FaStar className="star-icon" />
                  <span>{pkg.rating}</span>
                </div>
                <h3 className="card-title">{pkg.title}</h3>
                <p className="card-agency">By {pkg.agency}</p>
                <div className="card-footer">
                  <span className="card-price">{pkg.price}</span>
                  <button className="book-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ai-planner-banner">
        <div className="banner-content">
          <h2>Not sure where to go?</h2>
          <p>Let our Smart AI generate a custom travel itinerary just for you in seconds!</p>
          <button className="ai-plan-btn">Try AI Planner</button>
        </div>
        <div className="banner-image">
        </div>
      </section>

    </div>
  );
};

export default TravelerHome;