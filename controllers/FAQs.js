const FAQs = require('../models/FAQs');

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const FAQs = mongoose.model('FAQs', faqSchema);
// CreateFAQ function now accepts question and answer parameters
async function CreateFAQ(question, answer) {
    // Create FAQ in the database
    await FAQs.create({ question, answer });
  }

// Function to get all FAQs
async function getAllFAQs() {
    return FAQs.find();
  }
  module.exports = { CreateFAQ, getAllFAQs };