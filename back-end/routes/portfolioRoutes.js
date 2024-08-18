import express from 'express';
import { createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';
import { uploadProfessional } from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();

router.post('/upload/:userId', uploadProfessional, createPortfolio);
router.put('/:id', authenticateToken, verifyRole(['Professional']), uploadProfessional, updatePortfolio);
router.delete('/:id', authenticateToken, verifyRole(['Professional']), deletePortfolio);

export default router;
