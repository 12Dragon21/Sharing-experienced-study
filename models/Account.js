const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  Username: String,
  Password: String,
  Email: String,
  Role: String,
  Phone: String,
  ImageURL: String,
  Years: String, // New property
});

module.exports = mongoose.model("Account", AccountSchema);
