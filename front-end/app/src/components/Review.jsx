import React, { useState } from 'react';
import axios from 'axios';
import '../css/Review.css';

const Review = ({ userId, portfolioId, onReviewAdded }) => {
    const [qualityOfWork, setQualityOfWork] = useState(1);
    const [timeliness, setTimeliness] = useState(1);
    const [reliability, setReliability] = useState(1);
    const [satisfaction, setSatisfaction] = useState(1);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            quality_of_work: qualityOfWork,
            timeliness,
            reliability,
            satisfaction,
            
            user_id: userId,
            portfolio_id: portfolioId
        };

        try {
            await axios.post('http://88.200.63.148:8211/api/review', reviewData);
            alert('Review added successfully');
            onReviewAdded();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-review-form">
            <label>
                Quality of Work:
                <input type="range" min="1" max="5" value={qualityOfWork} onChange={(e) => setQualityOfWork(e.target.value)} />
            </label>
            <label>
                Timeliness:
                <input type="range" min="1" max="5" value={timeliness} onChange={(e) => setTimeliness(e.target.value)} />
            </label>
            <label>
                Reliability:
                <input type="range" min="1" max="5" value={reliability} onChange={(e) => setReliability(e.target.value)} />
            </label>
            <label>
                Satisfaction:
                <input type="range" min="1" max="5" value={satisfaction} onChange={(e) => setSatisfaction(e.target.value)} />
            </label>
            
            <button type="submit">Add Review</button>
        </form>
    );
}

export default Review;
