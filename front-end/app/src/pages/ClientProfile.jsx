import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import '../css/ClientProfile.css';
import img from '../images/profile.png';

const ClientProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    profileImage: null,
  });

  useEffect(() => {
    const token = Cookies.get('token');
    axios.get('http://88.200.63.148:8211/api/user/profile/client', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then(response => {
      setProfile(response.data);
      setFormData({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        location: response.data.location || '',
        email: response.data.email || '',
        profileImage: response.data.profileImage || null,
      });
    })
    .catch(error => {
      console.error('Error fetching profile', error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSave = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('email', formData.email);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    // Debugging: Log formDataToSend
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const token = Cookies.get('token');
    axios.put('http://88.200.63.148:8211/api/user/profile/client', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then(response => {
      console.log('Profile updated:', response.data);
      setProfile(response.data);
      setIsEditing(false);
    })
    .catch(error => {
      console.error('Error updating profile', error.response ? error.response.data : error.message);
    });
  };

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <div className="profile-header">
          <img src={profile.profileImage || img} alt="Profile" />
          <div className="profile-info">
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{profile.email}</p>
            <p>{profile.location}</p>
          </div>
        </div>
        
        {isEditing ? (
          <div className="edit-form">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />

            <label htmlFor="location">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" name="profileImage" onChange={handleImageChange} />

            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ClientProfile;
