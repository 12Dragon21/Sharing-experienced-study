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
  getPostWithUser,
  likePost,
  dislikePost,
  undislikePost,
  unlikePost,
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
  const post = await getPost(req, res, postId);
  const accountId = await getIdOwnPost(req, res);
  const account = await getAccountbyId(accountId);
  const currentaccount = await getAccountbyId(req.cookies.account);
  var checkOwnPost = false;
  if (accountId.toString()==currentaccount._id.toString())
  {
    checkOwnPost = true;
  }
  const amount = await getAmountPostByAccountId(accountId);
  const accountcomments = await getAllAccountCommentWithPostId(req, res, post._id);

  res.render('post/viewpost', { post, account, amount, accountcomments, currentaccount, checkOwnPost });
});
router.get('/viewpostnolog', async (req, res) => {
  // Xử lý yêu cầu GET ở đây
  const postId = req.query.postid;
  console.log('Received GET request for post ID:', postId);
  const post = await getPost(req, res, postId);
  const accountId = await getIdOwnPost(req, res);
  const account = await getAccountbyId(accountId);
  const currentaccount = await getAccountbyId(req.cookies.account);
  var checkOwnPost = false;
  if (accountId.toString()==currentaccount._id.toString())
  {
    checkOwnPost = true;
  }
  const amount = await getAmountPostByAccountId(accountId);
  const accountcomments = await getAllAccountCommentWithPostId(req, res, post._id);

  res.render('post/viewpostnolog', { post, account, amount, accountcomments, currentaccount, checkOwnPost });
});
router.post('/viewpostnolog', async (req, res) => {
  const postId = req.body.postid;
  console.log('Received POST request for post ID:', postId);
  res.render('viewpostnolog', { postId });
});

router.post('/viewpost', async (req, res) => {
  const postId = req.body.postid;
  console.log('Received POST request for post ID:', postId);
  res.render('viewpost', { postId });
});

router.get('/addPost', async (req, res) => {
  const account = await getAccountbyId(req.cookies.account);
  res.render('post/addPost',{account});
});

router.post('/addpost', imageUploader.single('avatar'), async (req, res) => {
  try {
    await connectdb();
    const newPost = await createPost(req, res);
    await createAccountPost(req, res, newPost);
    res.status(200).redirect('userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/delete', async (req, res) => {
  try {
    await connectdb();
    const post = await getPost(req, res, req.body.postid);
    await deletePost(req, res, post);
    res.status(200).redirect('userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/edit', async (req, res) => {
  const post = await getPost(req, res, req.query.postid);
  const account = await getAccountbyId(req.cookies.account);
  res.render('post/edit',{account, post});
});
router.post('/edit', imageUploader.single('avatar'), async (req, res) => {
  try {
    await connectdb();
    await updatePost(req, res, req.body.postid);
    res.status(200).redirect('userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/like/:id', likePost);
router.post('/dislike/:id', dislikePost);
router.post('/unlike/:id', unlikePost);
router.post('/undislike/:id', undislikePost);
module.exports = router;
