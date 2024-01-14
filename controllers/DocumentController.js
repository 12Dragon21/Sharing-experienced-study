const DocumentSchema = require('../models/Document');
const mongoose = require('mongoose')
const Accessment = require('../models/Accessment');
async function getAllDocument(req, res) {
  try {
    const Documents = await DocumentSchema.find();
    return Documents;
  } catch (error) {
    console.error('Error fetching Documents:', error);
  }
}

async function createDocument(req, res) {
  try {
    const newDocument = new DocumentSchema({
        DcmName: req.body.name,
        DcmType: 0,
        DcmDownload: 0,
        DcmDate: new Date(),
        DcmPath: req.file.path
    });
    const savedDocument = await newDocument.save();
    return newDocument;
  } catch (error) {
    console.error('Error creating Document:', error);
    throw error;
  }
}

async function getDocument (req, res) {
  try {
    const Document = await DocumentSchema.findById(req.params.id);
    return Document;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateDocument (req, res) {
  try {
    const Document = await DocumentSchema.findById(req.params.id);
    await Document.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteDocument (req, res) {
  try {
    await DocumentSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function toggleFavoriteStatus(req, res) {
  const { documentId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ error: 'Invalid document ID' });
    }
    const document = await DocumentSchema.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    const accessment = await Accessment.findOne({ DocumentID: documentId });

    if (!accessment) {
      return res.status(404).json({ error: 'Accessment not found' });
    }
    accessment.isFavorited = !accessment.isFavorited;

    await accessment.save();

    return res.json({ document });
  } catch (error) {
    console.error('Error in toggleFavoriteStatus:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
}
const getAllDocumentS = async () => {
  try {
    const documents = await Document.find({ isFavourite: true }).exec();
    return documents;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllDocument,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  toggleFavoriteStatus,
  getAllDocumentS,
};
