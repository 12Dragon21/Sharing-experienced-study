const AccountPostSchema = require('../models/AccountPost');
const mongoose = require('mongoose')

async function getAllAccountPost(req, res) {
  try {
    const AccountPosts = await AccountPostSchema.find();
    return AccountPosts;
  } catch (error) {
    console.error('Error fetching Announcements:', error);
  }
}

async function createAccountPost(req, res) {
  try {
    const newAccountPost = new AccountPostSchema({
        AnmContent: req.body.anmContent,
        AnmDate: req.body.anmdate,
        AnmState: req.body.anmstate
    });
    const savedAccountPost = await newAccountPost.save();
    return newAccountPost;
  } catch (error) {
    console.error('Error creating Announcement:', error);
    throw error;
  }
}

async function getAccountPost (req, res) {
  try {
    const AccountPost = await AccountPostSchema.findById(req.params.id);
    return AccountPost;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAccountPost (req, res) {
  try {
    const AccountPost = await AccountPostSchema.findById(req.params.id);
    await AccountPost.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAccountPost (req, res) {
  try {
    await AccountPostSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAccountPost,
  createAccountPost,
  getAccountPost,
  updateAccountPost,
  deleteAccountPost
};
