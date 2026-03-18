import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaStar, FaArrowRight, FaTag } from 'react-icons/fa';
import './TravelerPackages.css';
import toast, { Toaster } from 'react-hot-toast';

import { getActivePackages } from '../../../../services/tourPackage';

const TravelerPackages = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedPackage, setSelectedPackage] = useState(null);

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

  
  const openModal = (pkg) => {
    setSelectedPackage(pkg);
  };


  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="packages-page-container">
      <Toaster position="top-right" />
      
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
                    <span className="price-amount">${pkg.price}</span>
                  </div>
                  
                  {/* view button */}
                  <button className="book-modern-btn" onClick={() => openModal(pkg)}>
                    View <FaArrowRight className="btn-arrow" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* view package Pop-up page */}
      {selectedPackage && (
        <div className="package-modal-overlay" onClick={closeModal}>
          <div className="package-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            
            <div className="modal-body">
              <div className="modal-image-col">
                <img 
                  src={selectedPackage.imageUrl || "https://images.unsplash.com/photo-1588598198321-9833be5c66fc"} 
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

export default TravelerPackages;