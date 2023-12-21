const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  PostName: String,
  PostContent: String,
  PostLike: Number,
  PostDislike: Number,
  PostDate: Date,
  PostState: Number,
});

module.exports = mongoose.model("Post", PostSchema)