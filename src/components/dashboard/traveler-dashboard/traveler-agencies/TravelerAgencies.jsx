
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import './TravelerAgencies.css';

import React, { useState, useEffect } from 'react';
import {getActiveAgencies} from '../../../../services/travelerService'
import toast, { Toaster } from 'react-hot-toast';

const TravelerAgencies = () => {
  
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getActiveAgencies();
        setAgencies(data);
      } catch (error) {
        toast.error("Failed to load agencies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  return (
    <div className="agencies-page-container">
      
      {/* Page Header  */}
      <div className="agencies-header">
        <h1>Our Partner Agencies</h1>
        <p>Discover and connect with top-rated travel agencies to plan your next dream vacation.</p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading Agencies...</div>
      ) : agencies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>No active agencies found.</div>
      ) : (

      <div className="agencies-grid">
        {agencies.map((agency, index) => (
          <div className="agency-card" key={agency.id} style={{ animationDelay: `${index * 0.1}s` }}>
            
            <div className="agency-image-wrapper">
              <img src={agency.photoUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"}
               alt={agency.agencyName} 
               className="agency-image" />
              <div className="verified-badge">
                <FaCheckCircle className="check-icon" /> Verified
              </div>
            </div>

            <div className="agency-info">
              <div className="agency-title-row">
                <h2>{agency.agencyName}</h2>
                <div className="agency-rating">
                  <FaStar className="star-icon" />
                  <span>{agency.rating}</span>
                  <span className="reviews-count">({agency.reviews})</span>
                </div>
              </div>

              <div className="agency-location">
                <FaMapMarkerAlt className="location-icon" />
                <span>{agency.address}</span>
              </div>

              <p className="agency-description">
                {agency.description}
              </p>
              <div className="agency-card-footer">
                <button className="view-agency-btn">
                  View Packages <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default TravelerAgencies;