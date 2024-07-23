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



// Define search route first since it's specific
router.get('/search', searchPosts);

// Define the route to get posts by a specific user, it's specific and should be defined before other GET routes
router.get('/user/:userId', authenticateToken, getPostsByUser);

// Define the route to get a specific post by ID before the general get all posts route
router.get('/:id', getPost);

// Define the general get all posts route
router.get('/', getAllPosts);

// Define the route to like a post, which is specific and requires an ID
router.put('/:id/like', authenticateToken, likePost);

// Define the route to create a post
router.post('/', upload.single('image'), authenticateToken, addPost);

// Define the route to update a post
router.put('/:id', authenticateToken, updatePost);

// Define the route to delete a post
router.delete('/:id', authenticateToken, deletePost);

export default router;
