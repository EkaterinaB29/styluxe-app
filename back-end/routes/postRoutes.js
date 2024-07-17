import express from 'express';
import { 
    addPost, 
    updatePost, 
    deletePost, 
    getPost, 
    getAllPosts, 
    getPostsByUser, 
    likePost 
} from '../controllers/postController.js';
import  authenticateToken  from '../middleware/authMiddleware.js';

const router = express.Router();

// Post routes
router.post('/', authenticateToken, addPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);
router.get('/:id', authenticateToken, getPost);
router.get('/', authenticateToken, getAllPosts);
router.get('/user/:userId', authenticateToken, getPostsByUser);
router.post('/:id/like', authenticateToken, likePost);

export default router;
