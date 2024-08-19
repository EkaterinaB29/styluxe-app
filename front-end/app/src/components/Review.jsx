import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/Review.css";
import { UserContext } from "../context/UserContext";

const Review = ({ professionalId, onReviewAdded }) => {
  const [qualityOfWork, setQualityOfWork] = useState(1);
  const [timeliness, setTimeliness] = useState(1);
  const [reliability, setReliability] = useState(1);
  const [satisfaction, setSatisfaction] = useState(1);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("You must be logged in to submit a review.");
      return;
    }

    const reviewData = {
      quality_of_work: qualityOfWork,
      timeliness,
      reliability,
      satisfaction,
      professional_id: professionalId,
    };

    try {
      localStorage.getItem("token");
      await axios.post(
        `http://88.200.63.148:8211/api/reviews/${professionalId}`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
          withCredentials: true,
        }
      );
      alert("Review added successfully");
      onReviewAdded();
    } catch (error) {
      console.error("Error adding review:", error.response || error);
      setError("Failed to add review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      {error && <p className="error-message">{error}</p>}
      <label>
        Quality of Work:
        <input
          type="range"
          min="1"
          max="5"
          value={qualityOfWork}
          onChange={(e) => setQualityOfWork(e.target.value)}
        />
      </label>
      <label>
        Timeliness:
        <input
          type="range"
          min="1"
          max="5"
          value={timeliness}
          onChange={(e) => setTimeliness(e.target.value)}
        />
      </label>
      <label>
        Reliability:
        <input
          type="range"
          min="1"
          max="5"
          value={reliability}
          onChange={(e) => setReliability(e.target.value)}
        />
      </label>
      <label>
        Satisfaction:
        <input
          type="range"
          min="1"
          max="5"
          value={satisfaction}
          onChange={(e) => setSatisfaction(e.target.value)}
        />
      </label>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default Review;
