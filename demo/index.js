const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

//dotenv configuration
dotenv.config();

//import db
require('./utils/db');

const app = express();

app.use(bodyParser.json());

//<---------------- Auth Routes-------------->
app.use('/api/authRoutes', authRoutes);

//<---------------- User Routes-------------->
app.use('/api/userRoutes', userRoutes);
//<---------------- Product Routes-------------->
app.use('/productRoute', productRoutes);

//app is listening on 3000
app.listen(3000, () => {
  console.log('app is running on 3000');
});
