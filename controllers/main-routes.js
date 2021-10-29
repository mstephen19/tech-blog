const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }],
    });

    const posts = postsData.map((post) => {
      return post.get({ plain: true });
    });

    res.render('home', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/zuzka', async (req, res) => {
  res.render('zuzka', { loggedIn: req.session.loggedIn });
});

router.get('*', async (req, res) => {
  res.render('404', { loggedIn: req.session.loggedIn });
});

module.exports = router;
