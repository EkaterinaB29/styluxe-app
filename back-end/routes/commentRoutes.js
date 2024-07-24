/*import express from 'express';
import { 
    addComment, 
    updateComment, 
    deleteComment, 
    likeComment, 
    replyOnComment 
} from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken } = authMiddleware;

const router = express.Router();

// Comment routes
router.post('/:id', authenticateToken, addComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);
router.post('/like/:id', authenticateToken, likeComment);
router.post('/reply', authenticateToken, replyOnComment);

export default router;*/
