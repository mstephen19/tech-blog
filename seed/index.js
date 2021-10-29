const sequelize = require('../config/connection');
const seedUser = require('./forUser');
const seedPost = require('./forPost');
const seedComment = require('./forComment');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedPost();
  await seedComment();
  process.exit(0);
};

seedAll();
