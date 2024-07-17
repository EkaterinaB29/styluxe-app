import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserProfile, 
    addPortfolio, 
    updatePortfolio, 
    deletePortfolio, 
    uploadMultiple 
} from '../controllers/userController.js';
import  authenticateToken  from '../middleware/authMiddleware.js';

const router = express.Router();

// User registration routes
router.post('/register', uploadMultiple, registerUser);
router.get('/login', loginUser);

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUserProfile);

// Profile routes with token authentication
router.post('/portfolio/', authenticateToken, uploadMultiple, addPortfolio);
router.put('/portfolio/:id', authenticateToken, uploadMultiple, updatePortfolio);
router.delete('/portfolio/:id', authenticateToken, deletePortfolio);

// Check later if needed
// router.get('/portfolio/:id', authenticateToken, getPortfolio);
// router.get('/portfolio/', authenticateToken, getPortfolios);

export default router;
