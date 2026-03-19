import React, { useState, useEffect } from 'react';
import { FaUser, FaArrowRight, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaSuitcaseRolling, FaPaperPlane, FaGlobeAmericas } from 'react-icons/fa';
import './TravelerBooking.css';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';

import { saveTravelerProfile, getProfile} from '../../../../services/travelerService'; 
import {getActivePackages} from '../../../../services/tourPackage'

const TravelerBooking = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    phone: '', 
    package: null,
    date: '',
    guests: '',
    notes: ''
  });

  const [packageOptions, setPackageOptions] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false); 
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    country: ''
  });

  // Packages fetch handler
useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getActivePackages();
        
        const options = data.map(pkg => ({
          value: pkg.id,
          label: `${pkg.title} - By ${pkg.agencyProfile?.agencyName || "Trusted Agency"}`
        }));
        setPackageOptions(options);

        const urlPackageId = searchParams.get('packageId');
        if (urlPackageId) {
          const selectedPkg = options.find(opt => opt.value.toString() === urlPackageId);
          if (selectedPkg) {
            setFormData(prev => ({ ...prev, package: selectedPkg }));
          }
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [searchParams]);


  // Profile data fetch handler
  useEffect(() => {
    const fetchProfileStatus = async () => {
      try {
        const existingProfile = await getProfile();
        if (existingProfile && existingProfile.firstName) {
          setHasProfile(true);

          setProfileData({
            firstName: existingProfile.firstName,
            lastName:existingProfile.lastName,
            mobileNumber:existingProfile.mobileNumber,
            country:existingProfile.country
          });
          setFormData(prevData => ({
            ...prevData,
            firstName:`${existingProfile.firstName}`,
            lastName:`${existingProfile.lastName}`,
            mobileNumber: existingProfile.mobileNumber
          }));

        }
      } catch (error) {
        console.error("Error checking profile", error);
        setHasProfile(false);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    fetchProfileStatus();
  }, []);

  // --- 4. Handlers ---
  const handleBookingChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePackageSelectChange = (selectedOption) => {
    setFormData({ ...formData, package: selectedOption });
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Profile data sumbit handler
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
        try {
            const savedData = await saveTravelerProfile(profileData);
            toast.success("Profile saved successfully! Let's book your trip.");
            setHasProfile(true); 
            fetchProfileStatus();

      setFormData({
        ...formData, 
        fullName: `${savedData.firstName} ${savedData.lastName}`,
        phone: savedData.mobileNumber
      });
      
    } catch (error) {
      console.error("Profile save error:", error);
      toast.error(error.response?.data?.error || "Failed to save profile. Try again.");
    }
  };

  // Booking function handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.package) {
      toast.error("Please select a package first!");
      return;
    }
    alert('Booking request sent successfully!');
  };


  // React selecter.meka gana tikak blanna mokadd kyala idea ekak ganna
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '4px 8px',
      borderRadius: '12px',
      border: state.isFocused ? '1px solid #c87a2c' : '1px solid #e5e7eb',
      backgroundColor: state.isFocused ? '#fff' : '#f9fafb',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(200, 122, 44, 0.1)' : 'none',
      fontFamily: "'Poppins', sans-serif",
      fontSize: '15px',
      '&:hover': { border: '1px solid #c87a2c' }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#c87a2c' : state.isFocused ? '#fcf4ec' : '#fff',
      color: state.isSelected ? '#fff' : '#333',
      fontFamily: "'Poppins', sans-serif",
      cursor: 'pointer',
    })
  };


  if (isCheckingProfile) {
    return <div style={{textAlign: 'center', padding: '100px'}}>Loading securely...</div>;
  }

  return (
    <div className="booking-page-container">
      <Toaster position="top-right" />

      {/* profile content */}
      {!hasProfile && (
        <div className="profile-setup-overlay">
          <div className="profile-setup-modal">
            <div className="profile-modal-header">
              <h2>Almost There! ✨</h2>
              <p>Please complete your traveler profile to secure your bookings.</p>
            </div>
            
            <form className="profile-setup-form" onSubmit={handleProfileSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange} required placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange} required placeholder="Doe" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label><FaPhone className="input-icon" /> Mobile Number</label>
                  <input type="tel" name="mobileNumber" value={profileData.mobileNumber} onChange={handleProfileChange} required placeholder="+1 234 567 890" />
                </div>
                <div className="form-group">
                  <label><FaGlobeAmericas className="input-icon" /> Country</label>
                  <input type="text" name="country" value={profileData.country} onChange={handleProfileChange} required placeholder="United States" />
                </div>
              </div>

              <button type="submit" className="save-profile-btn">
                Save & Continue to Booking <FaArrowRight style={{marginLeft: '8px'}}/>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* blur content */}
      <div className={`booking-main-wrapper ${!hasProfile ? 'blurred-content' : ''}`}>
        
        <div className="booking-header">
          <h1>Book Your Dream Trip</h1>
          <p>Fill in the details below. We've pre-filled your contact information for a faster booking experience!</p>
        </div>

        {/* Booking content */}
        <div className="booking-content">
          <div className="booking-form-section">
            <form className="modern-booking-form" onSubmit={handleBookingSubmit}>
              
                <div className="form-group">
                <label><FaSuitcaseRolling className="input-icon" /> Select Package</label>
                <Select
                  value={formData.package}
                  onChange={handlePackageSelectChange}
                  options={packageOptions}
                  isLoading={isLoadingPackages}
                  placeholder="Type to search packages..."
                  isSearchable={true}
                  styles={customSelectStyles}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FaUser className="input-icon" /> First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleBookingChange} required />
                </div>

                <div className="form-group">
                  <label><FaUser className="input-icon" /> Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleBookingChange} required />
                </div>

                <div className="form-group">
                  <label><FaEnvelope className="input-icon" /> Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleBookingChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FaPhone className="input-icon" /> Phone Number</label>
                  <input type="tel" name="phone" value={formData.mobileNumber} onChange={handleBookingChange} required />
                </div>

                <div className="form-group">
                  <label><FaUsers className="input-icon" /> Number of Guests</label>
                  <input type="number" name="guests" min="1" value={formData.guests} onChange={handleBookingChange} required />
                </div>
              </div>

              <div className="form-group">
                <label><FaCalendarAlt className="input-icon" /> Expected Travel Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleBookingChange} required />
              </div>

              <div className="form-group">
                <label>Additional Notes / Special Requests</label>
                <textarea name="notes" rows="4" placeholder="Any specific requirements?" value={formData.notes} onChange={handleBookingChange}></textarea>
              </div>

              <button type="submit" className="submit-booking-btn">
                Confirm Booking <FaPaperPlane className="btn-icon" />
              </button>
            </form>
          </div>

          <div className="booking-info-section">
            <div className="info-card">
              <h2>Need Help?</h2>
              <p>If you have any questions before booking, feel free to reach out to our support team.</p>
              <div className="contact-details">
                <p><strong>Email:</strong> support@traveley.com</p>
                <p><strong>Phone:</strong> +94 11 234 5678</p>
              </div>
            </div>

            <div className="ai-support-card">
              <div className="ai-support-content">
                <h3>Ask our AI Assistant</h3>
                <p>Our smart AI chatbot is available 24/7 to help you customize this package or answer any queries instantly.</p>
                <button className="chat-now-btn">Chat with AI</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TravelerBooking;