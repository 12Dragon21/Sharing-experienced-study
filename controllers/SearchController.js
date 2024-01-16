// SearchController.js

const PostSchema = require('../models/Post');

async function searchPostsByName(query) {
  try {
    const posts = await PostSchema.find({
      PostName: { $regex: query, $options: 'i' } 
    });
    posts.sort((a,b) => (new Date(b.PostDate) - new Date(a.PostDate)));
    return posts;
  } catch (error) {
    console.error('Error searching posts by name:', error);
    throw error;
  }
}

module.exports = {
  searchPostsByName
};
