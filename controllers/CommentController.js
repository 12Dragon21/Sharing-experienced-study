  const CommentSchema = require('../models/Comment');
  const mongoose = require('mongoose')

  async function getAllComment(req, res) {
    try {
      const Comments = await CommentSchema.find();
      return Comments;
    } catch (error) {
      console.error('Error fetching Comments:', error);
    }
  }

  async function createComment(req, res) {
    try {
      const newComment = new CommentSchema({
        CmtContent: req.query.message,
        CmtDate: new Date(),
        CmtLike: 0,
        CmtDisLike: 0,
        PostID: req.query.postid,
      });
      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      console.error('Error creating Comment:', error);
      throw error;
    }
  }

  async function getComment (req, res) {
    try {
      const Comment = await CommentSchema.findById(req.params.id);
      return Comment;
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async function updateComment (req, res) {
    try {
      const Comment = await CommentSchema.findById(req.params.id);
      await Comment.updateOne({ $set: req.body });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async function deleteComment (req, res) {
    try {
      await CommentSchema.findByIdAndDelete(req.params.id);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  module.exports = {
    getAllComment,
    createComment,
    getComment,
    updateComment,
    deleteComment
  };
