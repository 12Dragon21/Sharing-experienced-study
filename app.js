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
    const posts = await getAllPost(req, res);
    res.render('home', { posts });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Đặt tuyến đường cho home
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage', 'home.html'));
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
// Tuyến đường cho trang viewpost
app.get('/viewpost', (req, res) => {
  console.log(req.body);
  res.render('viewpost');
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
app.post('/login', async (req, res) =>
{
  try {
    await checkLogin(req, res);
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
connectDb();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
