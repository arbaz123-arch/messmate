const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const UserModel = require('./Users');
const Mess = require('./Mess'); // 👈 IMPORTANT CHANGE

const User = UserModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Mess
};
