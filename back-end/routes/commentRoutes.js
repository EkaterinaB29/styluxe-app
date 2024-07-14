const express = require('express');
const { addComment, updateComment, deleteComment, getCommentsByPost } = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Comment routes
router.post('/', authenticateToken, addComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);
router.get('/post/:postId', authenticateToken, getCommentsByPost);

module.exports = router;
