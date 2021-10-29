const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.findAll({
        include: [{ model: Post }, { model: Comment }],
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
        include: [{ model: Post }, { model: Comment }],
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

router.post('/:id/post', async (req, res) => {
  const newPost = await Post.create({
    title: req.body.title,
    description: req.body.description,
    user_id: req.params.id,
  });
  res.status(200).json(newPost);
});

module.exports = router;
