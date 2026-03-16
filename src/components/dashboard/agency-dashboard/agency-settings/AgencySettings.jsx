import React, { useState, useRef, useEffect } from 'react';
import { FaUserTie, FaBuilding, FaLock, FaCamera, FaSave } from 'react-icons/fa';
import './AgencySettings.css';
import toast, { Toaster } from 'react-hot-toast';

import {saveOrUpdateAgencyProfile, getMyProfile} from '../../../../services/agencyService'

const AgencySettings = () => {

  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [agencyData, setAgencyData] = useState({
    agencyName: '',
    registrationNumber: '',
    contactNumber: '',
    address: '',
    description: ''
  });
  
  const fileInputRef = useRef(null);


  //Load agency profile details function
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getMyProfile();
        if (data) {
          setAgencyData({
            agencyName: data.agencyName || '',
            registrationNumber: data.registrationNumber || '',
            contactNumber: data.contactNumber || '',
            address: data.address || '',
            description: data.description || ''
          });
          
          if (data.photoUrl) {
            setProfileImage(data.photoUrl);
          }
          
          setIsEditing(true);
        }
      } catch (error) {
        console.log("No existing profile found. User can create a new one.");
        setIsEditing(false); 
      }
    };

    fetchProfileData();
  }, []);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file); 
      setProfileImage(URL.createObjectURL(file)); 
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgencyData({ ...agencyData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append(
        "agencyData",
        new Blob([JSON.stringify(agencyData)], { type: "application/json" })
      );

      if (selectedPhoto) {
        formData.append("photo", selectedPhoto);
      }

      const result = await saveOrUpdateAgencyProfile(formData);

      toast.success(result.message || "Agency Profile Saved Successfully!");
      setIsEditing(true);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="agency-settings-container">
      <Toaster position="top-right" />

      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your agency profile, bank details, and security.</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            <FaUserTie className="tab-icon" /> Agency Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} 
            onClick={() => setActiveTab('security')}
          >
            <FaLock className="tab-icon" /> Security
          </button>
        </div>

        <div className="settings-content">

          {activeTab === 'profile' && (
            <div className="settings-section fade-in">
              <h2>Agency Profile</h2>
              <div className="profile-img-section">
                
                <div className="img-circle">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="uploaded-profile-img" />
                  ) : (
                    <span className="initial">S</span>
                  )}
                  
                  <button className="upload-img-btn" onClick={handleCameraClick} type="button">
                    <FaCamera />
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
                  <h3>Agency Logo</h3>
                  <p>Upload a high-res image (JPG or PNG).</p>
                </div>
              </div>

              <form className="settings-form" onSubmit={handleProfileSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Agency Name</label>
                    <input type="text" name='agencyName' value={agencyData.agencyName} onChange={handleInputChange} required/>
                  </div>
                  <div className="form-group">
                    <label>Registration Number</label>
                    <input type="text" name='registrationNumber' value={agencyData.registrationNumber} onChange={handleInputChange} required/>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" name='contactNumber' value={agencyData.contactNumber} onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className="form-group">
                  <label>Agency Address</label>
                  <input type="text" name='address' value={agencyData.address} onChange={handleInputChange} required/>
                </div>

                <div className="form-group">
                  <label>Description (About Us)</label>
                  <textarea rows="4" name='description' value={agencyData.description} onChange={handleInputChange}></textarea>
                </div>

                <button type="submit" className="save-settings-btn" disabled={isLoading}>
                  <FaSave className="save-icon"/>{isLoading ? "Saving..." : (isEditing ? "Update Profile" : "Save Profile")}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section fade-in">
              <h2>Security</h2>
              <p className="section-desc">Update your password to keep your account secure.</p>
              
              <form className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>

                <button type="button" className="save-settings-btn">
                  <FaSave className="save-icon"/> Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencySettings;