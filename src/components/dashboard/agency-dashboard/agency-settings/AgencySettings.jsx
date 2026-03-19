import React, { useState, useRef, useEffect } from 'react';
import { FaUserTie, FaLock, FaCamera, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import './AgencySettings.css';
import toast, { Toaster } from 'react-hot-toast';

import { saveOrUpdateAgencyProfile, getMyProfile, updatePassword } from '../../../../services/agencyService';

const AgencySettings = () => {

    const [activeTab, setActiveTab] = useState('profile');
    const [profileImage, setProfileImage] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [agencyData, setAgencyData] = useState({
        agencyName: '',
        registrationNumber: '',
        contactNumber: '',
        address: '',
        description: ''
    });

    const fileInputRef = useRef(null);

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (password.newPassword !== password.confirmPassword) {
            return toast.error("New passwords do not match!");
        }
        try {
            setIsLoading(true);
            await updatePassword({
                currentPassword: password.currentPassword,
                newPassword: password.newPassword
            });
            toast.success("Password updated successfully!");
            setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update password");
        } finally {
            setIsLoading(false);
        }
    }

    // Load agency profile details logic (useEffect) remains the same...
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
                    if (data.photoUrl) { setProfileImage(data.photoUrl); }
                    setIsEditing(true);
                }
            } catch (error) {
                console.log("No existing profile found.");
                setIsEditing(false);
            }
        };
        fetchProfileData();
    }, []);

    const handleCameraClick = () => fileInputRef.current.click();
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
            formData.append("agencyData", new Blob([JSON.stringify(agencyData)], { type: "application/json" }));
            if (selectedPhoto) formData.append("photo", selectedPhoto);
            const result = await saveOrUpdateAgencyProfile(formData);
            toast.success(result.message || "Agency Profile Saved!");
            setIsEditing(true);
        } catch (error) {
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
                    <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <FaUserTie className="tab-icon" /> Agency Profile
                    </button>
                    <button className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                        <FaLock className="tab-icon" /> Security
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-section fade-in">
                            {/* Profile content remains the same... */}
                            <h2>Agency Profile</h2>
                            <div className="profile-img-section">
                                <div className="img-circle">
                                    {profileImage ? <img src={profileImage} alt="Profile" className="uploaded-profile-img" /> : <span className="initial">S</span>}
                                    <button className="upload-img-btn" onClick={handleCameraClick} type="button"><FaCamera /></button>
                                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
                                </div>
                                <div className="img-text"><h3>Agency Logo</h3><p>Upload a high-res image (JPG or PNG).</p></div>
                            </div>
                            <form className="settings-form" onSubmit={handleProfileSubmit}>
                                <div className="form-row">
                                    <div className="form-group"><label>Agency Name</label><input type="text" name='agencyName' value={agencyData.agencyName} onChange={handleInputChange} required /></div>
                                    <div className="form-group"><label>Registration Number</label><input type="text" name='registrationNumber' value={agencyData.registrationNumber} onChange={handleInputChange} required /></div>
                                </div>
                                <div className="form-row"><div className="form-group"><label>Contact Number</label><input type="text" name='contactNumber' value={agencyData.contactNumber} onChange={handleInputChange} required /></div></div>
                                <div className="form-group"><label>Agency Address</label><input type="text" name='address' value={agencyData.address} onChange={handleInputChange} required /></div>
                                <div className="form-group"><label>Description</label><textarea rows="4" name='description' value={agencyData.description} onChange={handleInputChange}></textarea></div>
                                <button type="submit" className="save-settings-btn" disabled={isLoading}><FaSave className="save-icon" /> {isLoading ? "Saving..." : (isEditing ? "Update Profile" : "Save Profile")}</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section fade-in">
                            <h2>Security</h2>
                            <p className="section-desc">Update your password to keep your account secure.</p>

                            <form className="settings-form" onSubmit={handlePasswordSubmit}>
                                {/* 1. Current Password (No toggle) */}
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        name='currentPassword'
                                        placeholder="Enter current password"
                                        value={password.currentPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>

                                {/* 2. New Password (With Toggle) */}
                                <div className="form-group">
                                    <label>New Password</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            name='newPassword'
                                            placeholder="Enter new password"
                                            value={password.newPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <span className="password-toggle-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                {/* 3. Confirm New Password (With Toggle) */}
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            value={password.confirmPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" className="save-settings-btn" disabled={isLoading}>
                                    <FaSave className="save-icon" />
                                    {isLoading ? "Updating...." : "Update password"}
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