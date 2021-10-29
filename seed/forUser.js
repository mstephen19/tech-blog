const { User } = require('../models');

const userData = [
  {
    email: 'james@gmail.com',
    username: 'jamesTheGreat',
    password: 'lovePonies123',
  },
  {
    email: 'mollypie@gmail.com',
    username: 'mollyLovesJava',
    password: 'piePie123',
  },
  {
    email: 'jimmy420@gmail.com',
    username: 'jimJam',
    password: 'peepoo12u',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
