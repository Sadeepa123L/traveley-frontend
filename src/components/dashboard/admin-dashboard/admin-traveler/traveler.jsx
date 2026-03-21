import React, { useEffect, useState } from 'react';
import './traveler.css';
import { FaSearch, FaUserFriends, FaTrashAlt } from 'react-icons/fa';
import { getAllProfiles } from '../../../../services/travelerService';
import { deleteTravler } from '../../../../services/adminService';
import toast, { Toaster } from 'react-hot-toast';

const Traveler = () => {
    const [travelers, setTravelers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTravelers = async () => {
            try {
                const data = await getAllProfiles();
                setTravelers(data);
            } catch (error) {
                toast.error("Error loading Travelers");
            }
        };
        fetchTravelers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this traveler?")) {
            try {
                await deleteTravler(id);
                setTravelers(travelers.filter(t => t.id !== id));
                toast.success("Traveler deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete traveler.");
            }
        }
    };

    const filteredTravelers = travelers.filter(t => {
        const fullName = `${t.firstName || ''} ${t.lastName || ''}`.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || (t.country || '').toLowerCase().includes(search);
    });

    return (
        <div className="admin-content-container">
           <Toaster position="top-right" />
            <h2 className="page-title">Traveler Management</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><FaUserFriends /></div>
                    <div className="stat-info">
                        <h3>Total Travelers</h3>
                        <p>{travelers.length}</p>
                    </div>
                </div>
            </div>

            <div className="table-actions">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search by name or country..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTravelers.map((traveler) => (
                            <tr key={traveler.id}>
                                <td>#{traveler.id}</td>
                                <td className="user-name-cell">{traveler.firstName} {traveler.lastName}</td>
                                <td>{traveler.mobileNumber}</td>
                                <td>{traveler.country}</td>
                                <td>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(traveler.id)}
                                        title="Delete Traveler"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredTravelers.length === 0 && <p className="no-data">No travelers found!</p>}
            </div>
        </div>
    );
};

export default Traveler;