import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar.jsx';
import banner from '../images/bedroom.png';
import SinglePostContent from '../components/SinglePostContent.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Footer from '../components/Footer.jsx';
import '../css/SinglePostPage.css';
import Cookies from 'js-cookie';

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = Cookies.get('token'); // Get token from cookies
        const response = await axios.get(`http://88.200.63.148:8211/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const token = Cookies.get('token'); // Get token from cookies
        console.log('Token retrieved from cookies:', token); // Debug: check if the token is correctly retrieved
        const response = await axios.get('http://88.200.63.148:8211/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLatestPosts(response.data);
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
      <h1 className="title">We Create The Art Of Stylish Living Stylishly</h1>
      <div className="content">
        <SinglePostContent post={post} />
        <Sidebar latestPosts={latestPosts} />
      </div>
      <Footer />
    </div>
  );
};

export default SinglePostPage;
