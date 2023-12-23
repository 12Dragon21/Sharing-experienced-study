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
  checkLogin
} = require('./controllers/AccountController.js');
const {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost
} = require('./controllers/PostController.js');

async function connectDb()
{
    await connectdb();
}

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Sử dụng middleware để đọc dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
// Sử dụng expressstatic để định tuyến router styles
app.use('/styles', express.static(path.join(__dirname, 'styles')));
// Đặt middleware để sử dụng thư mục views cho các tệp HTML
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Tuyến đường cho trang đường dẫn gốc
app.get('/', async (req, res) => {
  try {
    await connectdb();
    console.log('Connected to the database');
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 5; // Adjust this value as needed
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
    res.render('home');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/login', async (req, res) => {
  try {
    // ...
    // Assuming the login is successful, redirect to userhome
    res.redirect('/userhome');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/post', async (req, res) =>
{
  try {
    console.log(req.body);
    await createPost(req, res);
    res.render('home');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/viewpost', (req, res) => {
  // Xử lý yêu cầu GET ở đây
  const postId = req.query.postid;
  console.log('Received GET request for post ID:', postId);
  res.render('viewpost', { postId });
});
app.post('/viewpost', async (req, res) => {
  const postId = req.body.postid;
  console.log('Received POST request for post ID:', postId);
  // Xử lý logic POST ở đây
  res.render('viewpost', { postId });
});
connectDb();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
