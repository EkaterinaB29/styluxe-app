import express from 'express';
import { 
    addReview, 
    updateReview, 
    deleteReview, 
    getReviewsByPortfolio, 
    getReviewsByUser 
} from '../controllers/reviewController.js';
import  authenticateToken  from '../middleware/authMiddleware.js';

const router = express.Router();

// Review routes
router.post('/', authenticateToken, addReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);
router.get('/portfolio/:portfolioId', getReviewsByPortfolio);
router.get('/user/:userId', getReviewsByUser);

export default router;
