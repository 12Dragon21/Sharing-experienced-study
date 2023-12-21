const AccountCommentSchema = require('../models/AccountComment');
const mongoose = require('mongoose')

async function getAllAccountComment(req, res) {
  try {
    const AccountComments = await AccountCommentSchema.find();
    return AccountComments;
  } catch (error) {
    console.error('Error fetching AccountComments:', error);
  }
}

async function createAccountComment(req, res) {
  try {
    const newAccountComment = new AccountCommentSchema({
      ACLike: req.body.acLike,
      ACDislike: req.body.acDislike,
      ACState: req.body.acState,
      AccountID: req.body.accountID,
      CommentID: req.body.commentID,
    });
    const savedAccountComment = await newAccountComment.save();
    return newAccountComment;
  } catch (error) {
    console.error('Error creating AccountComment:', error);
    throw error;
  }
}

async function getAccountComment (req, res) {
  try {
    const AccountComment = await AccountCommentSchema.findById(req.params.id);
    return AccountComment;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAccountComment (req, res) {
  try {
    const AccountComment = await AccountCommentSchema.findById(req.params.id);
    await AccountComment.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAccountComment (req, res) {
  try {
    await AccountCommentSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAccountComment,
  createAccountComment,
  getAccountComment,
  updateAccountComment,
  deleteAccountComment
};
