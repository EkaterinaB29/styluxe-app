import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ClientProfile.css';
import Cookies from 'js-cookie';

const ClientProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    profileImage: null, // Added for profile image
  });

  useEffect(() => {

    const token = Cookies.get('token');
    axios.get('http://88.200.63.148:8211/api/user/profile/client', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setProfile(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          location: response.data.location,
          profileImage: response.data.profileImage, // Added for profile image
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
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }
    const token = Cookies.get('token');
    axios.put('http://88.200.63.148:8211/api/user/profile/client', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    })
      .then(response => {
        setProfile(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating profile', error);
      });
  };

  return (
    <div>
      <NavBar />
      
      <div className="container">
        <div className="profile-header">
          <img src={profile.profileImage} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p>{profile.location}</p>
          {isEditing ? (
            <div>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
              <input type="file" name="profileImage" onChange={handleImageChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientProfile;
