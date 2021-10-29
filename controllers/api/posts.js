const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: ['id', 'username'] },
          { model: Comment, attributes: ['id', 'comment', 'user_id'] },
        ],
      });

      !posts ? res.status(404).json(new Error('Oops!')) : null;

      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const added = await Post.create({
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
      });

      !added ? res.status(404).json(new Error('Oops!')) : null;

      res.status(200).json(added);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['id', 'username'] },
          { model: Comment, attributes: ['id', 'comment', 'user_id'] },
        ],
      });

      !post ? res.status(404).json(new Error('Oops!')) : null;

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  // Will probably never change user_id, but it is an option
  .put(async (req, res) => {
    try {
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

      !updated ? res.status(404).send(new Error('Oops!')) : null;

      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await Post.destroy({ where: { id: req.params.id } });

      !deleted ? res.status(404).send(new Error('Oops!')) : null;

      res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Comment on a post
router.post('/:id/comment', async (req, res) => {
  try {
    const newComment = Comment.create({
      comment: req.body.comment,
      user_id: req.body.user_id,
      post_id: req.params.id,
    });

    !newComment ? res.status(404).send(new Error('Oops!')) : null;

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// to comment on a post, just pull the id from the parameter, then make a post request and add the comment to the usre with req.session.userId
