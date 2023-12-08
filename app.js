const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Sử dụng middleware để đọc dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
// Đặt middleware để sử dụng thư mục views cho các tệp HTML
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.redirect('/home');
});
app.get('/home', (req, res) => {
  res.render('home');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
