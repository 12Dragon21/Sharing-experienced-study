const AnouncementDocumentSchema = require('../models/AnouncementDocument');
const mongoose = require('mongoose')

async function getAllAnouncementDocument(req, res) {
  try {
    const AnouncementDocuments = await AnouncementDocumentSchema.find();
    return AnouncementDocuments;
  } catch (error) {
    console.error('Error fetching AnnouncementDocuments:', error);
  }
}

async function createAnouncementDocument(req, res) {
  try {
    const newAnouncementDocument = new AnouncementDocumentSchema({
        ADContent: req.body.adContent,
        ADDate: req.body.adDate,
        ADState: req.body.State,
        AccountID: req.body.accountID,
        DocumentID: req.body.documentID
    });
    const savedAnouncementDocument = await newAnouncementDocument.save();
    return newAnouncementDocument;
  } catch (error) {
    console.error('Error creating AnnouncementDocument:', error);
    throw error;
  }
}

async function getAnouncementDocument (req, res) {
  try {
    const AnouncementDocument = await AnouncementDocumentSchema.findById(req.params.id);
    return AnouncementDocument;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAnouncementDocument (req, res) {
  try {
    const AnouncementDocument = await AnouncementDocumentSchema.findById(req.params.id);
    await AnouncementDocument.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAnouncementDocument (req, res) {
  try {
    await AnouncementDocumentSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAnouncementDocument,
  createAnouncementDocument,
  getAnouncementDocument,
  updateAnouncementDocument,
  deleteAnouncementDocument
};