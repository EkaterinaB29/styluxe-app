import React, { useState } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar.jsx';
import banner from '../images/bedroom.png';
import Footer from '../components/Footer.jsx';
import '../css/CreatePostPage.css';

const CreatePostPage = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://88.200.63.148:8211/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post-page">
      <NavBar />
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
      <div className="content">
        <h1>Create a New Post</h1>
        <form onSubmit={handleSubmit}>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />

          <label>Tags:</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />

          <button type="submit">Create Post</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePostPage;
