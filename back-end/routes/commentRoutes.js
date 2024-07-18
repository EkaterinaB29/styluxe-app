import express from 'express';
import { 
    addComment, 
    updateComment, 
    deleteComment, 
    getCommentsByPost, 
    likeComment, 
    replyOnComment 
} from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken } = authMiddleware;

const router = express.Router();

// Comment routes
router.post('/', authenticateToken, addComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);
router.get('/post/:postId', authenticateToken, getCommentsByPost);
router.post('/like/:id', authenticateToken, likeComment);
router.post('/reply', authenticateToken, replyOnComment);

export default router;
