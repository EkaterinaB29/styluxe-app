import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ProfessionalProfile.css';
import Cookies from 'js-cookie';

const ProfessionalProfile = () => {
  const [profile, setProfile] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    bio: '',
    profileImage: null, 
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get('http://88.200.63.148:8211/api/user/profile/professional', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setProfile(response.data);
        setPortfolio(response.data.portfolio);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          location: response.data.location,
          bio: response.data.bio,
          profileImage: response.data.profileImage, 
        });
      })
      .catch(error => {
        console.error('Error fetching profile', error);
      });
    }
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
    formDataToSend.append('bio', formData.bio);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }
    const token = Cookies.get('token');
    axios.put('http://88.200.63.148:8211/api/user/profile/professional', formDataToSend, {
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
          {isEditing ? (
            <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
          ) : (
            <p>{profile.bio}</p>
          )}
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
        <div className="portfolio-section">
          <h2>Portfolio</h2>
          <div className="portfolio-items">
            {portfolio.map(item => (
              <div key={item.id} className="portfolio-item">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
