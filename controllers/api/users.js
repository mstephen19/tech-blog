const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          { model: Post, attributes: ['id', 'title', 'description'] },
          { model: Comment, attributes: ['id', 'post_id', 'comment'] },
        ],
      });

      !users ? res.status(404).send(new Error('Oops!')) : null;

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const created = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      !created ? res.status(404).send(new Error('Oops!')) : null;

      res.status(200).json(created);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          { model: Post, attributes: ['id', 'title', 'description'] },
          { model: Comment, attributes: ['id', 'post_id', 'comment'] },
        ],
      });

      !user ? res.status(404).send(new Error('Oops!')) : null;

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const updated = await User.update(
        {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      !updated ? res.status(404).send(new Error('Oops!')) : null;

      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });
      res.status(200).json(deleted);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Create new post
router.post('/:id/post', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.params.id,
    });

    !newPost ? res.status(404).send(new Error('Oops!')) : null;

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
