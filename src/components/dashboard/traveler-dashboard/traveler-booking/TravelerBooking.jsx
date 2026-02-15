import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaSuitcaseRolling, FaPaperPlane } from 'react-icons/fa';
import './TravelerBooking.css';

const TravelerBooking = () => {
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    phone: '', 
    package: '',
    date: '',
    guests: 1,
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking request sent successfully!');
  };

  return (
    <div className="booking-page-container">
      <div className="booking-header">
        <h1>Book Your Dream Trip</h1>
        <p>Fill in the details below. We've pre-filled your contact information for a faster booking experience!</p>
      </div>

      <div className="booking-content">
        <div className="booking-form-section">
          <form className="modern-booking-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label><FaSuitcaseRolling className="input-icon" /> Select Package</label>
              <select name="package" value={formData.package} onChange={handleChange} required>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaUser className="input-icon" /> Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label><FaEnvelope className="input-icon" /> Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaPhone className="input-icon" /> Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label><FaUsers className="input-icon" /> Number of Guests</label>
                <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label><FaCalendarAlt className="input-icon" /> Expected Travel Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Additional Notes / Special Requests</label>
              <textarea name="notes" rows="4" placeholder="Any specific requirements?" value={formData.notes} onChange={handleChange}></textarea>
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
  );
};

export default TravelerBooking;