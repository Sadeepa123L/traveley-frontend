import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaStar, FaArrowRight, FaTag } from 'react-icons/fa';
import './TravelerPackages.css';
import toast, { Toaster } from 'react-hot-toast';

import {getActivePackages} from '../../../../services/tourPackage'

const TravelerPackages = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = ['All', 'Adventure', 'Honeymoon', 'Cultural', 'Nature'];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getActivePackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast.error("Failed to load tour packages.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const getPackageCategory = (pkg) => {
    const textToSearch = `${pkg.title || ''} ${pkg.description || ''}`.toLowerCase();
    const foundCategory = filters.slice(1).find(f => textToSearch.includes(f.toLowerCase()));
    return foundCategory || 'Tour';
  };

  const filteredPackages = activeFilter === 'All' 
    ? packages 
    : packages.filter(pkg => {
        const textToSearch = `${pkg.title || ''} ${pkg.description || ''}`.toLowerCase();
        return textToSearch.includes(activeFilter.toLowerCase());
      });

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


      {/* Loading State & Empty State */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
          Loading Amazing Packages...
        </div>
      ) : filteredPackages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#666' }}>
          No packages found for this category. Check back later!
        </div>
      ) : (

      <div className="packages-grid">
        {filteredPackages.map((pkg, index) => (
          <div className="modern-package-card" key={pkg.id} style={{ animationDelay: `${index * 0.1}s` }}>
            
            <div className="pkg-image-wrapper">
              <img src={pkg.imageUrl || "https://images.unsplash.com/photo-1588598198321-9833be5c66fc"} 
              alt={pkg.title}
               className="pkg-image" />
              
              <div className="glass-badge duration-badge">
                <FaRegClock className="badge-icon" /> {pkg.duration}
              </div>
              
              <div className="glass-badge category-badge">
                <FaTag className="badge-icon" /> {getPackageCategory(pkg)}
              </div>
            </div>

            <div className="pkg-info">
              <div className="pkg-location">
                <FaMapMarkerAlt className="loc-icon" /> {pkg.destination}
              </div>
              
              <h2 className="pkg-title">{pkg.title}</h2>
              <p className="pkg-agency">By <span>{pkg.agencyProfile?.agencyName || "Trusted Agency"}</span></p>

              <div className="pkg-rating">
                <FaStar className="star-icon" />
                <span className="rate-num">4.8</span>
                <span className="reviews">((120 reviews))</span>
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
      )}
    </div>
  );
};

export default TravelerPackages;