const express = require('express')
require('dotenv').config()

import initWebRouters from './routes/web'
import configViewEngine from './config/viewengine'

const port = process.env.PORT;
const app = express()
initWebRouters(app);
configViewEngine(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})