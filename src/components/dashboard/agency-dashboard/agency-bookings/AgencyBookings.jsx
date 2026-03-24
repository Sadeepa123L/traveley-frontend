import React, { useEffect, useState } from 'react';
import { FaSearch, FaCheck, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import './AgencyBookings.css';
import { getAllBookings, updateStatus} from '../../../../services/bokkingService';
import toast, { Toaster } from 'react-hot-toast';

const AgencyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      
      let bookingsArray = [];
      if (Array.isArray(data)) {
        bookingsArray = data;
      } else if (data && Array.isArray(data.data)) {
        bookingsArray = data.data;
      }
      const sortedBookings = bookingsArray.sort((a, b) => b.id - a.id);
      
      setBookings(sortedBookings);

    } catch (error) {
      toast.error("Error loading bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await updateStatus(id);
      toast.success("Booking Confirmed!");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to confirm booking");
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.travelerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    String(booking.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agency-bookings-container">
      <Toaster position="top-right" />
      <div className="bookings-page-header">
        <div className="header-text">
          <h1>Booking Inquiries</h1>
          <p>Manage your incoming package requests and contact travelers.</p>
        </div>
        
        <div className="bookings-search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bookings-table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Traveler Details</th>
              <th>Package Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td className="booking-id">
                  <strong>{booking.id}</strong>
                </td>
                
                <td className="traveler-details-cell">
                  <h4>{booking.travelerName}</h4>
                  <div className="contact-info">
                    <span><FaPhoneAlt className="tiny-icon"/> {booking.mobileNumber || 'N/A'}</span>
                    <span><FaEnvelope className="tiny-icon"/> {booking.email || 'N/A'}</span>
                  </div>
                </td>
                
                <td className="package-details-cell">
                  <h4>{booking.tourPackageName}</h4>
                  <div className="pkg-meta">
                    <span><FaCalendarAlt className="tiny-icon"/> {booking.travelDate}</span>
                    <span className="guest-count">Guests: {booking.guestCount}</span>
                  </div>
                </td>
                
                <td>
                  <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                    {booking.status}
                  </span>
                </td>
                
                <td className="action-cell">
                  {booking.status?.toUpperCase() === "PENDING" ? (
                    <button className="confirm-btn" onClick={() => handleConfirm(booking.id)}>
                      <FaCheck /> Confirm
                    </button>
                  ) : (
                    <span className="done-text">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="no-bookings-found">
            <p>No bookings found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyBookings;