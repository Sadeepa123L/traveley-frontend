import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaStar, FaRegClock, FaTag, FaArrowRight } from 'react-icons/fa';
import './TravelerHome.css';

import { getLatestPackages } from '../../../../services/travelerService';
import toast, { Toaster } from 'react-hot-toast';

const TravelerHome = () => {

  const [latestPackages, setLatestPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPackage, setSelectedPackage] = useState(null);

  const filters = ['All', 'Adventure', 'Honeymoon', 'Cultural', 'Nature'];

  useEffect(() => {
    const fetchLatestPackages = async () => {
      try {
        const data = await getLatestPackages();
        setLatestPackages(data);
      } catch (error) {
        console.error("Error fetching latest packages:", error);
        toast.error("Failed to load top packages.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestPackages();
  }, []);

  const getPackageCategory = (pkg) => {
    const textToSearch = `${pkg.title || ''} ${pkg.description || ''}`.toLowerCase();
    const foundCategory = filters.slice(1).find(f => textToSearch.includes(f.toLowerCase()));
    return foundCategory || 'Tour';
  };

  const openModal = (pkg) => setSelectedPackage(pkg);
  const closeModal = () => setSelectedPackage(null);

  return (
    <div className="traveler-home-container">
      <Toaster position="top-right" />
    
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

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading latest packages...</div>
        ) : latestPackages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>No packages available right now.</div>
        ) : (

        <div className="packages-grid">
          {latestPackages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <div className="card-image-wrapper">
                <img src={pkg.imageUrl || "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463"} alt={pkg.title} className="card-image" />
                <div className="card-badge">{pkg.duration}</div>
              </div>
              <div className="card-details">
                <div className="card-rating">
                  <FaStar className="star-icon" />
                  <span>4.8</span>
                </div>
                <h3 className="card-title">{pkg.title}</h3>
                <p className="card-agency">By {pkg.agencyProfile?.agencyName || "Trusted Agency"}</p>
                <div className="card-footer">
                  <span className="card-price">${pkg.price}</span>
                
                  <button className="book-btn" onClick={() => openModal(pkg)}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
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

      {selectedPackage && (
        <div className="package-modal-overlay" onClick={closeModal}>
          <div className="package-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            
            <div className="modal-body">
              <div className="modal-image-col">
                <img 
                  src={selectedPackage.imageUrl || "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463"} 
                  alt={selectedPackage.title} 
                />
                <div className="modal-price-badge">
                  <span>${selectedPackage.price}</span>
                </div>
              </div>
              
              <div className="modal-details-col">
                <div className="modal-header-info">
                  <span className="modal-category"><FaTag /> {getPackageCategory(selectedPackage)}</span>
                  <span className="modal-duration"><FaRegClock /> {selectedPackage.duration}</span>
                </div>
                
                <h2>{selectedPackage.title}</h2>
                <p className="modal-agency">By <span>{selectedPackage.agencyProfile?.agencyName || "Trusted Agency"}</span></p>
                
                <div className="modal-location">
                  <FaMapMarkerAlt className="loc-icon" /> {selectedPackage.destination}
                </div>
                
                <div className="modal-description">
                  <h3>About this package</h3>
                  <p>{selectedPackage.description || "No description provided for this package. Contact the agency for more details."}</p>
                </div>
                
                <div className="modal-actions">
                  <button className="modal-book-btn">
                    Proceed to Book <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TravelerHome;