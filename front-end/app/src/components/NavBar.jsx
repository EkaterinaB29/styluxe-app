import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import searchIcon from '../images/search.svg'; 
const NavBar = () => {
    const [searchActive, setSearchActive] = useState(false);
  
    const toggleSearch = () => {
      setSearchActive(!searchActive);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Styluxe App</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/posts">Blog</Link>
          <Link to="">Services</Link>
          <Link to="/messages">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div className="search-container">
          <i className={`search-icon ${searchActive ? 'active' : ''}`} onClick={toggleSearch}>
            <img src={searchIcon} alt="Search" />
          </i>
          {searchActive && <input type="text" placeholder="Search..." />}
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  