import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaRegClock, FaTag, FaTimes } from 'react-icons/fa';
import './AgencyPackage.css';

const AgencyPackages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Royal Heritage Tour",
      location: "Kandy & Nuwara Eliya",
      duration: "4 Days / 3 Nights",
      price: "$320",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1588598198321-9833be5c66fc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Ella Adventure Trail",
      location: "Ella, Badulla",
      duration: "3 Days / 2 Nights",
      price: "$180",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1566323133860-23a7895e5b32?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Mirissa Beach Stay",
      location: "Mirissa",
      duration: "2 Days / 1 Night",
      price: "$150",
      category: "Relaxation",
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPkg, setNewPkg] = useState({
    title: '', location: '', duration: '', price: '', category: '', image: ''
  });

  const handleChange = (e) => {
    setNewPkg({ ...newPkg, [e.target.name]: e.target.value });
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    const newId = packages.length > 0 ? packages[packages.length - 1].id + 1 : 1;
    const addedPkg = { 
      id: newId, 
      ...newPkg, 
      image: newPkg.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
    };
    setPackages([addedPkg, ...packages]);
    setIsModalOpen(false);
    setNewPkg({ title: '', location: '', duration: '', price: '', category: '', image: '' });
  };

  return (
    <div className="agency-packages-container">
      <div className="packages-header">
        <div className="header-text">
          <h1>Manage Packages</h1>
          <p>Add, update, or delete your travel packages here.</p>
        </div>
        <button className="add-pkg-btn" onClick={() => setIsModalOpen(true)}>
          <FaPlus className="icon-plus" /> Add New Package
        </button>
      </div>

      <div className="packages-grid">
        {packages.map(pkg => (
          <div className="agency-pkg-card" key={pkg.id}>
            <div className="pkg-img-wrapper">
              <img src={pkg.image} alt={pkg.title} className="pkg-img" />
              <div className="pkg-category-badge">
                <FaTag className="badge-icon" /> {pkg.category}
              </div>
            </div>
            
            <div className="pkg-content">
              <div className="pkg-loc">
                <FaMapMarkerAlt className="loc-icon" /> {pkg.location}
              </div>
              <h3 className="pkg-title">{pkg.title}</h3>
              <div className="pkg-dur">
                <FaRegClock className="dur-icon" /> {pkg.duration}
              </div>
              
              <div className="pkg-price-row">
                <span className="price-label">Price:</span>
                <span className="price-val">{pkg.price}</span>
              </div>
              
              <div className="pkg-actions">
                <button className="edit-btn"><FaEdit /> Edit</button>
                <button className="delete-btn"><FaTrash /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Package</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <form className="modal-form" onSubmit={handleSavePackage}>
              <div className="form-group">
                <label>Package Title</label>
                <input type="text" name="title" value={newPkg.title} onChange={handleChange} required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={newPkg.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" name="duration" placeholder="e.g. 3 Days / 2 Nights" value={newPkg.duration} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" name="price" placeholder="e.g. $250" value={newPkg.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={newPkg.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Relaxation">Relaxation</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" placeholder="Paste image link here..." value={newPkg.image} onChange={handleChange} />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Package</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyPackages;