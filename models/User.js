const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 25],
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 45],
      },
    },
    // THIS IS BAD BAD BAD BAD BAD
    // post_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'post',
    //     key: 'id',
    //   },
    // },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      },
      beforeUpdate: async (updateUser) => {
        const salt = await bcrypt.genSalt(10);
        updateUser.password = await bcrypt.hash(updateUser.password, salt);
        return updateUser;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
