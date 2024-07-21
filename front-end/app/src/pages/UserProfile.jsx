import React, { Component } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/NavBar';
import ProfilePicture from '../components/ProfilePicture';
import '../css/UserProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            error: ''
        };
    }

    componentDidMount() {
        this.fetchUserProfile();
        this.fetchUserPosts();
    }

    fetchUserProfile = async () => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        try {
            const response = await axios.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.setState({ user: response.data });
        } catch (error) {
            this.setState({ error: 'There was an error fetching the user profile!' });
            console.error('Profile fetch error:', error.response ? error.response.data : error.message);
        }
    };

    

    fetchUserPosts = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('/user/posts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.setState({ posts: response.data });
        } catch (error) {
            console.error('Posts fetch error:', error.response ? error.response.data : error.message);
        }
    };

    render() {
        const { user, posts, error } = this.state;

        return (
            <div>
                <NavBar />
                <div className="profile-container">
                    <ProfilePicture />
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    <button>Contact</button>
                    {error && <p className="error">{error}</p>}
                    <div className="posts-grid">
                        {posts.map(post => (
                            <div key={post.id} className="post">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
