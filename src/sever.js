const express = require('express')
require('dotenv').config()

import initWebRouters from './routes/web';
import configViewEngine from './config/viewengine';
import connection from './config/connectDB';

const port = process.env.PORT;
const app = express();

configViewEngine(app);
connection();
initWebRouters(app);
//body 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})