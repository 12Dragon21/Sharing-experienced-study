const express = require('express');
const router = express.Router();
const connectdb = require('../connectdb.js');
const imageUploader = require('../configs/cloudinary.config.js');
const documentUploader = require('../configs/cloudinaryDocument.config.js');
const {
  getAllAccount,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  checkLogin,
  getAccountbyId
} = require('../controllers/AccountController.js');


router.get('/login', (req, res) => {
    res.render('account/login');
  });
  // Tuyến đường cho trang register
router.get('/register', (req, res) => {
    res.render('account/register');
  });
  
router.get('/register', (req, res) => {
    res.render('account/register');
  });
router.post('/register', imageUploader.single('avatar'), async (req, res) =>
  {
    try {
      await connectdb();
      console.log('Connected to the database');
      console.log(req.file);
      const newAccount = await createAccount(req, res);
      res.status(200).redirect('/home');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
router.post('/login', async (req, res) => {
    try {
      checkLogin(req, res);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
module.exports = router;
