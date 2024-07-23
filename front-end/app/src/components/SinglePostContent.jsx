import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import '../css/SinglePostContent.css';
import heart from '../images/heart.svg';
import Cookies from 'js-cookie';

const SinglePostContent = ({ post }) => {
  const { id } = useParams();
  const [likes, setLikes] = useState(post ? post.likes : 0);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Check if token is accessible from cookies
    const token = Cookies.get('token');
    console.log('Token retrieved from cookies:', token);
  }, []);
  const handleLike = async () => {
    if (isLiked) return; // Prevent multiple likes
    try {
      const token = Cookies.get('token'); // Get token from cookies
      const response = await axios.put(`/posts/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        console.error('Failed to like the post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-post-content">
      <h1>{post.title}</h1>
      <img src={post.image_url} alt={post.title} className="post-image" />
      <p>{post.content}</p>
      <div className="likes" onClick={handleLike} style={{ cursor: 'pointer' }}>
        <span>{likes}</span>
        <img src={heart} alt="heart" className={`heart-icon ${isLiked ? 'liked' : ''}`} />
      </div>
      <p>Posted on {new Date(post.publish_time).toLocaleDateString()}</p>
    </div>
  );
};

export default SinglePostContent;
