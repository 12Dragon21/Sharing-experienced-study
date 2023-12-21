const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TagSchema = new Schema({
    TagName: String,
    PostID: {type: ObjectId, ref: 'Post'},
});

module.exports = mongoose.model("Tag", TagSchema)