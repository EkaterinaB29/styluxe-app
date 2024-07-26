import asyncHandler from 'express-async-handler';
import Portfolio from '../models/portfolioModel.js';

// Add Portfolio
const addPortfolio = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { education_history } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded');
    }

    const portfolioFiles = req.files.map(file => ({
        file_name: file.originalname,
        file_type: file.mimetype,
        file_size: file.size,
        file_path: file.path,
        education_history: education_history,
        user_id: userId
    }));

    try {
        for (const fileData of portfolioFiles) {
            await Portfolio.create(fileData);
        }
        res.status(201).send('Portfolio added successfully');
    } catch (err) {
        res.status(500).send('Failed to add portfolio');
    }
});

// Update Portfolio
const updatePortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.id;
    const { education_history } = req.body;

    try {
        const existingPortfolio = await Portfolio.findById(portfolioId);
        if (!existingPortfolio) {
            return res.status(404).send('Portfolio not found');
        }

        const portfolioData = {
            file_name: req.file ? req.file.originalname : existingPortfolio.file_name,
            file_type: req.file ? req.file.mimetype : existingPortfolio.file_type,
            file_size: req.file ? req.file.size : existingPortfolio.file_size,
            file_path: req.file ? req.file.path : existingPortfolio.file_path,
            education_history: education_history
        };

        Portfolio.update(portfolioId, portfolioData, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send('Portfolio updated successfully');
        });
    } catch (err) {
        res.status(500).send('Failed to update portfolio');
    }
});

// Delete Portfolio
const deletePortfolio = asyncHandler(async (req, res) => {
    const portfolioId = req.params.id;

    Portfolio.delete(portfolioId)
        .then((result) => {
            res.send('Portfolio deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('Failed to delete portfolio');
        });
});

export { addPortfolio, updatePortfolio, deletePortfolio };
