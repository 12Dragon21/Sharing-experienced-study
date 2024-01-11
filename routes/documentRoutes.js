const express = require('express');
const router = express.Router();
const connectdb = require('../connectdb.js');
const imageUploader = require('../configs/cloudinary.config.js');
const documentUploader = require('../configs/cloudinaryDocument.config.js');
const {
    getAllDocument,
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument
  } = require('../controllers/DocumentController.js');

  router.get('/viewdocument', async (req, res) => {
    try {
      // Xử lý yêu cầu GET ở đây
      const documents = await getAllDocument();
      res.render('document/viewdocument', { documents });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
 router.post('/document', documentUploader.single('document'), async (req, res) =>
{
  try {
    await connectdb();
    console.log('Connected to the database');
    const newDocument = await createDocument(req, res);
    console.log(newDocument);
    res.status(200).redirect('/home/home');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
