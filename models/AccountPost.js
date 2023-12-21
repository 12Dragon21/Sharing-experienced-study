const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountPostSchema = new Schema({
  APLike: Number,
  APDislike: Number,
  APFollow: Number,
  APState: Number,
  AccountID: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  PostID: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = mongoose.model("AccountPost", AccountPostSchema)