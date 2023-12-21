const AnouncementCommentSchema = require('../models/AnouncementComment');
const mongoose = require('mongoose')

async function getAllAnouncementComment(req, res) {
  try {
    const AnouncementComments = await AnouncementCommentSchema.find();
    return AnouncementComments;
  } catch (error) {
    console.error('Error fetching AnnouncementComments:', error);
  }
}

async function createAnouncementComment(req, res) {
  try {
    const newAnouncementComment = new AnouncementCommentSchema({
      ACContent: req.body.acContent,
      ACDate: req.body.acDate,
      ACState: req.body.acState,
      AccountID: req.body.accountID,
      CommentID: req.body.commentID
    });
    const savedAnouncementComment = await newAnouncementComment.save();
    return newAnouncementComment;
  } catch (error) {
    console.error('Error creating AnnouncementComment:', error);
    throw error;
  }
}

async function getAnouncementComment (req, res) {
  try {
    const AnouncementComment = await AnouncementCommentSchema.findById(req.params.id);
    return AnouncementComment;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAnouncementComment (req, res) {
  try {
    const AnouncementComment = await AnouncementCommentSchema.findById(req.params.id);
    await AnouncementComment.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAnouncementComment (req, res) {
  try {
    await AnouncementCommentSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAnouncementComment,
  createAnouncementComment,
  getAnouncementComment,
  updateAnouncementComment,
  deleteAnouncementComment
};
