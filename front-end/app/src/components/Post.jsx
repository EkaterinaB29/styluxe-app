import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Post.css';


const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.post_id}`);
  };

  return (
    <div className="post" onClick={handleClick}>
      {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>Likes: {post.likes}</p>
        <p>Posted by {post.first_name} {post.last_name} on {new Date(post.publish_time).toLocaleDateString()}</p>
        
      </div>
    </div>
  );
};

export default Post;
