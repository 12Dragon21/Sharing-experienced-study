const DocumentSchema = require('../models/Document');
const mongoose = require('mongoose')

async function getAllDocument(req, res) {
  try {
    const Documents = await DocumentSchema.find();
    return Documents;
  } catch (error) {
    console.error('Error fetching Documents:', error);
  }
}

async function createDocument(req, res) {
  try {
    const newDocument = new DocumentSchema({
        DcmType: req.body.dcmType,
        DcmDownload: req.body.dcmDownload,
        DcmDate: req.body.dcmDate,
        DcmPath: req.body.dcmPath
    });
    const savedDocument = await newDocument.save();
    return newDocument;
  } catch (error) {
    console.error('Error creating Document:', error);
    throw error;
  }
}

async function getDocument (req, res) {
  try {
    const Document = await DocumentSchema.findById(req.params.id);
    return Document;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateDocument (req, res) {
  try {
    const Document = await DocumentSchema.findById(req.params.id);
    await Document.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteDocument (req, res) {
  try {
    await DocumentSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllDocument,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument
};
