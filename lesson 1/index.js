const express = require('express');
const bodyParser = require('body-parser');
require('./utils/db');
const userRoutes = require('./routes/user');
// import sequelize from './utils/db.js';
// import User from './model/user.js';
// import Employee from './model/employee.js';

const app = express();

//connecting to db
// db;
//connecting to db

//sync model to create table in db

// User.drop(); //will drop the table
// Employee.drop();
// sequelize.drop(); //You can use sequelize.sync() to automatically delete all models.

//You can use sequelize.sync() to automatically synchronize all models.
// Employee.sync({ force: true });
// User.sync({ force: true }); //force true mean if table exist in db it will drop that table and recreates the table
// User.sync({ alter: true }); //This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
// User.sync(); //This creates the table if it doesn't exist (and does nothing if it already exists)

app.use(bodyParser.json());
app.use('/api/user', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3600, () => {
  console.log('App is running on ', 3600);
});
