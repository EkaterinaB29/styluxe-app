import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import mailIcon from '../images/mail.png';
import callIcon from '../images/call.png';
import worldIcon from '../images/world.png';
import starIcon from '../images/star.png';
import socialMediaIcon from '../images/socialMedia.png';
import brandsImage from '../images/brands.png';
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

        /*if (userResponse.data.role === 'Professional') {
          const reviewsResponse = await axios.get(`http://88.200.63.148:8211/api/reviews?professional_id=${userId}`);
          setReviews(reviewsResponse.data);
        }*/
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
          <img src={user.profile_picture || 'default-profile.png'} alt={`${user.first_name} ${user.last_name}`} />
          <div className="details">
            <h1>{user.first_name} {user.last_name}</h1>
            <p>Architect</p>
            <div className="contact-info">
              <div className="contact-item">
                <img src={mailIcon} alt="Mail" />
                <p>{user.email}</p>
              </div>
             
              <div className="contact-item">
                <img src={worldIcon} alt="World" />
                <p>{user.location || 'N/A'}</p>
              </div>
            </div>
       
          
           
          </div>
        </div>
        <div className="bio">
          <h2>Bio</h2>
          <p>{user.education_history}</p>
        </div>
        <div className="action-buttons">
          <button onClick={() => window.location.href = '/report'}>Report</button>
          <button onClick={() => window.location.href = '/message'}>Send Message</button>
          {user.role === 'Professional' && <button onClick={() => window.location.href = '/add-review'}>Add Review</button>}
          <Link to="/services" className="get-started-button">Get Started <span>→</span></Link>
        </div>
        <div className="posts">
          <h2>Posts by {user.first_name}</h2>
          <div className="post-grid">
            {posts.length > 0 ? posts.map(post => (
              <div className="post" key={post.post_id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            )) : <Notification text="No posts found" />}
          </div>
          <div className="pagination">
            <button></button>
            <button></button>
          </div>
        </div>
        {user.role === 'Professional' && (
          <div className="reviews">
            <h2>Reviews</h2>
            <div className="review-grid">
              {reviews.length > 0 ? reviews.map(review => (
                <div className="review" key={review.review_id}>
                  <h3>{review.author_name}</h3>
                  <p>{review.content}</p>
                  <img src={starIcon} alt="Star" />
                </div>
              )) : <Notification text="No reviews found" />}
            </div>
            <div className="pagination">
              <button></button>
              <button></button>
            </div>
          </div>
        )}
        <img src={brandsImage} alt="Brands" className="brands-image" />
      </div>
      <Footer />
    </div>
  );
}

export default UserView;
