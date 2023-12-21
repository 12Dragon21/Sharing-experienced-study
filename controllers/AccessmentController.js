const AccessmentSchema = require('../models/Accessment');
const mongoose = require('mongoose')

async function getAllAccessments(req, res) {
  try {
    const Accessments = await AccessmentSchema.find();
    return Accessments;
  } catch (error) {
    console.error('Error fetching Accessments:', error);
  }
}

async function createAccessment(req, res) {
  try {
    const newAccessment = new AccessmentSchema({
      AcmState: req.body.acmState,
      AccountID: req.body.accountID,
      DocumentID: req.body.documentID,
    });
    const savedAccessment = await newAccessment.save();
    return newAccessment;
  } catch (error) {
    console.error('Error creating Accessment:', error);
    throw error;
  }
}

async function getAccessment (req, res) {
  try {
    const Accessment = await AccessmentSchema.findById(req.params.id);
    return Accessment;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAccessment (req, res) {
  try {
    const Accessment = await AccessmentSchema.findById(req.params.id);
    await Accessment.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAccessment (req, res) {
  try {
    await AccessmentSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAccessments,
  createAccessment,
  getAccessment,
  updateAccessment,
  deleteAccessment
};
