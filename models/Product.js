const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'postgres',
  // other options
});

class Product extends Model {}

Product.init(
  {
    // Define columns here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Add more columns as needed
  },
  {
    sequelize,
    timestamps: true, // Set to true if you want createdAt and updatedAt columns
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);











// // import important parts of sequelize library
// const { Model, DataTypes } = require('sequelize');
// // import our database connection from config.js
// const sequelize = require('../config/connection');

// // Initialize Product model (table) by extending off Sequelize's Model class
// class Product extends Model {}

// // set up fields and rules for Product model
// Product.init(
//   {
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'product',
//   }
// );

// module.exports = Product;
