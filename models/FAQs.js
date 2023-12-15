const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FAQs = new Schema({
  Question: String,
  Answer: String,
});

module.exports = mongoose.model('FAQs', FAQs)