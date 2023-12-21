const AnouncementPostSchema = require('../models/AnouncementPost');
const mongoose = require('mongoose')

async function getAllAnouncementPost(req, res) {
  try {
    const AnouncementPosts = await AnouncementPostSchema.find();
    return AnouncementPosts;
  } catch (error) {
    console.error('Error fetching AnnouncementPosts:', error);
  }
}

async function createAnouncementPost(req, res) {
  try {
    const newAnouncementPost = new AnouncementPostSchema({
        APContent: req.body.apContent,
        APDate: req.body.apDate,
        APState: req.body.apSate,
        AccountID: req.body.accountID,
        PostID: req.body.postID
    });
    const savedAnouncementPost = await newAnouncementPost.save();
    return newAnouncementPost;
  } catch (error) {
    console.error('Error creating AnnouncementPost:', error);
    throw error;
  }
}

async function getAnouncementPost (req, res) {
  try {
    const AnouncementPost = await AnouncementPostSchema.findById(req.params.id);
    return AnouncementPost;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAnouncementPost (req, res) {
  try {
    const AnouncementPost = await AnouncementPostSchema.findById(req.params.id);
    await AnouncementPost.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAnouncementPost (req, res) {
  try {
    await AnouncementPostSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAnouncementPost,
  createAnouncementPost,
  getAnouncementPost,
  updateAnouncementPost,
  deleteAnouncementPost
};