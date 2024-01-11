const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
var connectdb = require('./connectdb.js');
async function connectDb()
{
    await connectdb();
}
const homeRoutes = require('./routes/homeRoutes');
const documentRoutes = require('./routes/documentRoutes');
const FAQRoutes = require('./routes/FAQRoutes');
const accountRoutes = require('./routes/accountRoutes');
const postRoutes = require('./routes/postRoutes');
const searchRoutes = require('./routes/searchRoutes');
const profileRoutes = require('./routes/profileRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', homeRoutes);

app.use('/', documentRoutes);
app.use('/posts', documentRoutes);

app.use('/', accountRoutes);
app.use('/posts', accountRoutes);

app.use('/', FAQRoutes);
app.use('/posts', FAQRoutes);

app.use('/', postRoutes);
app.use('/posts', postRoutes);

app.use('/', searchRoutes);
app.use('/posts', searchRoutes)

app.use('/', profileRoutes);
app.use('/posts', profileRoutes)

app.use('/', commentRoutes);
app.use('/posts', commentRoutes)

connectDb();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
