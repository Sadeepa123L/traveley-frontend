import React, { useState, useEffect } from 'react';
import './agency.css';
import { FaTrashAlt, FaSearch, FaBuilding, FaBan, FaCheckCircle, FaStoreSlash } from 'react-icons/fa';
import { getActiveAndSuspendAgencies, updateStatus, deleteAgency } from '../../../../services/agencyService';
import toast, { Toaster } from 'react-hot-toast';

const Agency = () => {
    const [agencies, setAgencies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
         const fetchAgencies = async () => {
            try {
                const data = await getActiveAndSuspendAgencies();
                setAgencies(data);
            } catch(error) {
                 toast.error("Error loading Agencies");
            }
         };
         fetchAgencies();
    }, []);

    const handleDelete = async (id) => {
       

        if (window.confirm("Are you sure you want to delete this agency? This action cannot be undone.")) { 
            try {
               await deleteAgency(id);
               setAgencies(agencies.filter(a => a.id !== id));
               toast.success("Agency deleted!")
            } catch (error) {
               toast.error("Failed to delete agency");
            }
        }
    };

    const handleToggleSuspend = async (id) => {
       try {
         await updateStatus(id);
         
         setAgencies(agencies.map(agency => {
             if (agency.id === id) {
                const currentStatus = agency.status || 'ACTIVE';
                const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
                 return { ...agency, status: newStatus };
             }
             return agency;
         }));

         toast.success("Agency status updated successfully!");

       } catch (error) {
        console.log(error);
        toast.error("Failed to update status. Please try again.");
       }
    };

    const filteredAgencies = Array.isArray(agencies) ? agencies.filter(a => {
        const agencyName = `${a.name || ''}`.toLowerCase();
        const search = searchTerm.toLowerCase();
        return agencyName.includes(search);
   }) : [];

    return (
        <div className="admin-content-container">
            <Toaster position="top-right" />

            <h2 className="page-title">Agency Management</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><FaBuilding /></div>
                    <div className="stat-info">
                        <h3>Total Agencies</h3>
                        <p>{Array.isArray(agencies) ? agencies.length : 0}</p>
                    </div>
                </div>
                <div className="stat-card active-users">
                    <div className="stat-icon"><FaCheckCircle /></div>
                    <div className="stat-info">
                        <h3>Active Agencies</h3>
                        <p>{Array.isArray(agencies) ? agencies.filter(a => (a.status || 'ACTIVE').toUpperCase() === 'ACTIVE').length : 0}</p>
                    </div>
                </div>
                <div className="stat-card suspended-users">
                    <div className="stat-icon"><FaStoreSlash /></div>
                    <div className="stat-info">
                        <h3>Suspended</h3>
                        <p>{Array.isArray(agencies) ? agencies.filter(a => (a.status || '').toUpperCase() === 'SUSPENDED').length : 0}</p>
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
                            <th>Contact Number</th>
                            <th>Registration Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAgencies.map((agency) => {
                             const displayStatus = agency.status ? String(agency.status).toUpperCase() : 'ACTIVE';
                            
                             return (
                            <tr key={agency.id}>
                                <td>#{agency.id}</td>
                                <td className="user-name-cell">{agency.name}</td>
                                <td>{agency.contactNumber}</td>
                                <td>{agency.registrationNumber}</td>
                                <td>
                                    <span className={`status-badge ${displayStatus.toLowerCase()}`}>
                                        {displayStatus}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        {displayStatus === 'ACTIVE' ? (
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
                            );
                        })}
                    </tbody>
                </table>
                {filteredAgencies.length === 0 && <p className="no-data">No agencies found!</p>}
            </div>
        </div>
    );
};

export default Agency;