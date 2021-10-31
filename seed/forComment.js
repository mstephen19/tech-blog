const { Comment } = require('../models');

const date = new Date();

const commentData = [
  {
    comment: 'Nice!',
    date: date.toDateString(),
    user_id: 2,
    post_id: 2,
  },
  {
    comment: 'Cool!',
    date: date.toDateString(),
    user_id: 3,
    post_id: 1,
  },
  {
    comment: 'Awesome!',
    date: date.toDateString(),
    user_id: 2,
    post_id: 1,
  },
  {
    comment: 'Dope!',
    date: date.toDateString(),
    user_id: 1,
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
