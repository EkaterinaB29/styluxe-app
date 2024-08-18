import asyncHandler from 'express-async-handler';
import Portfolio from '../models/portfolioModel.js';

// Add Portfolio
const createPortfolio = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { education_history } = req.body;
    const portfolioFiles = req.file;

    console.log(`Adding portfolio for userId: ${userId}`);

    if (!portfolioFiles) {
        console.log('No files uploaded');
        return res.status(400).send('No files uploaded');
    }

    const portfolioData = {
        file_name: portfolioFiles.originalname,
        file_type: portfolioFiles.mimetype,
        file_size: portfolioFiles.size,
        file_path: `/uploads/${portfolioFiles.filename}`,
        education_history: education_history,
        user_id: userId
    };

    try {
        await Portfolio.create(portfolioData);
        res.status(201).send('Portfolio added successfully');
    } catch (err) {
        console.error('Failed to add portfolio:', err);
        res.status(500).send('Failed to add portfolio');
    }
});

// Update Portfolio
const updatePortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.id;
    const { education_history } = req.body;

    console.log(`Updating portfolio for portfolioId: ${portfolioId}`);

    try {
        const existingPortfolio = await Portfolio.findById(portfolioId);
        if (!existingPortfolio) {
            console.log('Portfolio not found');
            return res.status(404).send('Portfolio not found');
        }

        const portfolioData = {
            file_name: req.files && req.files['portfolio'] ? req.files['portfolio'][0].originalname : existingPortfolio.file_name,
            file_type: req.files && req.files['portfolio'] ? req.files['portfolio'][0].mimetype : existingPortfolio.file_type,
            file_size: req.files && req.files['portfolio'] ? req.files['portfolio'][0].size : existingPortfolio.file_size,
            file_path: req.files && req.files['portfolio'] ? `/uploads/${req.files['portfolio'][0].filename}` : existingPortfolio.file_path,
            education_history: education_history || existingPortfolio.education_history
        };

        await Portfolio.update(portfolioId, portfolioData);
        res.send('Portfolio updated successfully');
    } catch (err) {
        console.error('Failed to update portfolio:', err);
        res.status(500).send('Failed to update portfolio');
    }
});

// Delete Portfolio
const deletePortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.id;
    console.log(`Deleting portfolio for portfolioId: ${portfolioId}`);

    Portfolio.delete(portfolioId)
        .then((result) => {
            res.send('Portfolio deleted successfully');
        })
        .catch((err) => {
            console.error('Failed to delete portfolio:', err);
            res.status(500).send('Failed to delete portfolio');
        });
});
// Get portfolio by ID
const getPortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.portfolioId;

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
        res.status(404).send('Portfolio not found');
    } else {
        res.status(200).json(portfolio);
    }
});

export { createPortfolio, updatePortfolio, deletePortfolio, getPortfolio };
