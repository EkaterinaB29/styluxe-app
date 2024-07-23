import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import multer from 'multer';

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const addPost = asyncHandler(async (req, res) => {
    const { content, tags } = req.body;
    const user_id = req.user.id;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!content) {
        res.status(400).send('Content is required');
        return;
    }

    const postData = {
        content,
        user_id,
        publish_time: new Date(),
        image_url,
        tags
    };

    await Post.create(postData);
    res.status(201).send('Post added successfully');
});
const updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const { content, tags } = req.body;

    const postData = {
        content,
        publish_time: new Date(),
        tags
    };

    await Post.update(postId, postData);
    res.status(200).send('Post updated successfully');
});

const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    await Post.delete(postId);
    res.status(200).send('Post deleted successfully');
});

const getPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send('Post not found');
    } else {
        res.status(200).json(post);
    }
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).json(posts);
});

const getPostsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const posts = await Post.findByUserId(userId);
    res.status(200).json(posts);
});

const likePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const result = await Post.like(postId);
  if (result.affectedRows === 0) {
    res.status(404).send('Post not found');
  } else {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  }
});


const searchPosts = asyncHandler(async (req, res) => {
    const { query, type } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    try {
      let posts;
      if (type === 'tag') {
        posts = await Post.findByTag(query);
      } else {
        posts = await Post.search(query);
      }
  
      if (posts.length === 0) {
        res.status(404).send('Post not found');
      } else {
        res.status(200).json(posts);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export { addPost, updatePost, deletePost, getPost, getAllPosts, getPostsByUser, likePost, searchPosts, upload };
