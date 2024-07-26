import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import BlogPage from './pages/BlogPage';
import CreatePostPage from './pages/CreatePostPage';
import ServicesPage from './pages/ServicesPage';
import Professionals from './pages/ProfessionalsPage.jsx';
import ProfessionalProfile from './pages/ProfessionalProfile';
import ClientProfile from './pages/ClientProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/posts" element={<BlogPage />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/posts/create-post" element={<CreatePostPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/profile/professional" element={<ProfessionalProfile />} />
        <Route path="/profile/client" element={<ClientProfile />} />
        <Route path="/professionals" element={<Professionals />} />
      </Routes>
    </Router>
  );
}

export default App;
