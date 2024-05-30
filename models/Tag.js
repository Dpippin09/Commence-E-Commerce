const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'postgres',
  // other options
});

class Tag extends Model {}

Tag.init(
  {
    // Define columns here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add more columns as needed
  },
  {
    sequelize,
    timestamps: false, // Set to true if you want createdAt and updatedAt columns
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;




// const { Model, DataTypes } = require('sequelize');

// const sequelize = require('../config/connection.js');

// class Tag extends Model {}

// Tag.init(
//   {
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'tag',
//   }
// );

// module.exports = Tag;
