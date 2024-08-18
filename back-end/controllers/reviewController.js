import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Portfolio from '../models/portfolioModel.js';

// Add a review
const createReview = asyncHandler(async (req, res) => {
    const professional_id = req.params.professionalId;
    const user_id = req.user.id; 
    console.log('Useer:'+user_id);
    const { quality_of_work, timeliness, reliability, satisfaction } = req.body;

    if (!quality_of_work || !timeliness || !reliability || !satisfaction) {
        res.status(400).send('All fields are required');
        return;
    }

    // Fetch the portfolio ID for the given professional ID
    const portfolio = await Portfolio.findByUserId(professional_id);
    if (!portfolio) {
        res.status(404).send('Portfolio not found for the given professional ID');
        return;
    }

    const portfolio_id = portfolio[0].portfolio_id;

    const reviewData = {
        quality_of_work,
        timeliness,
        reliability,
        satisfaction,
        publish_time: new Date(),
        user_id,
        portfolio_id,
        professional_id
    };

    await Review.create(reviewData);
    res.status(201).send('Review added successfully');
});
// Update a review
const updateReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const { quality_of_work, timeliness, reliability, satisfaction } = req.body;

    const reviewData = {
        quality_of_work,
        timeliness,
        reliability,
        satisfaction,
        publish_time: new Date()  
    };

    await Review.update(reviewId, reviewData);
    res.status(200).send('Review updated successfully');
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;

    await Review.delete(reviewId);
    res.status(200).send('Review deleted successfully');
});

// Get reviews by portfolio ID
const getReviewsByPortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.userId;

    const reviews = await Review.findByPortfolioId(portfolioId);
    res.status(200).json(reviews);
});

// Get reviews by professional ID
const getReviewsByProfessional = asyncHandler(async (req, res) => {
    const professionalId = req.params.userId;
    console.log(professionalId);

    const reviews = await Review.findByProfessionalId(professionalId);
    res.status(200).json(reviews);
});

// Get reviews by user ID (author of the review)
const getReviewsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const reviews = await Review.findByUserId(userId);
    res.status(200).json(reviews);
});



export { createReview, updateReview, deleteReview, getReviewsByPortfolio, getReviewsByProfessional, getReviewsByUser };
