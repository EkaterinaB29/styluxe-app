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
//router.post('/', authenticateToken, upload.single('image'), addPost);
// Post routes

//router.post('/search', authenticateToken, searchPosts);
router.put('/:id', authenticateToken, updatePost);
//router.delete('/:id', authenticateToken, deletePost);
//router.get('/:id', authenticateToken, getPost);
//router.get('/', getAllPosts);
//router.get('/user/:userId', authenticateToken, getPostsByUser);
//router.put('/:id/like', authenticateToken, likePost);

router.put('/:id/like', authenticateToken, likePost);
//router.post('/', authenticateToken, upload.single('image'), addPost);
//router.post('/search', authenticateToken, searchPosts);
router.get('/', getAllPosts);
router.get('/:id',getPost);



export default router;
