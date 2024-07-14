const express = require('express');
const { addPost, updatePost, deletePost, getPost, getAllPosts } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Post routes
router.post('/', authenticateToken, addPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);
router.get('/:id', authenticateToken, getPost);
router.get('/', authenticateToken, getAllPosts);

module.exports = router;
