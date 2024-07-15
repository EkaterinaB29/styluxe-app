const express = require('express');
const { addPost, updatePost, deletePost, getPost, getAllPosts, getPostsByUser, likePost } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Post routes
router.post('/', authenticateToken, addPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);
router.get('/:id', authenticateToken, getPost);
router.get('/', authenticateToken, getAllPosts);
router.get('/user/:userId', authenticateToken, getPostsByUser);
router.post('/:id/like', authenticateToken, likePost);


module.exports = router;
