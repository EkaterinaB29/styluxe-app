import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar';
import '../css/BlogPage.css';
import banner from '../images/image_2024-07-21_23-08-45.png'; 

import Post from '../components/Post.jsx';

const BlogPage = ({ token }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [token]);

    const updatePosts = async () => {
        try {
            const response = await axios.get('/posts/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="main-content">
            <NavBar />
            <div className="banner">
                <img src={banner} alt="Banner" />
            </div>
            <h1>Articles & News</h1>
            <div className="posts-grid">
                {posts.map(post => (
                    <Post key={post.id} post={post} token={token} updatePosts={updatePosts} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
