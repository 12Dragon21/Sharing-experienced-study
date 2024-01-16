  const CommentSchema = require('../models/Comment');
  const mongoose = require('mongoose')

  async function getAllComment(req, res) {
    try {
      const Comments = await CommentSchema.find();
      Comments.sort((a,b) => (new Date(b.CmtDate) - new Date(a.CmtDate)));
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


  async function likeComment(req, res) {
    try {
        const commentId = req.params.id;
        const comment = await CommentSchema.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
    
        comment.CmtLike += 1;
        await comment.save();
    
        return res.status(200).json({ message: 'Comment liked successfully', comment });
    } catch (error) {
        console.error('Error liking comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function unlikeComment(req, res) {
    try {
        const commentId = req.params.id;
        const comment = await CommentSchema.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
    
        comment.CmtLike -= 1;
        await comment.save();
    
        return res.status(200).json({ message: 'Comment unliked successfully', comment });
    } catch (error) {
        console.error('Error unliking comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function dislikeComment(req, res) {
  try {
      const commentId = req.params.id;
      const comment = await CommentSchema.findById(commentId);
      
      if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
      }
  
      comment.CmtDislike += 1;
      await comment.save();
  
      return res.status(200).json({ message: 'Comment disliked successfully', comment });
  } catch (error) {
      console.error('Error disliking comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function undislikeComment(req, res) {
  try {
      const commentId = req.params.id;
      const comment = await CommentSchema.findById(commentId);
      
      if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
      }
  
      comment.CmtDislike -= 1;
      await comment.save();
  
      return res.status(200).json({ message: 'Comment undisliked successfully', comment });
  } catch (error) {
      console.error('Error undisliking comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}

  
  module.exports = {
    getAllComment,
    createComment,
    getComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
    dislikeComment,
    undislikeComment,
  };
