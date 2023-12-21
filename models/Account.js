const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema({
  Username: String,
  Password: String,
  Email: String,
  Role: String,
  Phone: String,
  ImageURL: String,
});

module.exports = mongoose.model("Account", AccountSchema)