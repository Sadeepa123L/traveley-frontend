import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaStar, FaArrowRight, FaTag } from 'react-icons/fa';
import './TravelerPackages.css';

const TravelerPackages = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Adventure', 'Honeymoon', 'Cultural', 'Nature'];
  const packages = [
    {
      id: 1,
      title: "Royal Heritage Tour",
      location: "Kandy & Nuwara Eliya",
      duration: "4 Days / 3 Nights",
      price: "$320",
      rating: 4.9,
      reviews: 128,
      category: "Cultural",
      agency: "Serendipity Travels",
      image: "https://images.unsplash.com/photo-1588598198321-9833be5c66fc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Ella Adventure Trail",
      location: "Ella, Badulla",
      duration: "3 Days / 2 Nights",
      price: "$180",
      rating: 4.8,
      reviews: 95,
      category: "Adventure",
      agency: "Wanderlust Lanka",
      image: "https://images.unsplash.com/photo-1566323133860-23a7895e5b32?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Romantic South Coast",
      location: "Mirissa & Galle",
      duration: "5 Days / 4 Nights",
      price: "$450",
      rating: 5.0,
      reviews: 210,
      category: "Honeymoon",
      agency: "Ocean Blue Tours",
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Wild Safari Experience",
      location: "Yala National Park",
      duration: "2 Days / 1 Night",
      price: "$210",
      rating: 4.7,
      reviews: 84,
      category: "Nature",
      agency: "Ceylon Wildlife",
      image: "https://images.unsplash.com/photo-1625736300986-e74017f8a735?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="packages-page-container">
            <div className="packages-header">
        <div className="header-text">
          <h1>Discover Your Next Adventure</h1>
          <p>Explore our handpicked travel packages designed just for you.</p>
        </div>
        
        {/* Modern Filter Pills */}
        <div className="filter-pills">
          {filters.map(filter => (
            <button 
              key={filter} 
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div className="modern-package-card" key={pkg.id} style={{ animationDelay: `${index * 0.1}s` }}>
            
            <div className="pkg-image-wrapper">
              <img src={pkg.image} alt={pkg.title} className="pkg-image" />
              
              <div className="glass-badge duration-badge">
                <FaRegClock className="badge-icon" /> {pkg.duration}
              </div>
              
              <div className="glass-badge category-badge">
                <FaTag className="badge-icon" /> {pkg.category}
              </div>
            </div>

            <div className="pkg-info">
              <div className="pkg-location">
                <FaMapMarkerAlt className="loc-icon" /> {pkg.location}
              </div>
              
              <h2 className="pkg-title">{pkg.title}</h2>
              <p className="pkg-agency">By <span>{pkg.agency}</span></p>

              <div className="pkg-rating">
                <FaStar className="star-icon" />
                <span className="rate-num">{pkg.rating}</span>
                <span className="reviews">({pkg.reviews} reviews)</span>
              </div>
              <div className="pkg-footer">
                <div className="price-box">
                  <span className="price-label">Starting from</span>
                  <span className="price-amount">{pkg.price}</span>
                </div>
                
                <button className="book-modern-btn">
                  View <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default TravelerPackages;