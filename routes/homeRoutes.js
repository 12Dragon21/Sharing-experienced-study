const express = require('express');
const router = express.Router();
const connectdb = require('../connectdb.js');
const {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostWithUser
} = require('../controllers/PostController.js');
const {
  getAllAccount,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  checkLogin,
  getAccountbyId
} = require('../controllers/AccountController.js');

router.get('/', async (req, res) => {
  try {
    await connectdb();
    console.log('Connected to the database');
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 5;
    const posts = await getAllPost(req, res, page, postsPerPage);
    res.render('home/home', { posts, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/home', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 8;
    const posts = await getAllPost(req, res, page, postsPerPage);
    res.render('home/home', { posts, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/userhome', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 5;
    const posts = await getAllPost(req, res, page, postsPerPage);
    res.render('home/userhome', { posts, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/adminhome', (req, res) => {
  res.render('home/adminhome');
});

module.exports = router;
