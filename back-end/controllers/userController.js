import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Portfolio from '../models/portfolioModel.js';



// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, location, birthday, email, password, role } = req.body;
    const profile_picture = req.file ? req.file.path : null;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        firstName,
        lastName,
        location,
        birthday,
        email,
        password: hashedPassword,
        role,
        profile_picture
    };

    User.create(userData, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User registered successfully');
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

// Get professional profile
const getProfessionalProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');

        Portfolio.findByUserId(userId, (portfolioErr, portfolioResults) => {
            if (portfolioErr) return res.status(500).send(portfolioErr);
            const userProfile = { ...results[0], portfolio: portfolioResults };
            res.json(userProfile);
        });
    });
});

// Update professional profile
const updateProfessionalProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, birthday, role } = req.body;
    const profile_picture = req.file ? req.file.path : null;

    User.update(userId, { firstName, lastName, location, birthday, role, profile_picture }, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Professional profile updated');
    });
});

// Get client profile
const getClientProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
});

// Update client profile
const updateClientProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, birthday, role } = req.body;
    const profile_picture = req.file ? req.file.path : null;

    User.update(userId, { firstName, lastName, location, birthday, role, profile_picture }, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Client profile updated');
    });
});

// Get all professionals (public route)
const getAllProfessionals = asyncHandler(async (req, res) => {
    User.findByRole('Professional', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
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

// Change password
const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    User.findById(userId, async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) return res.status(400).send('Incorrect old password');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        User.updatePassword(userId, hashedPassword, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('Password updated successfully');
        });
    });
});

export { registerUser, loginUser, getProfessionalProfile, updateProfessionalProfile, getClientProfile, updateClientProfile, getAllProfessionals, searchUsers, changePassword };
