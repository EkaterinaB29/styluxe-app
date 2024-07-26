import express from 'express';
import {
    addPortfolio,
    updatePortfolio,
    deletePortfolio
} from '../controllers/portfolioController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadMultiple } from '../middleware/uploadMiddleware.js'; 

const { authenticateToken, verifyRole } = authMiddleware;

const router = express.Router();


router.post('/portfolio', authenticateToken, verifyRole(['Professional']), uploadMultiple, addPortfolio);
router.put('/portfolio/:id', authenticateToken, verifyRole(['Professional']), uploadMultiple, updatePortfolio);
router.delete('/portfolio/:id', authenticateToken, verifyRole(['Professional']), deletePortfolio);

export default router;
