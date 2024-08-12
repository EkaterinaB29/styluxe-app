import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/NavBar.css';
import searchIcon from '../images/search.svg';
import axios from 'axios';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('user');
  const [searchResults, setSearchResults] = useState([]);
  const { user, isAuthenticated, setIsAuthenticated, setUser, setRole } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`http://88.200.63.148:8211/api/${searchType}/search?query=${searchQuery}`, {
        withCredentials: true,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleResultClick = (id) => {
    if (searchType === 'user') {
      navigate(`/profile/${id}`);
    } else if (searchType === 'posts') {
      navigate(`/posts/${id}`);
    }
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
        <Link to="/professionals">Map</Link>
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
          <div className="search-bar">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="search-select"
            >
              <option value="user">Users</option>
              <option value="posts">Posts</option>
            </select>
            <input 
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" onClick={handleSearch}>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(result => (
                <div key={result.user_id || result.post_id} onClick={() => handleResultClick(result.user_id || result.post_id)}>
                  {searchType === 'user' ? `${result.first_name} ${result.last_name} (${result.location})` : result.content || result.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
