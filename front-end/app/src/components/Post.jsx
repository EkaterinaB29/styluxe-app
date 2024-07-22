import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Post.css';
import heartIcon from '../images/heart.svg';

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.post_id}`);
  };

  return (
    <div className="post" onClick={handleClick}>
      {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
      <div className="post-content">
        <p>{post.content}</p>
        <p>Likes: {post.likes}</p>
        <p>Posted by User {post.user_id} on {new Date(post.publish_time).toLocaleDateString()}</p>
        <div className="post-likes">
          <img src={heartIcon} alt="Likes" className="likes-icon" />
          <span className='likes'>{post.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
