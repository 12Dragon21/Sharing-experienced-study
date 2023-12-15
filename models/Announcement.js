const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Announcement = new Schema({
    AnmContent: String,
    AnmDate: Date,
    AnmState: Number,
});