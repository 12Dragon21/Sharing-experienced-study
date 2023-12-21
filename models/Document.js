const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DocumentSchema = new Schema({
    DcmType: String,
    DcmDownload: Number,
    DcmDate: Date,
    DcmPath: String,
});

module.exports = mongoose.model("Document", DocumentSchema)