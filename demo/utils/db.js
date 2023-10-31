const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const db = {};

const sequelize = new Sequelize('ecommerce', 'root', '12345', {
  host: 'localhost',
  logging: false,
  dialect: 'mysql',
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
