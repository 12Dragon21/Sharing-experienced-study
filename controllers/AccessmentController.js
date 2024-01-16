const AccessmentSchema = require('../models/Accessment');
const mongoose = require('mongoose')

async function getAllAccessments(req, res) {
  try {
    const Accessments = await AccessmentSchema.find({AcmState: 0}).populate("DocumentID").populate("AccountID");
    Accessments.sort((a,b) => (new Date(b.DocumentID.DcmDate) - new Date(a.DocumentID.DcmDate)));
    return Accessments;
  } catch (error) {
    console.error('Error fetching Accessments:', error);
  }
}

async function createAccessment(req, res, newDocument) {
  try {
    console.log(newDocument);
    const newAccessment = new AccessmentSchema({
      AcmState: 0,
      AccountID: req.cookies.account,
      DocumentID: newDocument._id,
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
