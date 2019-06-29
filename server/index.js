//Main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors')
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/reserve_ai'

//DB Setup

mongoose.Promise = global.Promise;
mongoose.set('degub', true)
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })  //auth is the name of the DB created

//App Setup
app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }));
router(app)

//Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port)
