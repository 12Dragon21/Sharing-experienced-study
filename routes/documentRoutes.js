const express = require('express');
const router = express.Router();
const connectdb = require('../connectdb.js');
const documentUploader = require('../configs/cloudinaryDocument.config.js');
const {
  getAllDocument,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  toggleFavoriteStatus,
  getAllDocumentS,
} = require('../controllers/DocumentController.js');
const {
  getAllAccessments,
  createAccessment,
} = require('../controllers/AccessmentController.js');

router.get('/viewdocument', async (req, res) => {
  try {
    const accessments = await getAllAccessments();
    res.render('document/viewdocument', { accessments });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/document', documentUploader.single('document'), async (req, res) => {
  try {
    await connectdb();
    console.log('Connected to the database');
    const newDocument = await createDocument(req, res);
    const newAccessment = await createAccessment(req, res, newDocument);
    res.status(200).redirect('/userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/documents/:documentId/togglefavorite', toggleFavoriteStatus);
router.get('/favorites', async (req, res) => {
  try {
    const favoriteDocuments = await getAllDocumentS();
    res.render('document/favorites', { documents: favoriteDocuments });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
