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

router.get('/viewprofile', async (req, res) => {
    try {
      const Account = await getAccount(req, res);
      res.render('profile/viewprofile', {
        username: Account.Username,
        email: Account.Email,
        role: Account.Role,
        phone: Account.Phone,
        ImageURL: Account.ImageURL,
        Years: Account.Years,
      });
    } catch (error) {
      console.error('Error fetching user account:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
router.get('/changeprofile', async (req, res) => {
    try {
      const Account = await getAccount(req, res);
      res.render('profile/changeprofile', {
        username: Account.Username,
        email: Account.Email,
        role: Account.Role,
        phone: Account.Phone,
        ImageURL: Account.ImageURL,
        Years: Account.Years,
      });
    } catch (error) {
      console.error('Error fetching user account:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  router.post('/saveprofile', async (req, res) => {
    try {
      const accountId = req.cookies.account;
      const updatedProfile = {
        Username: req.body.username,
        Email: req.body.email,
        Phone: req.body.phone,
        Years: req.body.academicYear,
      };
      await updateAccount(accountId, updatedProfile);
      res.status(200).redirect('/profile/viewprofile');
    } catch (error) {
      res.status(200).redirect('profile/viewprofile');
      res.status(500).send('Internal Server Error');
    }
  });
module.exports = router;
