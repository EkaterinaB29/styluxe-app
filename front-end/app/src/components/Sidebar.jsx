import React, { useState } from 'react';
import '../css/Sidebar.css';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ latestPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      try {
        const response = await axios.get(`http://88.200.63.148:8211/api/posts/search`, {
          params: {
            query: query,
            type: 'content'  // Indicate this is a content search
          }
        });
        const posts = response.data;
        setSearchResults(posts);

        // If there is exactly one result, navigate to that post
        if (posts.length === 1) {
          navigate(`/posts/${posts[0].post_id}`);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleTagClick = async (tag) => {
    try {
      const response = await axios.get(`http://88.200.63.148:8211/api/posts/search`, {
        params: {
          query: tag,
          type: 'tag'  // Indicate this is a tag search
        }
      });
      const posts = response.data;
      setSearchResults(posts);

      // If there is exactly one result, navigate to that post
      if (posts.length === 1) {
        navigate(`/posts/${posts[0].post_id}`);
      }
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <div className="search-results">
            {searchResults.map(post => (
              <div 
                key={post.post_id} 
                className="search-result" 
                onClick={() => navigate(`/posts/${post.post_id}`)}
              >
                <h4>{post.title}</h4>
                <p>{new Date(post.publish_time).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="latest-news">
        <h3>Latest News</h3>
        {latestPosts.map(post => (
          <div key={post.post_id} className="latest-post">
            <h4>{post.title}</h4>
            <p>{new Date(post.publish_time).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          <li onClick={() => handleTagClick('Decoration')}>Decoration</li>
          <li onClick={() => handleTagClick('Door Windows')}>Door Windows</li>
          <li onClick={() => handleTagClick('Home Land')}>Home Land</li>
          <li onClick={() => handleTagClick('Roof Installation')}>Roof Installation</li>
        </ul>
      </div>
      <div className="tags">
        <h3>Tags</h3>
        <div className="tag-list">
          <span onClick={() => handleTagClick('Kitchen')}>Kitchen</span>
          <span onClick={() => handleTagClick('Bedroom')}>Bedroom</span>
          <span onClick={() => handleTagClick('Building')}>Building</span>
          <span onClick={() => handleTagClick('Architecture')}>Architecture</span>
          <span onClick={() => handleTagClick('Kitchen Painting')}>Kitchen Painting</span>
          <span onClick={() => handleTagClick('Bedroom')}>Bedroom</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
