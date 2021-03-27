var express = require('express');
var path = require('path');
var app = express();
require('dotenv').config();
var morgan = require('morgan');
var helemt = require('helmet');
var cors = require('cors');
var loggerService = require('../services/logger.service');
var APIError = require('../error/api.error');
var errorStatusCode = require('../error/errorStatusCode');
// API routes
var uploadRouter = require('../route/upload.route');
var logger = new loggerService('server');

/*
 * Express middlewares
 */
app.use(express.json());
app.use(helemt());
app.use(cors());
app.use(morgan('combined'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  res.status(200).send({ status: 'Server is running!' });
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/upload', uploadRouter);

/*
 * 404 ErrorHandler
 */

app.use((req, res, next) => {
  const err = new APIError(
    `404 NOT FOUND`,
    errorStatusCode.NOT_FOUND,
    ` "${req.originalUrl}" NOT FOUND `,
    true
  );
  next(err);
});

app.use((error, req, res, next) => {
  res.statusCode = error.httpStatusCode ? error.httpStatusCode : 500;
  res.setHeader('Content-Type', 'application/json');
  if (process.env.NODE_ENV === 'development') {
    logger.error(error);
    res.json(error);
  } else {
    logger.error(error);
    res.json({ message: 'Error' });
  }
});

app.listen(process.env.PORT || 3000, (server) => {
  console.log(`app is listening at http://localhost:${process.env.PORT}`);
});
