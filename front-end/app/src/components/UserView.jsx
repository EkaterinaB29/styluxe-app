import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import Review from '../components/Review';
import { UserContext } from '../context/UserContext';
import mailIcon from '../images/mail.png';
import worldIcon from '../images/world.png';
import brandsImage from '../images/brands.png';
import reportIcon from '../images/flag-fill.svg';
import messageIcon from '../images/chat-square.svg';
import reviewIcon from '../images/clipboard-plus-fill.svg';
import houseIcon from '../images/house-heart.svg';
import linkedInIcon from '../images/linkedin.svg';
import facebookIcon from '../images/facebook.svg';
import instagramIcon from '../images/instagram.svg';
import starIcon from '../images/star.png';
import '../css/UserView.css';

const UserView = () => {
  const { userId: professionalId } = useParams();
  const { isAuthenticated, setIsAuthenticated, token } = useContext(UserContext); // Ensure token is available
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
          withCredentials: true,
        };

        const userResponse = await axios.get(`http://88.200.63.148:8211/api/user/profile/${professionalId}`, config);
        setUser(userResponse.data);
        const postsResponse = await axios.get(`http://88.200.63.148:8211/api/posts/user/${professionalId}`);
        setPosts(postsResponse.data);
        const reviewsResponse = await axios.get(`http://88.200.63.148:8211/api/reviews/professional/${professionalId}`, config);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [professionalId, setIsAuthenticated, token]);

  if (loading) {
    return <Notification>Loading...</Notification>;
  }

  if (error) {
    return <Notification>{error}</Notification>;
  }

  if (!user) {
    return <Notification>User not found</Notification>;
  }

  const handleReviewAdded = () => {
    setShowReviewModal(false);
    axios.get(`http://88.200.63.148:8211/api/reviews/professional/${professionalId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Ensure token is included
      withCredentials: true,
    }).then((response) => {
      setReviews(response.data);
    });
  };

  const handleAddReviewClick = () => {
    if (isAuthenticated) {
      setShowReviewModal(true);
    } else {
      alert('You must be logged in to add a review.');
    }
  };

  const calculateAverageRating = (review) => {
    const total = review.quality_of_work + review.timeliness + review.reliability + review.satisfaction;
    return (total / 4).toFixed(1);
  };

  const renderStars = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={i} src={starIcon} alt="star" className="star-icon" />);
    }

    if (halfStar) {
      stars.push(<img key="half" src={starIcon} alt="half-star" className="star-icon half-star" />);
    }

    return stars;
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
            )) : <div>No posts found</div>}
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
              {reviews.length > 0 ? reviews.map(review => {
                const averageRating = calculateAverageRating(review);
                return (
                  <div className="review-card" key={review.review_id}>
                    <h3>{review.author_name}</h3>
                    <div className="star-rating">
                      {renderStars(averageRating)}
                      <span className="rating-value">({averageRating})</span>
                    </div>
                    <div className="bar-chart">
                      <div className="bar">
                        <span>Quality of Work</span>
                        <div className="bar-fill" style={{ width: `${(review.quality_of_work / 5) * 100}%` }}></div>
                      </div>
                      <div className="bar">
                        <span>Timeliness</span>
                        <div className="bar-fill" style={{ width: `${(review.timeliness / 5) * 100}%` }}></div>
                      </div>
                      <div className="bar">
                        <span>Reliability</span>
                        <div className="bar-fill" style={{ width: `${(review.reliability / 5) * 100}%` }}></div>
                      </div>
                      <div className="bar">
                        <span>Satisfaction</span>
                        <div className="bar-fill" style={{ width: `${(review.satisfaction / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              }) : <div>No reviews found</div>}
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
            <Review professionalId={professionalId} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserView;
