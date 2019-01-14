//Main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors')

//DB Setup
mongoose.connect('mongodb://localhost/reserve_ai', { useNewUrlParser: true })  //auth is the name of the DB created

//App Setup
app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser.json({ type: '*/*'}));
router(app)

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port)
 