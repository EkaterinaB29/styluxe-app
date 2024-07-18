import express from 'express';
import { 
    addReview, 
    updateReview, 
    deleteReview, 
    getReviewsByPortfolio, 
    getReviewsByUser 
} from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();

// Review routes
router.post('/', authenticateToken, verifyRole(['Client']), addReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);
router.get('/portfolio/:portfolioId', getReviewsByPortfolio);
router.get('/user/:userId', getReviewsByUser);

export default router;
