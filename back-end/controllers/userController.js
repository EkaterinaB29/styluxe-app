import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Portfolio from '../models/portfolioModel.js';

// Register client
const registerClient = asyncHandler(async (req, res) => {
    try {
        const { first_name, last_name, location, birthday, email, password } = req.body;

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

        User.create(userData, (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already registered', code: 'ER_DUP_ENTRY' });
                }
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Failed to create user', details: err });
            }
            const userId = results.insertId;

            const token = jwt.sign({ id: userId, email: userData.email, role: userData.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: 'Client registered successfully', token, userId });
        });
    } catch (error) {
        console.error('Error in registerClient:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
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

        User.create(userData, async (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already registered', code: 'ER_DUP_ENTRY' });
                }
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Failed to create user', details: err });
            }
            const userId = results.insertId;

            const token = jwt.sign({ id: userId, email: userData.email, role: userData.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

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
        });
    } catch (error) {
        console.error('Error in registerProfessional:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
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

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
            sameSite: 'Lax',
        });

        res.json({ message: 'Login successful', role: user.role });
    });
});

// Get professional profile
const getProfessionalProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(`Fetching professional profile for userId: ${userId}`);

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

// Get client profile
const getClientProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(`Fetching client profile for userId: ${userId}`);

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
});

// Utility function to clean update fields
const cleanUpdateFields = (fields) => {
    return Object.fromEntries(Object.entries(fields).filter(([_, v]) => v !== undefined));
};

// Update professional profile
const updateProfessionalProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(`Updating professional profile for userId: ${userId}`);
    const { firstName, lastName, location, email, education_history } = req.body;
    const profile_picture = req.files && req.files['profile_picture'] ? `/uploads/${req.files['profile_picture'][0].filename}` : undefined;
    const portfolio_file = req.files && req.files['portfolio'] ? `/uploads/${req.files['portfolio'][0].filename}` : undefined;

    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    User.findById(userId, (err, results) => {
        if (err) {
            console.log('Error finding user:', err);
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        console.log('User found:', results[0]);

        const updateFields = cleanUpdateFields({
            first_name: firstName,
            last_name: lastName,
            location,
            email,
            profile_picture: profile_picture || results[0].profile_picture,
        });

        console.log('Update fields:', updateFields);

        User.update(userId, updateFields, (updateErr, updateResults) => {
            if (updateErr) {
                console.log('Error updating user:', updateErr);
                return res.status(500).send(updateErr);
            }

            console.log('User update results:', updateResults);

            if (portfolio_file || education_history) {
                const portfolioData = cleanUpdateFields({ file_path: portfolio_file, education_history });
                console.log('Portfolio data:', portfolioData);

                Portfolio.updateByUserId(userId, portfolioData, (portfolioErr, portfolioResults) => {
                    if (portfolioErr) {
                        console.log('Error updating portfolio:', portfolioErr);
                        return res.status(500).send(portfolioErr);
                    }
                    console.log('Portfolio update results:', portfolioResults);
                    res.send('Professional profile updated with portfolio');
                });
            } else {
                res.send('Professional profile updated');
            }
        });
    });
});

// Update client profile
const updateClientProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(`Updating client profile for userId: ${userId}`);
    const { firstName, lastName, location, email } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : req.body.existingProfileImage;

    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const user = await User.findById(userId);
    const updateFields = cleanUpdateFields({
        first_name: firstName,
        last_name: lastName,
        location,
        email,
        profile_picture: profile_picture || user[0].profile_picture,
    });

    User.update(userId, updateFields, (err, results) => {
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

export { registerClient, registerProfessional, loginUser, getProfessionalProfile, updateProfessionalProfile, getClientProfile, updateClientProfile, getAllProfessionals, searchUsers, changePassword };
