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
  getAllComment,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require('../controllers/CommentController.js');
const {
  getAllAccountComment,
  createAccountComment,
  getAccountComment,
  updateAccountComment,
  deleteAccountComment,
  getAllAccountCommentWithPostId
} = require('../controllers/AccountCommentController.js');


  router.get('/addcomment', async (req, res) => {
    try {
      console.log(req.query);  
      const newComment = await createComment(req, res);
      await createAccountComment(req, res, newComment);
      const post = await getPost(req, res);
      const accountId = await getIdOwnPost(req, res);
      const account = await getAccountbyId(accountId);
      const amount = await getAmountPostByAccountId(accountId);
      const accountcomments = await getAllAccountCommentWithPostId(req, res, post._id);
      res.render('post/viewpost', { post, account, amount, accountcomments});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router;
