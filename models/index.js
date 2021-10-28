const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  fore
})

// Post belongs to user
// User has many post

// Comment belongs to post
// Post has many comment

// Comment belongs to user
// User has many comment

module.exports = { User, Post, Comment };
