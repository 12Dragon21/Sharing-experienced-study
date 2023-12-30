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

async function updatePost(req, res) {
  try {
    const postId = req.params.id;

    // Check if postId is undefined or not a valid ObjectId
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await PostSchema.findById(postId);

    // Check if the post with the given ID exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the post
    await post.updateOne({ $set: req.body });

    // Respond with the updated post or a success message
    return res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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
