import React, { useState, useRef } from 'react';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaRegClock, FaCamera, FaTimes } from 'react-icons/fa';
import './AgencyPackage.css';

const AgencyPackages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Royal Heritage Tour",
      location: "Kandy & Nuwara Eliya",
      duration: "4 Days / 3 Nights",
      price: "$320",
      description: "Experience the rich culture and heritage of Sri Lanka.",
      image: "https://images.unsplash.com/photo-1588598198321-9833be5c66fc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Ella Adventure Trail",
      location: "Ella, Badulla",
      duration: "3 Days / 2 Nights",
      price: "$180",
      description: "A thrilling adventure through the hills and tea estates.",
      image: "https://images.unsplash.com/photo-1566323133860-23a7895e5b32?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Mirissa Beach Stay",
      location: "Mirissa",
      duration: "2 Days / 1 Night",
      price: "$150",
      description: "Relax on the golden sands of the southern coast.",
      image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const [newPkg, setNewPkg] = useState({
    title: '', location: '', duration: '', price: '', description: ''
  });

  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setNewPkg({ ...newPkg, [e.target.name]: e.target.value });
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    const newId = packages.length > 0 ? packages[packages.length - 1].id + 1 : 1;
    const addedPkg = { 
      id: newId, 
      ...newPkg, 
      image: imagePreview || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
    };
    setPackages([addedPkg, ...packages]);
    setIsModalOpen(false);
    setNewPkg({ title: '', location: '', duration: '', price: '', description: '' });
    setImagePreview(null);
    setSelectedPhoto(null);
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
            </div>
            
            <div className="pkg-content">
              <div className="pkg-loc">
                <FaMapMarkerAlt className="loc-icon" /> {pkg.location}
              </div>
              <h3 className="pkg-title">{pkg.title}</h3>
              <p className="pkg-description">{pkg.description}</p>
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

              <div className="form-group">
                <label>Price</label>
                <input type="text" name="price" placeholder="e.g. $250" value={newPkg.price} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" name="description" value={newPkg.description} onChange={handleChange} required></textarea>
              </div>

              <div className="form-group">
                <label>Package Image</label>
                <div className="profile-img-section" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                  <div className="img-circle" style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span className="initial" style={{ color: '#aaa' }}>Img</span>
                    )}
                    <button 
                      className="upload-img-btn" 
                      onClick={handleCameraClick} 
                      type="button"
                      style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#fff', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    >
                      <FaCamera color="#555" />
                    </button>
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      onChange={handleImageChange} 
                    />
                  </div>
                  <div className="img-text">
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Upload a high-res image.</p>
                  </div>
                </div>
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