const Post = require('../models/post'); // Ensure model is correctly imported
const Comment = require('../models/comment'); // Ensure this is also valid

// Create a new discussion post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// In the backend (discussionController.js)
exports.getPosts = async (req, res) => {
    try {
      const category = req.query.category;  // Fetch category from query parameters
      const posts = category ? await Post.find({ category }) : await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };
  