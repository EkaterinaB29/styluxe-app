import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar';
import '../css/BlogPage.css';
import banner from '../images/image_2024-07-21_23-08-45.png'; 
import heart from '../images/heart.svg';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const latestPost = posts.length > 0 ? posts[0] : null;
    const otherPosts = posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="main-content">
            <NavBar />
            <div className="banner" >
                <img src={banner} alt="Banner" />
            </div>
            <h1>Articles & News</h1>
            <div className="latest-post">
            <h2>Latest post</h2>
                {latestPost && (
                    <div className="post-card">
                        {latestPost.image_url && <img src={latestPost.image_url} alt={latestPost.title} className="post-image" />}
                        <h2 className="post-title">{latestPost.title}</h2>
                        <p className="post-summary">{latestPost.content}</p>
                        <p className="post-date">{new Date(latestPost.publish_time).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
            
            <div className="posts-grid">
                {otherPosts.map((post) => (
                    <div key={post.post_id} className="post-card">
                        {post.image_url && <img src={post.image_url} alt={post.title} className="post-image" />}
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-summary">{post.content}</p>
                        <p className="post-date">{new Date(post.publish_time).toLocaleDateString()}</p>
                        <div className="post-likes">
                        <img src={heart} alt="Likes" className="likes-icon" />
                        <span className='likes'> {latestPost.likes}</span>
                            
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
