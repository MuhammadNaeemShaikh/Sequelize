const { Sequelize } = require('sequelize');
const { DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('employeedb', 'root', '12345', {
  host: 'localhost',
  logging: false,
  dialect:
    'mysql' /* one of  | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate({ force: false });
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
try {
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.employee = require('../model/employee')(Model, sequelize, DataTypes);
  db.user = require('../model/user')(DataTypes, sequelize);
  db.contact = require('../model/contact')(DataTypes, sequelize);
  db.user_contacts = require('../model/user_contacts')(
    DataTypes,
    sequelize,
    db.user,
    db.contact
  );
  //sync

  //relation between user and contact one to one relationship

  // db.user.hasOne(db.contact, {
  //   foreignKey: 'user_id',
  //   as: 'contactDetail',
  // }); // A HasOne B
  // db.contact.belongsTo(db.user, {
  //   foreignKey: 'user_id',
  //   as: 'userDetails',
  // }); // A BelongsTo B

  //<---------------------one to one end------------------------>

  //<----------------------one to many ------------------------->
  // db.user.hasMany(db.contact, {
  //   foreignKey: 'user_id',
  //   as: 'contactDetail',
  // }); // A HasOne B
  // db.contact.belongsTo(db.user, {
  //   foreignKey: 'user_id',
  //   as: 'userDetails',
  // });
  //<----------------------one to many end------------------------>

  //<-------------many to many ---------------------------------->

  //auto create user_contact model
  // db.user.belongsToMany(db.contact, { through: 'user_contacts' });
  // db.contact.belongsToMany(db.user, { through: 'user_contacts' });

  //manually creating user_contact model or junction model or
  db.user.belongsToMany(db.contact, {
    through: db.user_contacts,
    foreignKey: 'UserId',
  });
  db.contact.belongsToMany(db.user, {
    through: db.user_contacts,
    foreignKey: 'contactId',
  });
  //<-----------------------many to many end----------------------------------->
  db.sequelize.sync({ force: false });
} catch (error) {
  console.log(`Error While Syncing Model ${error}`);
}

module.exports = { sequelize, db };
