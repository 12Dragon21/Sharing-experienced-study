const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DocumentTag = new Schema({
    DTName: String,
    DocumentID: {type: ObjectId, ref: 'Document'},
});