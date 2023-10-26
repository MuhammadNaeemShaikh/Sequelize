const { Sequelize } = require('sequelize');
const { DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('employeedb', 'root', '12345', {
  host: 'localhost',
  dialect:
    'mysql' /* one of  | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
try {
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.user = require('../model/user')(DataTypes, sequelize);
  db.employee = require('../model/employee')(Model, sequelize, DataTypes);

  //sync
  db.sequelize.sync({ force: true });
} catch (error) {
  console.log(`Error While Syncing Model ${error}`);
}

module.exports = { sequelize, db };
