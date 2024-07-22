import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/posts" element={<BlogPage />} />
        <Route path="/posts/:id" element={<SinglePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
