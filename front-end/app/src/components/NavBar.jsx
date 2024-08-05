import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/NavBar.css';
import searchIcon from '../images/search.svg';

const NavBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const { user, isAuthenticated, setIsAuthenticated, setUser, setRole } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Styluxe App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to={isAuthenticated ? (user.role === 'Professional' ? '/profile/professional' : '/profile/client') : '/profile'}>
          Profile
        </Link>
        <Link to="/posts">Blog</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        {isAuthenticated && <Link to="/posts/create-post">Create Post</Link>}
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/register">Register</Link>}
      </div>
      <div className="user-actions">
        {isAuthenticated && (
          <>
            <span className="user-greeting">Hi, {user.first_name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        )}
        <div className="search-container">
          <i className={`search-icon ${searchActive ? 'active' : ''}`} onClick={toggleSearch}>
            <img src={searchIcon} alt="Search" />
          </i>
          {searchActive && <input type="text" placeholder="Search..." />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
