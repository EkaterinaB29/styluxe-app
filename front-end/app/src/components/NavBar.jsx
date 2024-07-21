import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Styluxe App</Link>
            </div>s
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/search">Search</Link>
                <Link to="/posts">Blog</Link>
                <Link to="">Services</Link> 
                <Link to="/messages">Contact</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

            </div>
        </nav>
    );
};

export default NavBar;

