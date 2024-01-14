const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccessmentSchema = new Schema({
    AcmState: Number,
    AccountID: {type: ObjectId, ref: 'Account'},
    DocumentID: {type: ObjectId, ref: 'Document'},
    isFavorited: { type: Boolean, default: false }, 
});

module.exports = mongoose.model("Accessment", AccessmentSchema) 