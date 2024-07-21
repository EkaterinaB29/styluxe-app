import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import BlogPage from './pages/BlogPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<UserProfile/>} />
                        <Route path="/blog" element={<BlogPage />} />

                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
