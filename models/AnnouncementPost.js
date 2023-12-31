const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnnouncementPostSchema = new Schema({
    APContent: String,
    APDate: Date,
    APState: Number,
    AccountID: {type: ObjectId, ref: 'Account'},
    PostID: {type: ObjectId, ref: 'Post'},
});

module.exports = mongoose.model("AnnouncementPost", AnnouncementPostSchema)