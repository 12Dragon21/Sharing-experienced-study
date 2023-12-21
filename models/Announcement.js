const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnnouncementSchema = new Schema({
    AnmContent: String,
    AnmDate: Date,
    AnmState: Number,
});

module.exports = mongoose.model("Announcement", AnnouncementSchema)