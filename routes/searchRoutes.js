const express = require('express');
const router = express.Router();
const { searchPostsByName } = require('../controllers/SearchController');

router.get('/search', (req, res) => {
  res.render('search/search');
});

router.post('/search', async (req, res) => {
  try {
    const searchTerm = req.query.keywords;
    const query = req.body.searchQuery;
    const posts = await searchPostsByName(query);
    res.render('searchview', {searchTerm, posts });
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
