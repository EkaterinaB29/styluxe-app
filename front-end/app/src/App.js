import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogPage from './pages/BlogPage';
import CreatePostPage from './pages/CreatePostPage';
import ServicesPage from './pages/ServicesPage';
import Professionals from './pages/ProfessionalsPage.jsx';
import ProfessionalProfile from './pages/ProfessionalProfile';
import ClientProfile from './pages/ClientProfile';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/professional" element={<ProfessionalProfile />} />
          <Route path="/profile/client" element={<ClientProfile />} />
          <Route path="/posts" element={<BlogPage />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/posts/create-post" element={<CreatePostPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/professionals" element={<Professionals />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
