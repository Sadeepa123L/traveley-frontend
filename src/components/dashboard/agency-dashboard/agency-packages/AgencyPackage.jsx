import React, { useState, useRef } from 'react';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaRegClock, FaCamera, FaTimes } from 'react-icons/fa';
import './AgencyPackage.css';

import {saveTourPackage} from '../../../../services/tourPackage'
import toast, { Toaster } from 'react-hot-toast';

const AgencyPackages = () => {

  //add states
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] =useState(false);
  
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


  //main function
  const handleSavePackage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      const formData = new FormData();

      formData.append(
        "packageData",
        new Blob([JSON.stringify(newPkg)], {type: "application/json"})
      );

      if(selectedPhoto){
        formData.append("image", selectedPhoto);
      }
      const result = await saveTourPackage(formData);

      toast.success(result.message || "Tour Package Saved Successfully!");

    setIsModalOpen(false);
    setNewPkg({ title: '', destination: '', duration: '', price: '', description: '' });
    setImagePreview(null);
    setSelectedPhoto(null);

    }catch(error){
      console.error("Error saving package:", error);
      toast.error(error.message || "Failed to save package");
    }finally{
      setIsLoading(false);
    }
  };


  return (
    <div className="agency-packages-container">
       <Toaster position="top-right" />
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
                <FaMapMarkerAlt className="loc-icon" /> {pkg.destination}
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
        <div className="form-body">
          <div className="form-group">
            <label>Package Title</label>
            <input type="text" name="title" value={newPkg.title} onChange={handleChange} required />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Destination</label>
              <input type="text" name="destination" value={newPkg.destination} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input type="text" name="duration" placeholder="e.g. 3 Days" value={newPkg.duration} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="text" name="price" placeholder="e.g. $250" value={newPkg.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="2" name="description" value={newPkg.description} onChange={handleChange} required></textarea>
          </div>

          <div className="form-group">
            <label>Package Image</label>
            <div className="img-upload-container">
              <div className="img-preview-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <span className="initial">Img</span>
                )}
                <button className="cam-btn" onClick={handleCameraClick} type="button">
                  <FaCamera />
                </button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
              </div>
              <p>Upload a high-res image.</p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)} disabled={isLoading}>Cancel</button>
          <button type="submit" className="save-btn" disabled={isLoading}>{isLoading ? "Saving..." : "Save Package"}</button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default AgencyPackages;