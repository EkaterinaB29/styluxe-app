const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log('Register User API called');
    const { firstName, lastName, location, birthday, email, password, role } = req.body;

    try {
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
            res.status(201).send('User registered');
        });
    } catch (error) {
        console.log('Error in registerUser:', error);
        res.status(500).send(error);
    }
};

const loginUser = (req, res) => {
    console.log('Login User API called');
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(400).send('User not found');

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('User logged in successfully');
        res.json({ token });
    });
};

const getUserProfile = (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
};

const updateUserProfile = (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, birthday, role } = req.body;

    User.update(userId, { firstName, lastName, location, birthday, role }, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User profile updated');
    });
};

const deleteUserProfile = (req, res) => {
    const userId = req.user.id;

    User.delete(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User profile deleted');
    });
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile };
