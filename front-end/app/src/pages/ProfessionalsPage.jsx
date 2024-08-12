import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';  // Import Leaflet
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ProfessionalsPage.css';
import customIconUrl from '../images/geo-alt-fill.svg';  // Ensure you have this image in the correct path

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Fetch professionals from the backend
    axios.get('http://88.200.63.148:8211/api/user/professionals')
      .then(response => {
        console.log('Fetched professionals:', response.data);
        response.data.forEach(professional => {
          console.log(`Professional: ${professional.first_name} ${professional.last_name}, Location: ${professional.location}`);
        });
        setProfessionals(response.data);
      })
      .catch(error => {
        console.error('Error fetching professionals', error);
      });
  }, []);

  const geocodeLocation = async (location) => {
    if (!location) {
      console.error('Geocode location is undefined or empty');
      return null;
    }
    try {
      const apiKey = 'ad8c32724cd0405486dddd1ba152e770'; // Place your OpenCage API key here
      console.log(`Requesting geocode for location: ${location}`);
      const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`);
      console.log('Geocode API response:', geoResponse.data);
      const results = geoResponse.data.results;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry;
        console.log(`Geocode successful: ${location} -> [${lat}, ${lng}]`);
        return { lat, lng };
      } else {
        console.warn(`Geocode results are empty for location: ${location}`);
        return null;
      }
    } catch (error) {
      console.error('Error during geocoding', error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!location) {
      console.error('Search location is empty');
      return;
    }

    const professionalsWithCoordinates = await Promise.all(
      professionals.map(async (professional) => {
        if (!professional.location) {
          console.warn(`Professional ${professional.first_name} ${professional.last_name} has no location specified.`);
          return null; // Skip this professional if the location is not defined
        }

        console.log(`Geocoding location for: ${professional.location}`);
        const coordinates = await geocodeLocation(professional.location);

        if (!coordinates) {
          console.warn(`Could not geocode location for: ${professional.location}`);
          return null;
        }

        return { ...professional, lat: coordinates.lat, lng: coordinates.lng };
      })
    );

    const filtered = professionalsWithCoordinates.filter(professional =>
      professional && professional.location.toLowerCase().includes(location.toLowerCase())
    );

    setFilteredProfessionals(filtered);
  };

  useEffect(() => {
    if (filteredProfessionals.length > 0) {
      
      const map = L.map('map').setView([46.1512, 14.9955], 8); // Center the map in Slovenia

      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Create a custom icon
      const customIcon = L.icon({
        iconUrl: customIconUrl,
        iconSize: [38, 38], // size of the icon
        iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
      });

      // Add markers to the map
      filteredProfessionals.forEach(professional => {
        const marker = L.marker([professional.lat, professional.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`<strong>${professional.first_name} ${professional.last_name}</strong><br />${professional.email}`);
      });

      // Clean up map on unmount
      return () => {
        map.remove();
      };
    }
  }, [filteredProfessionals]);

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Our Professionals</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;
