const express = require('express')
require('dotenv').config()

import initWebRouters from './routes/web';
import initApiRouters from './routes/api';
import configViewEngine from './config/viewengine';
import connection from './config/connectDB';

const port = process.env.PORT;
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.LOCAL_SER);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

configViewEngine(app);
connection();
initWebRouters(app);
initApiRouters(app);
//body 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})