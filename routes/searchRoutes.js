const express = require('express');
const router = express.Router();
const connectdb = require('../connectdb.js');
const imageUploader = require('../configs/cloudinary.config.js');
const documentUploader = require('../configs/cloudinaryDocument.config.js');


router.get('/search', (req, res) => {
    res.render('search/search');
  });
module.exports = router;
