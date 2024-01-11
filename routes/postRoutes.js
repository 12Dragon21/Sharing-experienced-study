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

const {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostWithUser
} = require('../controllers/PostController.js');

const {
  getAllAccountPost,
  createAccountPost,
  getAccountPost,
  updateAccountPost,
  deleteAccountPost,
  getIdOwnPost,
  getAmountPostByAccountId
} = require('../controllers/AccountPostController.js');

const {
  getAllAccountComment,
  createAccountComment,
  getAccountComment,
  updateAccountComment,
  deleteAccountComment,
  getAllAccountCommentWithPostId
} = require('../controllers/AccountCommentController.js');

router.get('/viewpost', async (req, res) => {
  // Xử lý yêu cầu GET ở đây
  const postId = req.query.postid;
  console.log('Received GET request for post ID:', postId);
  const post = await getPost(req, res);
  const accountId = await getIdOwnPost(req, res);
  const account = await getAccountbyId(accountId);
  const amount = await getAmountPostByAccountId(accountId);
  const accountcomments = await getAllAccountCommentWithPostId(req, res, post._id);
  res.render('post/viewpost', { post, account, amount, accountcomments });
});

router.post('/viewpost', async (req, res) => {
  const postId = req.body.postid;
  console.log('Received POST request for post ID:', postId);
  // Xử lý logic POST ở đây
  res.render('viewpost', { postId });
});

router.get('/addPost', (req, res) => {
  res.render('post/addPost');
});

router.post('/addpost', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.cookies.account);
    newPost = await createPost(req, res);
    await createAccountPost(req, res, newPost);
    res.status(200).redirect('/home/userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
