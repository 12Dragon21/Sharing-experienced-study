const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnnouncementComment = new Schema({
  ACContent: String,
  ACDate: Date,
  ACState: Number,
  AccountID: {type: ObjectId, ref: 'Account'},
  CommentID: {type: ObjectId, ref: 'Comment'},
});