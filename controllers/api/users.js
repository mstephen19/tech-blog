const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {
    const users = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
    });
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    const created = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    res.status(200).json(created);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Post }, { model: Comment }],
    });
    res.status(200).json(user);
  })
  .put(async (req, res) => {
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
    res.status(200).json(updated);
  })
  .delete(async (req, res) => {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    res.status(200).json(deleted);
  });

module.exports = router;
