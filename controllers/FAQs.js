const FAQs = require('../models/FAQs');

async function getAllFAQs() {
  try {
    const faqs = await FAQs.find();
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }
}

async function createFAQ(question, answer) {
  try {
    const newFAQ = new FAQs({ Question: question, Answer: answer });
    await newFAQ.save();
    return newFAQ;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
}

module.exports = {
  getAllFAQs,
  createFAQ,
};
