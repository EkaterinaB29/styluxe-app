import express from 'express';
import { 
    createReport, 
    deleteReport, 
    getReportsByReporter, 
    getReportsByReported 
} from '../controllers/reportController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken } = authMiddleware;
const router = express.Router();

router.post('/', authenticateToken, createReport);
router.delete('/:id', authenticateToken, deleteReport);
router.get('/reporter/:reporterId', authenticateToken, getReportsByReporter);
router.get('/reported/:reportedId', authenticateToken, getReportsByReported);

export default router;
