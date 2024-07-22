import React from 'react';
import '../css/SinglePostContent.css';

const SinglePostContent = ({ post }) => {
  if (!post) {
    return <p>Loading...</p>; // Show loading message or spinner
  }

  return (
    <div className="single-post-content">
      <h1>{post.title}</h1>
      <img src={post.image_url} alt={post.title} />
      <p>{post.content}</p>
      <p>Likes: {post.likes}</p>
      <p>Posted by User {post.user_id} on {new Date(post.publish_time).toLocaleDateString()}</p>
    </div>
  );
};

export default SinglePostContent;
