const express = require('express');
const app = express();
const path = require('path');

var connectdb = require('./connectdb.js');
var FAQs = require('./controllers/FAQs.js');
const CreateFAQ = require('./controllers/FAQs.js');

async function connectDb()
{
    await connectdb();
}

// Sử dụng middleware để đọc dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
// Sử dụng expressstatic để định tuyến router styles
app.use('/styles', express.static(path.join(__dirname, 'styles')));
// Đặt middleware để sử dụng thư mục views cho các tệp HTML
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Tuyến đường cho trang đường dẫn gốc
app.get('/', (req, res) => {
  res.render('home');
});


// Đặt tuyến đường cho home
app.get('/home', (req, res) => {
  res.redirect('/home'); // Chuyển hướng đến trang home
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

// Tuyến đường cho trang viewtopic
app.get('/viewtopic', (req, res) => {
  res.render('viewtopic');
});

// Tuyến đường cho trang question
app.get('/question', (req, res) => {
  res.render('question');
});

// Tuyến đường cho trang viewpost
app.get('/viewpost', (req, res) => {
  res.render('viewpost');
});

connectDb();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
