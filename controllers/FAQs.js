const FAQs = require('../models/FAQs');

async function getAllFAQs() {
  try {
    // Retrieve all FAQs from the database
    const faqs = await FAQs.find();
    return faqs;
  } catch (error) {
    // Handle errors
    console.error('Error fetching FAQs:', error);
    throw error; // Propagate the error to the calling function
  }
}

async function createFAQ(question, answer) {
  try {
    // Create a new FAQ
    const newFAQ = new FAQs({ Question: question, Answer: answer });
    // Save the new FAQ to the database
    await newFAQ.save();
    return newFAQ;
  } catch (error) {
    // Handle errors
    console.error('Error creating FAQ:', error);
    throw error; // Propagate the error to the calling function
  }
}

module.exports = {
  getAllFAQs,
  createFAQ,
};
