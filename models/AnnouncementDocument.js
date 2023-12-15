const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnnouncementDocument = new Schema({
  ADContent: String,
  ADDate: Date,
  ADState: Number,
  AccountID: {type: ObjectId, ref: 'Account'},
  DocumentID: {type: ObjectId, ref: 'Document'},
});