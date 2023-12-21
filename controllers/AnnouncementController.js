const AnouncementSchema = require('../models/Anouncement');
const mongoose = require('mongoose')

async function getAllAnouncement(req, res) {
  try {
    const Anouncements = await AnouncementSchema.find();
    return Anouncements;
  } catch (error) {
    console.error('Error fetching Announcements:', error);
  }
}

async function createAnouncement(req, res) {
  try {
    const newAnouncement = new AnouncementSchema({
        AnmContent: req.body.anmContent,
        AnmDate: req.body.anmdate,
        AnmState: req.body.anmstate
    });
    const savedAnouncement = await newAnouncement.save();
    return newAnouncement;
  } catch (error) {
    console.error('Error creating Announcement:', error);
    throw error;
  }
}

async function getAnouncement (req, res) {
  try {
    const Anouncement = await AnouncementSchema.findById(req.params.id);
    return Anouncement;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateAnouncement (req, res) {
  try {
    const Anouncement = await AnouncementSchema.findById(req.params.id);
    await Anouncement.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAnouncement (req, res) {
  try {
    await AnouncementSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAnouncement,
  createAnouncement,
  getAnouncement,
  updateAnouncement,
  deleteAnouncement
};
