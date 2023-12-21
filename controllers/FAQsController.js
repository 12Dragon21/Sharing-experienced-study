const FAQsSchema = require('../models/FAQs');
const mongoose = require('mongoose')

async function getAllFAQs(req, res) {
  try {
    const faqs = await FAQsSchema.find();
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }
}

async function createFAQ(req, res) {
  try {
    const newFAQ = new FAQsSchema({
      Question: req.body.question,
      Answer: req.body.answer
    });
    const savedFAQ = await newFAQ.save();
    return newFAQ;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
}

async function getFAQ (req, res) {
  try {
    const FAQ = await FAQsSchema.findById(req.params.id);
    return FAQ;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateFAQ (req, res) {
  try {
    const FAQ = await FAQsSchema.findById(req.params.id);
    await FAQ.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteFAQ (req, res) {
  try {
    await FAQsSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllFAQs,
  createFAQ,
  getFAQ,
  updateFAQ,
  deleteFAQ
};
