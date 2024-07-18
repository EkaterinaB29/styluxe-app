import express from 'express';
import User from '../models/userModel.js';
import Portfolio from '../models/portfolioModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import asyncHandler from 'express-async-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 10 } 
});

const uploadMultiple = upload.array('portfolio', 10);

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, location, birthday, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        firstName,
        lastName,
        location,
        birthday,
        email,
        password: hashedPassword,
        role
    };

    User.create(userData, (err, results) => {
        if (err) return res.status(500).send(err);
        if (role === 'Professional') {
            res.status(201).send({ message: 'Professional registered successfully', userId: results.insertId });
        } else {
            res.status(201).send('Client registered successfully');
        }
    });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(400).send('User not found');

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, birthday, role } = req.body;

    User.update(userId, { firstName, lastName, location, birthday, role }, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User profile updated');
    });
});

// Delete user profile
const deleteUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    User.delete(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User profile deleted');
    });
});

// Search users
const searchUsers = asyncHandler(async (req, res) => {
    const query = req.query.query;
    User.search(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Add Portfolio
const addPortfolio = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { education_history } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded');
    }
    if (req.user.role !== 'Professional') {
        return res.status(403).json({ message: 'Forbidden: Only professionals can add portfolios' });
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
            const createdPortfolio = await Portfolio.create(fileData);
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

export { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, searchUsers, addPortfolio, updatePortfolio, deletePortfolio, uploadMultiple };
