import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notification from '../components/Notification';
import NavBar from '../components/NavBar';
import defaultProfileImg from '../images/profile.png';
import '../css/UserView.css';

function UserView() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const userResponse = await axios.get(`http://88.200.63.148:8211/api/user/profile/${userId}`);
        setUser(userResponse.data);

        const postsResponse = await axios.get(`http://88.200.63.148:8211/api/posts/user/${userId}`);
        setPosts(postsResponse.data);

      
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <Notification text="Loading..." />;
  }

  if (error) {
    return <Notification text={error} />;
  }

  if (!user) {
    return <Notification text="User not found" />;
  }

  return (
    <div>
      <NavBar />
      <div className="user-view">
        <div className="header">
          <img src={user.profile_picture ? `http://88.200.63.148:8211${user.profile_picture}` : defaultProfileImg} alt={`${user.first_name} ${user.last_name}`} />
          <div className="details">
            <h1>{user.first_name} {user.last_name}</h1>
            <p>Location: {user.location}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
        <div className="action-buttons">
          <button>Send Message</button>
          {user.role === 'Professional' && (
            <>
              <button>Add Review</button>
              <div className="reviews-summary">
                <span>{reviews.length} Reviews</span>
                {/* Add star rating display here */}
              </div>
            </>
          )}
        </div>
        <div className="posts">
          <h2>Posts by {user.first_name}</h2>
          {posts.length > 0 ? posts.map(post => (
            <div className="post" key={post.post_id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          )) : <Notification text="No posts found" />}
        </div>
        {user.role === 'Professional' && (
          <div className="reviews">
            <h2>Reviews</h2>
            {reviews.length > 0 ? reviews.map(review => (
              <div className="review" key={review.review_id}>
                <h3>{review.author_name}</h3>
                <p>{review.content}</p>
              </div>
            )) : <Notification text="No reviews found" />}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserView;
