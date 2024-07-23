import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar.jsx';
import '../css/SinglePostPage.css';
import banner1 from '../images/image_2024-07-21_23-08-45.png';
import Post from '../components/Post.jsx';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://88.200.63.148:8211/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const updatePosts = async () => {
        try {
            const response = await axios.get('http://88.200.63.148:8211/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const latestPost = posts.length > 0 ? posts[0] : null;
    const otherPosts = posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="main-content">
            <NavBar />
            <div className="banner">
                <img src={banner1} alt="Banner" />
            </div>
            <h1>Articles & News</h1>
            <div className="latest-post">
                <h2>Latest post</h2>
                {latestPost && (
                    <Post post={latestPost} updatePosts={updatePosts} />
                )}
            </div>
            <div className="posts-grid">
                {otherPosts.map(post => (
                    <Post key={post.post_id} post={post} updatePosts={updatePosts} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
