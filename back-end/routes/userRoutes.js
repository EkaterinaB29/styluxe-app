const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.get('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUserProfile);

module.exports = router;
