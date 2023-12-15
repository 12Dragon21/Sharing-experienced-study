const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Tag = new Schema({
    TagName: String,
    PostID: {type: ObjectId, ref: 'Post'},
});