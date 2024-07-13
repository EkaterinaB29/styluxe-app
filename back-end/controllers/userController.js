const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


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
    limits: { fileSize:1024 * 1024 * 1024 * 10 } 
});

const uploadMultiple = upload.array('portfolio', 10); 





// Register user
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
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.log('Error in registerUser:', error);
        res.status(500).send(error);
    }
};

// Login user
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

// Get user profile
const getUserProfile = (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
};

// Update user profile
const updateUserProfile = (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, location, birthday, role } = req.body;

    User.update(userId, { firstName, lastName, location, birthday, role }, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User profile updated');
    });
};

// Delete user profile
const deleteUserProfile = (req, res) => {
    const userId = req.user.id;

    User.delete(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User profile deleted');
    });
};

// Add Portfolio
const addPortfolio = async (req, res) => {
    console.log('addPortfolio function called');
    
    const userId = req.user.id;
    const education_history  = req.body;

    /*console.log('User ID:', userId);
    console.log('Education History:', education_history);
    console.log('Files:', req.files);
    console.log('Body:', req.body);*/

   
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
        console.error('Error adding portfolio:', err);
        res.status(500).send('Failed to add portfolio');
    }
};


// Update Portfolio
const updatePortfolio = (req, res) => {
    const portfolioId = req.params.id;
    const { education_history } = req.body;

    const portfolioData = {
        file_name: req.file ? req.file.filename : null,
        file_type: req.file ? req.file.mimetype : null,
        file_size: req.file ? req.file.size : null,
        file_path: req.file ? req.file.path : null,
        education_history: education_history
    };

    Portfolio.update(portfolioId, portfolioData, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Portfolio updated successfully');
    });
};

// Delete Portfolio
const deletePortfolio = (req, res) => {
    const portfolioId = req.params.id;

    Portfolio.delete(portfolioId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Portfolio deleted successfully');
    });
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, addPortfolio, updatePortfolio, deletePortfolio, uploadMultiple };
