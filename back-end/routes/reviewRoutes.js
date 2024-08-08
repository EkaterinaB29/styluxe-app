import express from 'express';
import {
    addReview,
    updateReview,
    deleteReview,
    getReviewsByPortfolio,
    getReviewsByProfessional,
    getReviewsByUser,
    getPortfolio
} from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();

// Review routes
router.get('/professional/:userId', getReviewsByProfessional);
router.post('/:professionalId', authenticateToken, verifyRole(['Client']), addReview);
/*router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);
router.get('/user/:id', getReviewsByUser);
router.get('/portfolio/:portfolioId', getReviewsByPortfolio);
*/
export default router;
