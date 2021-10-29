const { Comment } = require('../models');

const commentData = [
  {
    comment: 'Nice!',
    user_id: 2,
    post_id: 2,
  },
  {
    comment: 'Cool!',
    user_id: 3,
    post_id: 1,
  },
  {
    comment: 'Awesome!',
    user_id: 2,
    post_id: 1,
  },
  {
    comment: 'Dope!',
    user_id: 1,
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
