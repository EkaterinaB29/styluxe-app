const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Portfolio = require('../models/portfolioModel');

const addReview = asyncHandler(async (req, res) => {
    const { rating, content, user_id, portfolio_id } = req.body;

    if (!rating || !content || !user_id || !portfolio_id) {
        res.status(400).send('All fields are required');
        return;
    }

    const reviewData = {
        rating,
        content,
        publish_time: new Date(),  // Automatically set to current timestamp
        user_id,
        portfolio_id
    };

    await Review.create(reviewData);
    res.status(201).send('Review added successfully');
});

const updateReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const { rating, content } = req.body;

    const reviewData = {
        rating,
        content,
        publish_time: new Date()  // Automatically set to current timestamp
    };

    await Review.update(reviewId, reviewData);
    res.status(200).send('Review updated successfully');
});

const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;

    await Review.delete(reviewId);
    res.status(200).send('Review deleted successfully');
});

const getReviewsByPortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.portfolioId;

    const reviews = await Review.findByPortfolioId(portfolioId);
    res.status(200).json(reviews);
});

const getReviewsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const reviews = await Review.findByUserId(userId);
    res.status(200).json(reviews);
});

const getPortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.portfolioId;

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
        res.status(404).send('Portfolio not found');
    } else {
        res.status(200).json(portfolio);
    }
});

module.exports = { addReview, updateReview, deleteReview, getReviewsByPortfolio, getReviewsByUser, getPortfolio };
