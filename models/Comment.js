const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  CmtContent: String,
  CmtDate: Date,
  CmtLike: Number,
  CmtDisLike:Number,
  PostID: {type: ObjectId, ref: 'Post'}
});

module.exports = mongoose.model("Comment", CommentSchema)