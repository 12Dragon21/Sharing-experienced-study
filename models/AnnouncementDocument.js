const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnnouncementDocumentSchema = new Schema({
  ADContent: String,
  ADDate: Date,
  ADState: Number,
  AccountID: {type: ObjectId, ref: 'Account'},
  DocumentID: {type: ObjectId, ref: 'Document'},
});

module.exports = mongoose.model("AnnouncementDocument", AnnouncementDocumentSchema)