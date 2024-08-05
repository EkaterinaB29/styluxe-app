import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import '../css/ClientProfile.css';
import { UserContext } from '../context/UserContext';
import Notification from '../components/Notification';
import defaultProfileImg from '../images/profile.png';

const ClientProfile = () => {
  const { user, setUser, isAuthenticated } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    profileImage: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        location: user.location || '',
        email: user.email || '',
        profileImage: user.profile_picture ? `http://88.200.63.148:8211${user.profile_picture}` : defaultProfileImg,
        existingProfileImage: user.profile_picture || '',
      });
    }
  }, [user]);

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
    if (formData.profileImage instanceof File) {
      formDataToSend.append('profile_picture', formData.profileImage);
    } else {
      formDataToSend.append('existingProfileImage', formData.existingProfileImage);
    }

    const token = Cookies.get('token');
    axios.put('http://88.200.63.148:8211/api/user/profile/client', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then(response => {
      axios.get('http://88.200.63.148:8211/api/user/profile/client', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(getResponse => {
        setUser(getResponse.data);
        setIsEditing(false);
      })
      .catch(getError => {
        console.error('Error fetching updated user data', getError.response ? getError.response.data : getError.message);
      });
    })
    .catch(error => {
      console.error('Error updating profile', error.response ? error.response.data : error.message);
    });
  };

  if (!isAuthenticated) {
    return <Notification text="Please log in to view your profile." />;
  }

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <div className="profile-header">
          <img src={typeof formData.profileImage === 'string' ? formData.profileImage : defaultProfileImg} alt="Profile" />
          <div className="profile-info">
            <h2>{formData.firstName} {formData.lastName}</h2>
            <p>{formData.email}</p>
            <p>{formData.location}</p>
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
