const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'postgres',
  // other options
});

class Category extends Model {}

Category.init(
  {
    // Define columns here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    // Add more columns as needed
  },
  {
    sequelize,
    timestamps: false, // Set to true if you want createdAt and updatedAt columns
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
