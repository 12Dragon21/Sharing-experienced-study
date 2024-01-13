const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  CmtContent: String,
  CmtDate: Date,
  CmtLike: { type: Number, default: 0 },
  CmtDislike: { type: Number, default: 0 },
  PostID: { type: ObjectId, ref: 'Post' },
});

module.exports = mongoose.model("Comment", CommentSchema)