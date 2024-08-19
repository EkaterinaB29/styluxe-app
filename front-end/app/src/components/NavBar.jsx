import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../css/NavBar.css";
import searchIcon from "../images/search.svg";
import axios from "axios";
import Notification from "../components/Notification";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("user");
  const [searchResults, setSearchResults] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const {
    user,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    setRole,
    setToken,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from both storages
    localStorage.removeItem("token");
    localStorage.removeItem("logged_in_user_id");
    sessionStorage.removeItem("token");

    // Clear context state
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    setToken(null);

    // Redirect to login page
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      const response = await axios.get(
        `http://88.200.63.148:8211/api/${searchType}/search?query=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleResultClick = (result) => {
    if (searchType === "user") {
      navigate(`/profile/${result.user_id}`);
    } else if (searchType === "posts") {
      navigate(`/posts/${result.post_id}`);
    }
    setSearchQuery(""); // Clear search query
    setSearchResults([]); // Clear search results
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Styluxe App</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/posts">Blog</Link>
          <Link to="/services">Services</Link>
          <Link to="/professionals">Map</Link>
          {isAuthenticated && (
            <Link
              to={
                user.role === "Professional"
                  ? "/profile/professional"
                  : "/profile/client"
              }
            >
              My Profile
            </Link>
          )}
          {isAuthenticated && <Link to="/posts/create-post">Create Post</Link>}
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}
        </div>
        <div className="user-actions">
          {isAuthenticated && (
            <>
              <span className="user-greeting">Hi, {user.first_name}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
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
              <button
                type="submit"
                className="search-button"
                onClick={handleSearch}
              >
                <img src={searchIcon} alt="Search" />
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <div
                    key={`${result.user_id || result.post_id}-${index}`}
                    onClick={() => handleResultClick(result)}
                  >
                    {searchType === "user"
                      ? `${result.first_name} ${result.last_name} (${result.location})`
                      : result.title || result.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {showNotification && (
        <Notification>Please log in to use this feature.</Notification>
      )}
    </>
  );
};

export default NavBar;
