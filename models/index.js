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

db.Product = require('./Product')(sequelize, Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, Sequelize.DataTypes);
db.Tag = require('./Tag')(sequelize, Sequelize.DataTypes);
db.ProductTag = require('./ProductTag')(sequelize, Sequelize.DataTypes);

// Define relationships
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId' });
db.Category.hasMany(db.Product, { foreignKey: 'categoryId' });

db.Product.belongsToMany(db.Tag, { through: db.ProductTag });
db.Tag.belongsToMany(db.Product, { through: db.ProductTag });

module.exports = db;

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
