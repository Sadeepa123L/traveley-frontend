import React from 'react';
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import './TravelerAgencies.css';

const TravelerAgencies = () => {
  const agencies = [
    {
      id: 1,
      name: "Seren Travels",
      location: "Colombo, Sri Lanka",
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      description: "Specialists in luxury tours and personalized travel experiences across Sri Lanka."
    },
    {
      id: 2,
      name: "Wanderlust Lanka",
      location: "Kandy, Sri Lanka",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      description: "Adventure and eco-tourism experts offering the best hiking and nature trails."
    },
    {
      id: 3,
      name: "Ocean Blue Tours",
      location: "Galle, Sri Lanka",
      rating: 4.8,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      description: "Your go-to agency for coastal experiences, whale watching, and beach resorts."
    },
    {
      id: 4,
      name: "Ceylon Heritage",
      location: "Anuradhapura, Sri Lanka",
      rating: 4.6,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
      description: "Discover the ancient ruins and deep cultural heritage of Sri Lanka with our expert guides."
    },
    {
      id: 4,
      name: "Ceylon Heritage",
      location: "Anuradhapura, Sri Lanka",
      rating: 4.6,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
      description: "Discover the ancient ruins and deep cultural heritage of Sri Lanka with our expert guides."
    },
    {
      id: 4,
      name: "Ceylon Heritage",
      location: "Anuradhapura, Sri Lanka",
      rating: 4.6,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
      description: "Discover the ancient ruins and deep cultural heritage of Sri Lanka with our expert guides."
    }
  ];

  return (
    <div className="agencies-page-container">
      
      {/* Page Header  */}
      <div className="agencies-header">
        <h1>Our Partner Agencies</h1>
        <p>Discover and connect with top-rated travel agencies to plan your next dream vacation.</p>
      </div>

      {/* Agencies  Grid  */}
      <div className="agencies-grid">
        {agencies.map((agency, index) => (
          <div className="agency-card" key={agency.id} style={{ animationDelay: `${index * 0.1}s` }}>
            
            <div className="agency-image-wrapper">
              <img src={agency.image} alt={agency.name} className="agency-image" />
              <div className="verified-badge">
                <FaCheckCircle className="check-icon" /> Verified
              </div>
            </div>

            <div className="agency-info">
              <div className="agency-title-row">
                <h2>{agency.name}</h2>
                <div className="agency-rating">
                  <FaStar className="star-icon" />
                  <span>{agency.rating}</span>
                  <span className="reviews-count">({agency.reviews})</span>
                </div>
              </div>

              <div className="agency-location">
                <FaMapMarkerAlt className="location-icon" />
                <span>{agency.location}</span>
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

    </div>
  );
};

export default TravelerAgencies;