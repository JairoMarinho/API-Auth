const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const auth = require('./middleware/token');

router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
