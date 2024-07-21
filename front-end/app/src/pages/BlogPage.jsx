import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar';
import '../css/BlogPage.css';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts'); // Adjust the endpoint as needed
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="main-content">
            <NavBar />
            <h1>Latest Posts</h1>
            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <img src={post.image} alt={post.title} className="post-image" />
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-summary">{post.summary}</p>
                        <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
