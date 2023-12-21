const DocumentTagSchema = require('../models/DocumentTag');
const mongoose = require('mongoose')

async function getAllDocumentTag(req, res) {
  try {
    const DocumentTags = await DocumentTagSchema.find();
    return DocumentTags;
  } catch (error) {
    console.error('Error fetching DocumentTags:', error);
  }
}

async function createDocumentTag(req, res) {
  try {
    const newDocumentTag = new DocumentTagSchema({
        DTName: req.body.dtName,
        DocumentID: req.body.documentID
    });
    const savedDocumentTag = await newDocumentTag.save();
    return newDocumentTag;
  } catch (error) {
    console.error('Error creating DocumentTag:', error);
    throw error;
  }
}

async function getDocumentTag (req, res) {
  try {
    const DocumentTag = await DocumentTagSchema.findById(req.params.id);
    return DocumentTag;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateDocumentTag (req, res) {
  try {
    const DocumentTag = await DocumentTagSchema.findById(req.params.id);
    await DocumentTag.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteDocumentTag (req, res) {
  try {
    await DocumentTagSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllDocumentTag,
  createDocumentTag,
  getDocumentTag,
  updateDocumentTag,
  deleteDocumentTag
};
