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

  const { createFAQ, getAllFAQs } = require('../controllers/FAQsController.js');
router.get('/addFAQs', (req, res) => {
    res.render('FAQ/addFAQs');
  });
router.post('/addfaq', async (req, res) => {
    try {
      await connectdb();
      console.log('Connected to the database');
      const newFAQ = await createFAQ(req, res);
      const faqs = await getAllFAQs(req, res);
      res.render('FAQ/question', { faqs });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
router.get('/question', async (req, res) => {
    try {
      await connectdb();
      console.log('Connected to the database');
  
      const faqs = await getAllFAQs();
      res.render('FAQ/question', {faqs});
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
module.exports = router;
