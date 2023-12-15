const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Document = new Schema({
    DcmType: String,
    DcmDownload: Number,
    DcmDate: Date,
    DcmPath: String,
});