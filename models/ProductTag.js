const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'postgres',
  // other options
});

class ProductTag extends Model {}

ProductTag.init(
  {
    // Define columns here
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // Name of the Product model
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag', // Name of the Tag model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;






// const { Model, DataTypes } = require('sequelize');

// const sequelize = require('../config/connection');

// class ProductTag extends Model {}

// ProductTag.init(
//   {
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'product_tag',
//   }
// );

// module.exports = ProductTag;
