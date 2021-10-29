const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {
    const posts = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(posts);
  })
  .post(async (req, res) => {
    const added = await Post.create({
      user_id: req.body.user_id,
      title: req.body.title,
      description: req.body.description,
    });
    res.status(200).json(added);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(post);
  })
  // Will probably never change user_id, but it is an option
  .put(async (req, res) => {
    const updated = await Post.update(
      {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
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
    const deleted = await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json(deleted);
  });

// Comment on a post
router.post('/:id/comment', async (req, res) => {
  const newComment = Comment.create({
    comment: req.body.comment,
    user_id: req.body.user_id,
    post_id: req.params.id,
  });
  res.status(200).json(newComment);
});

module.exports = router;
