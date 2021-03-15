var express = require('express');
var path = require('path');
var app = express();
require('dotenv').config();

var morgan = require('morgan');
var helemt = require('helmet');
var cors = require('cors');

/*
 * Express middlewares
 */
app.use(express.json());
app.use(helemt());
app.use(cors());
app.use(morgan('combined'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).send({ status: 'Server is running!' });
});

app.listen(process.env.PORT || 3000, (server) => {
  console.log(`app is listening at http://localhost:${process.env.PORT}`);
});
