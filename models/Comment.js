const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  CmtContent: String,
  CmtDate: Date,
  CmtLike: Number,
  CmtDisLike:Number,
  PostID: {type: ObjectId, ref: 'Post'}
});