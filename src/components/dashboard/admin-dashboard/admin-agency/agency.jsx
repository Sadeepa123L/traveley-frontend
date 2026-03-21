import React, { useState } from 'react';
import './agency.css';
import { FaTrashAlt, FaSearch, FaBuilding, FaBan, FaCheckCircle, FaStoreSlash } from 'react-icons/fa';

const AgencyManagement = () => {
    const [agencies, setAgencies] = useState([
        { id: 1, name: 'Dream Travels', email: 'contact@dreamtravels.com', joined: '2024-01-15', status: 'Active' },
        { id: 2, name: 'Lanka Tours', email: 'info@lankatours.lk', joined: '2024-02-20', status: 'Suspended' },
        { id: 3, name: 'Global Explorers', email: 'hello@globalexplorers.com', joined: '2024-03-05', status: 'Active' },
        { id: 4, name: 'Paradise Holidays', email: 'admin@paradise.com', joined: '2024-03-18', status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this agency? This action cannot be undone.")) {
            setAgencies(agencies.filter(a => a.id !== id));
        }
    };

    const handleToggleSuspend = (id) => {
        setAgencies(agencies.map(agency => {
            if (agency.id === id) {
                const newStatus = agency.status === 'Active' ? 'Suspended' : 'Active';
                return { ...agency, status: newStatus };
            }
            return agency;
        }));
    };

    const filteredAgencies = agencies.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-content-container">
            <h2 className="page-title">Agency Management</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><FaBuilding /></div>
                    <div className="stat-info">
                        <h3>Total Agencies</h3>
                        <p>{agencies.length}</p>
                    </div>
                </div>
                <div className="stat-card active-users">
                    <div className="stat-icon"><FaCheckCircle /></div>
                    <div className="stat-info">
                        <h3>Active Agencies</h3>
                        <p>{agencies.filter(a => a.status === 'Active').length}</p>
                    </div>
                </div>
                <div className="stat-card suspended-users">
                    <div className="stat-icon"><FaStoreSlash /></div>
                    <div className="stat-info">
                        <h3>Suspended</h3>
                        <p>{agencies.filter(a => a.status === 'Suspended').length}</p>
                    </div>
                </div>
            </div>

            <div className="table-actions">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search by agency name or email..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Agency Name</th>
                            <th>Email Address</th>
                            <th>Joined Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAgencies.map((agency) => (
                            <tr key={agency.id}>
                                <td>#{agency.id}</td>
                                <td className="user-name-cell">{agency.name}</td>
                                <td>{agency.email}</td>
                                <td>{agency.joined}</td>
                                <td>
                                    <span className={`status-badge ${agency.status.toLowerCase()}`}>
                                        {agency.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        {agency.status === 'Active' ? (
                                            <button 
                                                className="action-btn suspend-btn" 
                                                onClick={() => handleToggleSuspend(agency.id)}
                                                title="Suspend Agency"
                                            >
                                                <FaBan /> Suspend
                                            </button>
                                        ) : (
                                            <button 
                                                className="action-btn activate-btn" 
                                                onClick={() => handleToggleSuspend(agency.id)}
                                                title="Activate Agency"
                                            >
                                                <FaCheckCircle /> Activate
                                            </button>
                                        )}

                                        <button 
                                            className="action-btn delete-btn" 
                                            onClick={() => handleDelete(agency.id)}
                                            title="Delete Agency"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredAgencies.length === 0 && <p className="no-data">No agencies found!</p>}
            </div>
        </div>
    );
};

export default AgencyManagement;