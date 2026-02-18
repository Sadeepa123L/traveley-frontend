import React, { useState } from 'react';
import { FaSearch, FaCheck, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import './AgencyBookings.css';

const AgencyBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: "BOK-901",
      travelerName: "Kasun Perera",
      phone: "+94 77 123 4567",
      email: "kasun@gmail.com",
      package: "Ella Adventure Trail",
      date: "Oct 15, 2026",
      guests: 2,
      status: "Pending"
    },
    {
      id: "BOK-902",
      travelerName: "Sarah Smith",
      phone: "+44 79 111 2222",
      email: "sarah.s@yahoo.com",
      package: "Royal Heritage Tour",
      date: "Oct 18, 2026",
      guests: 4,
      status: "Confirmed"
    },
    {
      id: "BOK-903",
      travelerName: "Nuwan Silva",
      phone: "+94 71 987 6543",
      email: "nuwan.silva@gmail.com",
      package: "Mirissa Beach Stay",
      date: "Oct 20, 2026",
      guests: 2,
      status: "Pending"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleConfirm = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "Confirmed" } : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => 
    booking.travelerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agency-bookings-container">
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
                    <span><FaPhoneAlt className="tiny-icon"/> {booking.phone}</span>
                    <span><FaEnvelope className="tiny-icon"/> {booking.email}</span>
                  </div>
                </td>
                
                <td className="package-details-cell">
                  <h4>{booking.package}</h4>
                  <div className="pkg-meta">
                    <span><FaCalendarAlt className="tiny-icon"/> {booking.date}</span>
                    <span className="guest-count">Guests: {booking.guests}</span>
                  </div>
                </td>
                
                <td>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                
                <td className="action-cell">
                  {booking.status === "Pending" ? (
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