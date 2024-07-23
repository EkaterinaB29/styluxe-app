import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserProfile,
    searchUsers,
    changePassword, 
    addPortfolio, 
    updatePortfolio, 
    deletePortfolio, 
    uploadMultiple 
} from '../controllers/userController.js';
import authMiddleware  from '../middleware/authMiddleware.js';
// Destructure the middleware functions for separate use
const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();

// User registration routes
router.post('/register', uploadMultiple, registerUser);
router.post('/login', loginUser);

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUserProfile);
router.get('/search',  searchUsers);
router.put('/change-password', authenticateToken, changePassword);

// Portfolio routes accessible only by professionals
router.post('/portfolio', authenticateToken, verifyRole(['Professional']), uploadMultiple, addPortfolio);
router.put('/portfolio/:id', authenticateToken, verifyRole(['Professional']), uploadMultiple, updatePortfolio);
router.delete('/portfolio/:id', authenticateToken, verifyRole(['Professional']), deletePortfolio);



// Check later if needed
// router.get('/portfolio/:id', authenticateToken, getPortfolio);
// router.get('/portfolio/', authenticateToken, getPortfolios);

export default router;
