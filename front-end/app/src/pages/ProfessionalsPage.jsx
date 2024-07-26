import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ProfessionalsPage.css';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    axios.get('http://88.200.63.148:8211/api/user/professionals')
      .then(response => {
        setProfessionals(response.data);
      })
      .catch(error => {
        console.error('Error fetching professionals', error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Our Professionals</h2>
        
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;
