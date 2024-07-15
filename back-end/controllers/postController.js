const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

const addPost = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) {
        res.status(400).send('Content is required');
        return;
    }

    const postData = {
        content,
        user_id,
        publish_time: new Date()  
    };

    await Post.create(postData);
    res.status(201).send('Post added successfully');
});

const updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;

    const postData = {
        content,
        publish_time: new Date()  
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

    await Post.like(postId);
    res.status(200).send('Post liked successfully');
});
module.exports = { addPost, updatePost, deletePost, getPost, getAllPosts , getPostsByUser, likePost};
