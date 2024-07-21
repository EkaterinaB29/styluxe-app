import express from 'express';
import { 
    addPost, 
    updatePost, 
    deletePost, 
    getPost, 
    getAllPosts, 
    getPostsByUser, 
    likePost,
    searchPosts,
    upload 
} from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken } = authMiddleware;

const router = express.Router();
router.post('/add', authenticateToken, upload.single('image'), addPost);
// Post routes
router.post('/', authenticateToken, addPost);
router.post('/search', authenticateToken, searchPosts);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);
//router.get('/:id', authenticateToken, getPost);
router.get('/', getAllPosts);
router.get('/user/:userId', authenticateToken, getPostsByUser);
router.post('/:id/like', authenticateToken, likePost);



export default router;
