const PostSchema = require('../models/Post');
const mongoose = require('mongoose')

async function getAllPost(req, res, page = 1, postsPerPage = 5) {
  try {
    const skip = (page - 1) * postsPerPage;
    const Posts = await PostSchema.find().skip(skip).limit(postsPerPage);
    Posts.sort((a,b) => (new Date(b.PostDate) - new Date(a.PostDate)))
    return Posts;
  } catch (error) {
    console.error('Error fetching Posts:', error);
    throw error;
  }
}

async function createPost(req, res) {
  try {
    const newPost = new PostSchema({
        PostName: req.body.postName,
        PostContent: req.body.postContent,
        PostLike: 0,
        PostDislike: 0,
        PostDate: new Date(),
        PostState: 0
    });
    if(req.file?.path!=null && req.file?.path!=""){
      newPost.ImageURL = req.file?.path;
    }
    else{
      newPost.ImageURL="";
    }
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
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.updateOne({ $set: req.body });
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
async function likePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.PostLike += 1;
    await post.save();
    return res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
async function unlikePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.PostLike -= 1;
    await post.save();
    return res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function dislikePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.PostDislike += 1;
    await post.save();
    return res.status(200).json({ message: 'Post disliked successfully', post });
  } catch (error) {
    console.error('Error disliking post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function undislikePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await PostSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.PostDislike -= 1;
    await post.save();
    return res.status(200).json({ message: 'Post disliked successfully', post });
  } catch (error) {
    console.error('Error disliking post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  unlikePost,
  undislikePost,
};
