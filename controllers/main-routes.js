const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { redirectIfLogged } = require('../utils/routesware');
const { mapPlaintrue } = require('../utils/helpers');

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

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        {
          model: Comment,
          attributes: ['id', 'comment', 'user_id'],
        },
      ],
    });
    // some problem happening here
    const singlePost = await postData.get({ plain: true });
    for (let i = 0; i < singlePost.comments.length; i++) {
      const findUser = await User.findByPk(singlePost.comments[i].user_id);
      singlePost.comments[i].username = findUser.dataValues.username;
    }
    console.log(singlePost);
    res.render('post', {
      post: singlePost,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(418).json(err);
  }
});

router.get('/login', redirectIfLogged, async (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn });
});

// finish this later
router.get('/dashboard', async (req, res) => {
  if (!req.session.userId) {
    res.redirect('/404');
  }
  const postData = await Post.findAll({
    where: {
      user_id: req.session.userId,
    },
  });
});

router.get('/zuzka', async (req, res) => {
  res.render('zuzka', { loggedIn: req.session.loggedIn });
});

router.get('*', async (req, res) => {
  res.render('404', { loggedIn: req.session.loggedIn });
});

module.exports = router;
