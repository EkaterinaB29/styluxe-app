import express from 'express';
import { 
    createPost, 
    updatePost, 
    deletePost, 
    getPostWithComments, 
    getAllPosts, 
    getPostsByUser, 
    likePost,
    searchPosts,
    upload 
} from '../controllers/postController.js';
import { 
    createComment,
    updateComment, 
    deleteComment, 
    likeComment, 
    replyOnComment 
} from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateToken } = authMiddleware;

const router = express.Router();



router.get('/search', searchPosts);
router.get('/user/:userId', getPostsByUser);
router.put('/:postId/like', authenticateToken, likePost);
router.get('/:postId', getPostWithComments);
router.get('/', getAllPosts);
router.post('/', upload.single('image'), authenticateToken, createPost);
router.put('/:postId', authenticateToken, updatePost);
router.delete('/:postId', authenticateToken, deletePost);

router.post('/:postId/comments', authenticateToken, createComment);
router.put('/:postId/comments/:commentId', authenticateToken, updateComment);
router.delete('/:postId/comments/:commentId', authenticateToken, deleteComment);
router.post('/:postId/comments/:commentId/like', authenticateToken, likeComment);
router.post('/:postId/comments/:commentId/reply', authenticateToken, replyOnComment);

export default router;