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
    timestamps: true, 
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);