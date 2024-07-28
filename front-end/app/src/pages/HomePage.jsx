import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="main-section">
        <div className="main-text">
          <h1>Let Your Home Be Unique</h1>
          <div>We love design. That's how we got here. <span role="img" aria-label="decor-icons">💒🌷✨</span>
          </div>          
          <div className="button-container">
          <Link to="/register">
          <Button text="Join the community" type="primary" />
        </Link>
        <Link to="/login">
          <Button text="Log In" type="default" />
        </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
