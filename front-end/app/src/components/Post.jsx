import React, { useContext } from 'react';
import axios from 'axios';
import '../css/Post.css';
import heartIcon from '../images/heart.svg'; 
import { AuthContext } from '../components/AuthContext';

const Post = ({ post, onLike }) => {
  const { token, user } = useContext(AuthContext);

  const handleLike = async () => {
    if (!user || !token) {
      console.error('No user or token found');
      return;
    }

    try {
      await axios.post(`/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onLike(post.id); 
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  return (
    <div className="post">
      {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
      <div className="post-content">
        <p>{post.content}</p>
        <p>Likes: {post.likes}</p>
        <p>Posted by User {post.user_id} on {new Date(post.publish_time).toLocaleDateString()}</p>
        <img src={heartIcon} alt="Like" className="heart-icon" onClick={handleLike} />
      </div>
    </div>
  );
};

export default Post;
