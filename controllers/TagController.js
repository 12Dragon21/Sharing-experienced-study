const TagSchema = require('../models/Tag');
const mongoose = require('mongoose')

async function getAllTag(req, res) {
  try {
    const Tags = await TagSchema.find();
    return Tags;
  } catch (error) {
    console.error('Error fetching Tags:', error);
  }
}

async function createTag(req, res) {
  try {
    const newTag = new TagSchema({
        TagName: req.body.tagName,
        PostID: req.body.postID
    });
    const savedTag = await newTag.save();
    return newTag;
  } catch (error) {
    console.error('Error creating Tag:', error);
    throw error;
  }
}

async function getTag (req, res) {
  try {
    const Tag = await TagSchema.findById(req.params.id);
    return Tag;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateTag (req, res) {
  try {
    const Tag = await TagSchema.findById(req.params.id);
    await Tag.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteTag (req, res) {
  try {
    await TagSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllTag,
  createTag,
  getTag,
  updateTag,
  deleteTag
};
