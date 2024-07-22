// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import BlogPage from './pages/BlogPage';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/posts" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
          <Route path="/search" element={<SearchResults />} />
          {/* Add other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
