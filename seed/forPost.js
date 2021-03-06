const { Post } = require('../models');

const date = new Date();

const postData = [
  {
    title: 'I love Javascript!',
    description: 'It is a nice language!',
    date: date.toDateString(),
    user_id: 1,
    comment_id: [2, 3],
  },
  {
    title: 'This is a test post',
    description: 'Just testing things out!',
    date: date.toDateString(),
    user_id: 3,
    comment_id: [1, 4],
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
