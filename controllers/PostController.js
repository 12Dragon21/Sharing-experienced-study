const PostSchema = require('../models/Post');
const mongoose = require('mongoose')

async function getAllPost(req, res) {
  try {
    const Posts = await PostSchema.find();
    return Posts;
  } catch (error) {
    console.error('Error fetching Posts:', error);
  }
}

async function createPost(req, res) {
  try {
    const newPost = new PostSchema({
        PostName: req.body.postName,
        PostContent: req.body.postContent,
        PostLike: 0,
        PostDislike: 0,
        PostDate: 0,
        PostState: 0
    });
    const savedPost = await newPost.save();
    return newPost;
  } catch (error) {
    console.error('Error creating Post:', error);
    throw error;
  }
}

async function getPost (req, res) {
  try {
    const Post = await PostSchema.findById(req.params.id);
    return Post;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updatePost (req, res) {
  try {
    const Post = await PostSchema.findById(req.params.id);
    await Post.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deletePost (req, res) {
  try {
    await PostSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost
};
