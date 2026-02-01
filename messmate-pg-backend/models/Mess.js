const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// const Mess = sequelize.define('Mess', {
//   name: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     len: [3, 100]
//   }
// },
//   location: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   price: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1000
//     }
//   }
// }, {
//   tableName: 'messes',
//   timestamps: true
// });


const Mess = sequelize.define('Mess', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Name is required" },
      len: { args: [3, 100], msg: "Name must be 3-100 characters" }
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Location cannot be empty" }
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Price must be an integer" },
      min: { args: [1000], msg: "Price must be at least 1000" }
    }
  }
}, { timestamps: true });


module.exports = Mess;
