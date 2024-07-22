import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar.jsx';
import banner from '../images/bedroom.png';
import SinglePostContent from '../components/SinglePostContent.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Footer from '../components/Footer.jsx';
import '../css/SinglePostPage.css';

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get('/posts');
        setLatestPosts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchPost();
    fetchLatestPosts();
  }, [id]);

  return (
    <div className="single-post-page">
      <NavBar />
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
      <h1 className="title">Let’s Get Solution for Building
      Construction Work</h1>
      <div className="content">
        <SinglePostContent post={post} />
        <div className="sidebar">
          <Sidebar latestPosts={latestPosts} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SinglePostPage;
