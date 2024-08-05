import express from 'express';
import { addPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';
import { uploadProfessional } from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();

router.post('/upload/:userId', uploadProfessional, addPortfolio);
router.put('/:id', authenticateToken, verifyRole(['Professional']), uploadProfessional, updatePortfolio);
router.delete('/:id', authenticateToken, verifyRole(['Professional']), deletePortfolio);

export default router;
