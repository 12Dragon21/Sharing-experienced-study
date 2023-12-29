const PostSchema = require('../models/Post');
const mongoose = require('mongoose')

async function getAllPost(req, res, page = 1, postsPerPage = 5) {
  try {
    const skip = (page - 1) * postsPerPage;
    const abc = await PostSchema.find();
    const Posts = await PostSchema.find().skip(skip).limit(postsPerPage);
    console.log(abc);
    return Posts;
  } catch (error) {
    console.error('Error fetching Posts:', error);
    throw error;
  }
}

async function createPost(req, res) {
  try {
    console.log(req.body);
    const newPost = new PostSchema({
        PostName: req.body.postName,
        PostContent: req.body.postContent,
        PostLike: 0,
        PostDislike: 0,
        PostDate: new Date(),
        PostState: 0
    });
    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    console.error('Error creating Post:', error);
    throw error;
  }
}

async function getPost (req, res) {
  try {
    const Post = await PostSchema.findById(req.query.postid);
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
