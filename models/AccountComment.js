const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountCommentSchema = new Schema({
    ACLike: Number,
    ACDislike: Number,
    ACState: Number,
    AccountID: {type: ObjectId, ref: 'Account'},
    CommentID: {type: ObjectId, ref: 'Comment'},
});

module.exports = mongoose.model("AccountComment", AccountCommentSchema)