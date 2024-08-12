import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Portfolio from '../models/portfolioModel.js';

// Register client
const registerClient = asyncHandler(async (req, res) => {
    try {
        const { first_name, last_name, location, birthday, email, password } = req.body;

        if (!first_name || !last_name || !location || !birthday || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            first_name,
            last_name,
            location,
            birthday,
            email,
            password: hashedPassword,
            role: 'Client'
        };

        const results = await User.create(userData);
        const userId = results.insertId;

        const token = jwt.sign({ id: userId, email: userData.email, role: userData.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Client registered successfully', token, userId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already registered', code: 'ER_DUP_ENTRY' });
        }
        console.error('Error in registerClient:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Register professional
const registerProfessional = asyncHandler(async (req, res) => {
    try {
        const { first_name, last_name, location, birthday, email, password, education } = req.body;
        const portfolioFile = req.file;

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            first_name,
            last_name,
            location,
            birthday,
            email,
            password: hashedPassword,
            role: 'Professional'
        };

        const results = await User.create(userData);
        const userId = results.insertId;

        const token = jwt.sign({ id: userId, email: userData.email, role: userData.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

        if (portfolioFile) {
            const portfolioData = {
                file_name: portfolioFile.originalname,
                file_type: portfolioFile.mimetype,
                file_size: portfolioFile.size,
                file_path: `/uploads/${portfolioFile.filename}`,
                education_history: education,
                user_id: userId
            };

            try {
                await Portfolio.create(portfolioData);
                res.status(201).json({ message: 'Professional registered successfully', token, userId });
            } catch (portfolioErr) {
                console.error('Error creating portfolio:', portfolioErr);
                return res.status(500).json({ error: 'Failed to create portfolio', details: portfolioErr });
            }
        } else {
            res.status(201).json({ message: 'Professional registered successfully', token, userId });
        }
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already registered', code: 'ER_DUP_ENTRY' });
        }
        console.error('Error in registerProfessional:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await User.findByEmail(email);

        if (results.length === 0) return res.status(400).send('User not found');

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000, // 1 hour
            sameSite: 'Lax',
        });

        res.json({ message: 'Login successful', token, role: user.role });
    } catch (err) {
        console.error('Error in loginUser:', err);
        res.status(500).send(err);
    }
});

// Get professional profile
const getProfessionalProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log('User ID:', userId);

    try {
        const results = await User.findById(userId);
        if (results.length === 0) return res.status(404).send('User not found');

        const portfolioResults = await Portfolio.findByUserId(userId);
        const userProfile = { ...results[0], portfolio: portfolioResults };
        res.json(userProfile);
    } catch (err) {
        console.error('Error in getProfessionalProfile:', err);
        res.status(500).send(err);
    }
});

// Get client profile
const getClientProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log('User ID:', userId);

    try {
        const results = await User.findById(userId);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    } catch (err) {
        console.error('Error in getClientProfile:', err);
        res.status(500).send(err);
    }
});

// Update professional profile
const updateProfessionalProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, email, education_history } = req.body;
    const profile_picture = req.files && req.files['profile_picture'] ? `/uploads/${req.files['profile_picture'][0].filename}` : undefined;
    const portfolio_file = req.files && req.files['portfolio'] ? `/uploads/${req.files['portfolio'][0].filename}` : undefined;

    try {
        const results = await User.findById(userId);
        if (results.length === 0) return res.status(404).send('User not found');

        const updateFields = {
            first_name: firstName,
            last_name: lastName,
            location,
            email,
            profile_picture: profile_picture || results[0].profile_picture,
        };

        await User.update(userId, updateFields);

        if (portfolio_file || education_history) {
            const portfolioData = { file_path: portfolio_file, education_history };
            await Portfolio.updateByUserId(userId, portfolioData);
            res.send('Professional profile updated with portfolio');
        } else {
            res.send('Professional profile updated');
        }
    } catch (err) {
        console.error('Error in updateProfessionalProfile:', err);
        res.status(500).send(err);
    }
});

// Update client profile
const updateClientProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, email } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : req.body.existingProfileImage;

    try {
        const user = await User.findById(userId);
        if (user.length === 0) return res.status(404).send('User not found');

        const updateFields = {
            first_name: firstName,
            last_name: lastName,
            location,
            email,
            profile_picture: profile_picture || user[0].profile_picture,
        };

        await User.update(userId, updateFields);
        res.send('Client profile updated');
    } catch (err) {
        console.error('Error in updateClientProfile:', err);
        res.status(500).send(err);
    }
});

// Get all professionals (public route)
const getAllProfessionals = asyncHandler(async (req, res) => {
    try {
        const professionals = await User.findByRole('Professional');
        res.json(professionals);
    } catch (err) {
        console.error('Error in getAllProfessionals:', err);
        res.status(500).send('Server error');
    }
});

// Search users
const searchUsers = asyncHandler(async (req, res) => {
    const query = req.query.query;

    try {
        const results = await User.search(query);
        res.json(results);
    } catch (err) {
        console.error('Error in searchUsers:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get user profile by ID
const getUserProfileById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const results = await User.findById(userId);

        if (!results) {
            console.error('User.findById returned undefined or null.');
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        const user = results[0];
        console.log('User found:', user);

        if (user.role === 'Professional') {
            console.log('User is a Professional, fetching portfolio...');

            const portfolioResults = await Portfolio.findByUserId(user.user_id);

            if (!portfolioResults) {
                console.error('Portfolio.findByUserId returned undefined or null.');
                return res.status(500).send('Internal Server Error');
            }

            if (portfolioResults.length === 0) {
                console.log('No portfolio found for this professional');
                return res.status(404).send('Portfolio not found');
            }

            console.log('Portfolio found:', portfolioResults);

            const userProfile = { ...user, portfolio: portfolioResults };
            return res.json(userProfile);
        } else {
            console.log('User is not a Professional, returning user data only.');
            return res.json(user);
        }
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        return res.status(500).send(err);
    }
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const results = await User.findById(userId);
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) return res.status(400).send('Incorrect old password');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(userId, hashedPassword);

        res.send('Password updated successfully');
    } catch (err) {
        console.error('Error in changePassword:', err);
        res.status(500).send(err);
    }
});

export { 
    registerClient, 
    registerProfessional, 
    loginUser, 
    getProfessionalProfile, 
    updateProfessionalProfile, 
    getClientProfile, 
    updateClientProfile, 
    getAllProfessionals, 
    searchUsers, 
    getUserProfileById, 
    changePassword 
};
