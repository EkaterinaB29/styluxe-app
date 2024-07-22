import React from 'react';
import '../css/LatestPosts.css';

const LatestPosts = ({ posts }) => {
  return (
    <div className="latest-news">
      <h3>Latest News</h3>
      {posts.map(post => (
        <div key={post.id} className="latest-post">
          <h4>{post.title}</h4>
          <p>{new Date(post.publish_time).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default LatestPosts;
