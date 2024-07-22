import React from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ latestPosts }) => {
  return (
    <div className="sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="latest-news">
        <h3>Latest News</h3>
        {latestPosts.map(post => (
          <div key={post.id} className="latest-post">
            <h4>{post.title}</h4>
            <p>{new Date(post.publish_time).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          <li>Decoration</li>
          <li>Door Windows</li>
          <li>Home Land</li>
          <li>Roof Installation</li>
        </ul>
      </div>
      <div className="tags">
        <h3>Tags</h3>
        <div className="tag-list">
          <span>Kitchen</span>
          <span>Bedroom</span>
          <span>Building</span>
          <span>Architecture</span>
          <span>Kitchen Painting</span>
          <span>Bedroom</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
