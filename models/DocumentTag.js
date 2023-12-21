const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DocumentTagSchema = new Schema({
    DTName: String,
    DocumentID: {type: ObjectId, ref: 'Document'},
});

module.exports = mongoose.model("DocumentTag", DocumentTagSchema)