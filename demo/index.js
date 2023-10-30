const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')

//import db 
require('./utils/db')

const app = express();

app.use(bodyParser.json());

//<---------------- User Routes-------------->
app.use('/api/userRoute',userRoutes)
app.listen(3000, () => {
  console.log('app is running on 3000');
});
