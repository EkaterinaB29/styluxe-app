import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import mailIcon from '../images/mail.png';
import worldIcon from '../images/world.png';
import starIcon from '../images/star.png';
import brandsImage from '../images/brands.png';
import reportIcon from '../images/flag-fill.svg';
import messageIcon from '../images/chat-square.svg';
import reviewIcon from '../images/clipboard-plus-fill.svg';
import houseIcon from '../images/house-heart.svg';
import linkedInIcon from '../images/linkedin.svg';
import facebookIcon from '../images/facebook.svg';
import instagramIcon from '../images/instagram.svg';
import '../css/UserView.css';
import Review from '../components/Review';
import { UserContext } from '../context/UserContext';

const UserView = () => {
  const { userId } = useParams();
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResponse = await axios.get(`http://88.200.63.148:8211/api/user/profile/${userId}`);
        setUser(userResponse.data);
        const postsResponse = await axios.get(`http://88.200.63.148:8211/api/posts/user/${userId}`);
        setPosts(postsResponse.data);
        const reviewsResponse = await axios.get(`http://88.200.63.148:8211/api/reviews/professional/${userId}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, setIsAuthenticated]);

  if (loading) {
    return <Notification text="Loading..." />;
  }

  if (error) {
    return <Notification text={error} />;
  }

  if (!user) {
    return <Notification text="User not found" />;
  }

  const handleReviewAdded = () => {
    setShowReviewModal(false);
    const token = Cookies.get('token');
    axios.get(`http://88.200.63.148:8211/api/reviews/professional/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setReviews(response.data);
    });
  };

  const handleAddReviewClick = () => {
    if (isAuthenticated) {
      setShowReviewModal(true);
    } else {
      setNotificationText('You must be logged in to leave a review');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 6000);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="user-view">
        <div className="header">
          <img src={user.profile_picture || 'default-profile.png'} alt={`${user.first_name} ${user.last_name}`} />
          <div className="details">
            <h1>{user.first_name} {user.last_name}</h1>
            <h3>Architect</h3>
            <div className="contact-info">
              <div className="contact-item">
                <img src={mailIcon} alt="Mail" />
                <h3>{user.email}</h3>
              </div>
              <div className="contact-item">
                <img src={worldIcon} alt="World" />
                <h3>{user.location || 'N/A'}</h3>
              </div>
            </div>
            <div className="social-media-buttons">
              <button onClick={() => window.location.href = 'https://www.linkedin.com'} className="icon-button">
                <img src={linkedInIcon} alt="LinkedIn" />
              </button>
              <button onClick={() => window.location.href = 'https://www.facebook.com'} className="icon-button">
                <img src={facebookIcon} alt="Facebook" />
              </button>
              <button onClick={() => window.location.href = 'https://www.instagram.com'} className="icon-button">
                <img src={instagramIcon} alt="Instagram" />
              </button>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button onClick={() => window.location.href = '/report'} className="icon-button">
            <img src={reportIcon} alt="Report" />
          </button>
          <button onClick={() => window.location.href = '/message'} className="icon-button">
            <img src={messageIcon} alt="Send Message" />
          </button>
          {user.role === 'Professional' && (
            <>
              <button onClick={handleAddReviewClick} className="icon-button">
                <img src={reviewIcon} alt="Add Review" />
              </button>
              <p className="review-count">Reviews: {reviews.length}</p>
            </>
          )}
          <Link to="/services" className="get-started-button">
            <img src={houseIcon} alt="House" className="house-icon" />
            Get Started <span>→</span>
          </Link>
        </div>
        <div className="bio">
          <h2>Bio</h2>
          <p>{user.education_history}</p>
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
            <button>&lt;</button>
            <button>&gt;</button>
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
              <button>&lt;</button>
              <button>&gt;</button>
            </div>
          </div>
        )}
        <img src={brandsImage} alt="Brands" className="brands-image" />
      </div>
      <Footer />

      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowReviewModal(false)}>&times;</span>
            <Review professionalId={userId} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      )}
      {showNotification && (
        <div className="notification-wrapper">
          <Notification text={notificationText} />
        </div>
      )}
    </div>
  );
}

export default UserView;
