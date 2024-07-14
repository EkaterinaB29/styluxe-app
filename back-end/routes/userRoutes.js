const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, addPortfolio, updatePortfolio, deletePortfolio, uploadMultiple } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();



// User registration routes
router.post('/register', uploadMultiple, registerUser);
router.get('/login', loginUser);

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUserProfile);


//Profile routes now it is  with pasw [token-authentication] change if needed
router.post('/portfolio/', authenticateToken,uploadMultiple, addPortfolio );
router.put('/portfolio/:id',authenticateToken, uploadMultiple, updatePortfolio);
router.delete('/portfolio/:id',authenticateToken, deletePortfolio);

// Check later if needed !!!
// router.get('/portfolio/:id', authenticateToken, getPortfolio);
// router.get('/portfolio/', authenticateToken, getPortfolios);

module.exports = router;











