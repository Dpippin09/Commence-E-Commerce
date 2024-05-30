// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'your_host',
  dialect: 'postgres',
  // other options
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = Product(sequelize, Sequelize.DataTypes);
db.Category = Category(sequelize, Sequelize.DataTypes);
db.Tag = Tag(sequelize, Sequelize.DataTypes);
db.ProductTag = ProductTag(sequelize, Sequelize.DataTypes);

// Define relationships
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId' });
db.Category.hasMany(db.Product, { foreignKey: 'categoryId' });

db.Product.belongsToMany(db.Tag, { through: db.ProductTag, as: 'tags' });
db.Tag.belongsToMany(db.Product, { through: db.ProductTag, as: 'products' });

module.exports = db;