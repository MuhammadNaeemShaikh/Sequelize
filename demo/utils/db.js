const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const db = {};

// const sequelize = new Sequelize('ecommerce', 'root', '12345', {
//   host: 'localhost',
//   logging: false,
//   dialect: 'mysql',
// });

const sequelize = new Sequelize('database-2', 'root', 'matz12345', {
  host: 'database-2.cwaiqakemhu8.us-east-1.rds.amazonaws.com',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 600000,
  },
});

async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

try {
  db.user = require('../models/userModel')(DataTypes, sequelize);
  db.otp = require('../models/otp')(DataTypes, sequelize);
  db.product = require('../models/productModel')(DataTypes, sequelize);
  db.order = require('../models/orderModel')(DataTypes, sequelize);

  //<----------------------one to many user------------------------->
  db.user.hasMany(db.order, {
    foreignKey: 'userId',
    as: 'orderDetails',
  }); // A HasOne B
  db.order.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'userDetails',
  });

  //<----------------------one to many end user and order------------------------>
  //<----------------------one to many one order and product------------------------>

  db.product.hasOne(db.order, {
    foreignKey: 'productId',
    as: 'productDetails',
  });
  // A HasOne B
  db.order.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'productDetails',
  });

  //<----------------------one to many one order and product end------------------------>
} catch (error) {
  console.error('Error importing userModel:', error);
  throw error;
}

async function synchronizeModels() {
  try {
    await sequelize.sync({ force: false });
    console.log('Models have been synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
    res.status(400).json('Error in synchrnisongmodel');
  }
}

(async () => {
  try {
    await authenticateDatabase();
    await synchronizeModels();
    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1); // Exit the Node.js process with a failure code
  }
})();
// db.user = require('../models/userModel')(DataTypes, sequelize);

// db.sequelize.sync();

module.exports = { sequelize, db };

// try {
// } catch (error) {
//   console.log(error);
//   res.status(500).json('Some Thing Went Wrong in importing models');
// }
