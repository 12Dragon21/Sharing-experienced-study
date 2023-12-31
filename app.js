const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const fileUploader = require('./configs/cloudinary.config.js');
var connectdb = require('./connectdb.js');
const { createFAQ, getAllFAQs } = require('./controllers/FAQsController.js');
const {
  getAllAccount,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  checkLogin,
  getAccountbyId
} = require('./controllers/AccountController.js');
const {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostWithUser
} = require('./controllers/PostController.js');
const {
  getAllAccountPost,
  createAccountPost,
  getAccountPost,
  updateAccountPost,
  deleteAccountPost,
  getIdOwnPost,
  getAmountPostByAccountId
} = require('./controllers/AccountPostController.js');
const {
  getAllComment,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require('./controllers/CommentController.js');
const {
  getAllAccountComment,
  createAccountComment,
  getAccountComment,
  updateAccountComment,
  deleteAccountComment,
  getAllAccountCommentWithPostId
} = require('./controllers/AccountCommentController.js');
async function connectDb()
{
    await connectdb();
}

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', async (req, res) => {
  try {
    await connectdb();
    console.log('Connected to the database');
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 5; 
    const posts = await getAllPost(req, res, page, postsPerPage);
    res.render('home', { posts, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/home', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 5;
    const posts = await getAllPost(req, res, page, postsPerPage);
    res.render('home', { posts, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/userhome', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 5;
    const posts = await getAllPost(req, res, page, postsPerPage);
    res.render('userhome', { posts, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Tuyến đường cho trang addPost
app.get('/addPost', (req, res) => {
  res.render('addPost');
});
// Tuyến đường cho trang login
app.get('/login', (req, res) => {
  res.render('login');
});
// Tuyến đường cho trang register
app.get('/register', (req, res) => {
  res.render('register');
});

// Tuyến đường cho trang search
app.get('/search', (req, res) => {
  res.render('search');
});

// Tuyến đường cho trang viewforum
app.get('/viewforum', (req, res) => {
  res.render('viewforum');
});

// Tuyến đường cho trang addFAQs
app.get('/addFAQs', (req, res) => {
  res.render('addFAQs');
});
// Tuyến đường xử lý việc thêm mới FAQ từ form
app.post('/addfaq', async (req, res) => {
  try {
    await connectdb();
    console.log('Connected to the database');
    const newFAQ = await createFAQ(req, res);
    const faqs = await getAllFAQs(req, res);
    res.render('question', { faqs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Tuyến đường cho trang questions
app.get('/question', async (req, res) => {
  try {
    await connectdb();
    console.log('Connected to the database');

    const faqs = await getAllFAQs();
    res.render('question', {faqs});
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/viewprofile', async (req, res) => {
  try {
    const Account = await getAccount(req, res);
    res.render('viewprofile', {
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

app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/register', fileUploader.single('avatar'), async (req, res) =>
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
app.post('/login', async (req, res) => {
  try {
    checkLogin(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/viewpost', async (req, res) => {
  // Xử lý yêu cầu GET ở đây
  const postId = req.query.postid;
  console.log('Received GET request for post ID:', postId);
  const post = await getPost(req, res);
  const accountId = await getIdOwnPost(req, res);
  const account = await getAccountbyId(accountId);
  const amount = await getAmountPostByAccountId(accountId);
  const accountcomments = await getAllAccountCommentWithPostId(req, res, post._id);
  res.render('viewpost', { post, account, amount, accountcomments });
});
app.post('/viewpost', async (req, res) => {
  const postId = req.body.postid;
  console.log('Received POST request for post ID:', postId);
  // Xử lý logic POST ở đây
  res.render('viewpost', { postId });
});
app.get('/adminhome', (req, res) => {
  // Xử lý yêu cầu GET ở đây
  res.render('adminhome');
});
app.post('/addpost', async (req, res) =>
{
  try {
    console.log(req.body);
    console.log(req.cookies.account);
    newPost = await createPost(req, res);
    await createAccountPost(req, res, newPost);
    res.status(200).redirect('/userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/addcomment', async (req, res) => {
  try {
    console.log(req.query);  
    const newComment = await createComment(req, res);
    await createAccountComment(req, res, newComment);
    const post = await getPost(req, res);
    const accountId = await getIdOwnPost(req, res);
    const account = await getAccountbyId(accountId);
    const amount = await getAmountPostByAccountId(accountId);
    const accountcomments = await getAllAccountCommentWithPostId(req, res, post._id);
    res.render('viewpost', { post, account, amount, accountcomments});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/viewdocument', async (req, res) => {
  // Xử lý yêu cầu GET ở đây
  res.render('viewdocument');
});
app.get('/changeprofile', async (req, res) => {
  try {
    const Account = await getAccount(req, res);
    res.render('changeprofile', {
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
app.post('/saveprofile', async (req, res) => {
  try {
    const accountId = req.cookies.account;
    const updatedProfile = {
      Username: req.body.username,
      Email: req.body.email,
      Phone: req.body.phone,
      Years: req.body.academicYear,
    };
    await updateAccount(accountId, updatedProfile);
    res.status(200).redirect('/viewprofile');
  } catch (error) {
    res.status(200).redirect('/viewprofile');
    res.status(500).send('Internal Server Error');
  }
});
connectDb();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
