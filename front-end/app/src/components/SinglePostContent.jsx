import React from 'react';
import '../css/SinglePostContent.css';
import heart from '../images/heart.svg';

const SinglePostContent = ({ post }) => {
  if (!post) {
    return <p>Loading...</p>; // Show loading message or spinner
  }

  return (
    <div className="single-post-content">
      <h1>{post.title}</h1>
      <img src={post.image_url} alt={post.title} className="post-image" />
      <p>{post.content}</p>
      <div className="likes">
       
        <span>{post.likes}</span> <img src={heart} alt="heart" className="heart-icon" />
      </div>
      <p>Posted on {new Date(post.publish_time).toLocaleDateString()}</p>
    </div>
  );
};

export default SinglePostContent;
