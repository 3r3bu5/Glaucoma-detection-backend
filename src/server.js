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
var scanRoute = require('../route/scan.route');
var userRouter = require('../route/user.route');
var patientRouter = require('../route/patient.route');
var checkoutRouter = require('../route/checkout.route');
var logger = new loggerService('server');
// DB connection
var connectDB = require('../config/db.config');
connectDB();
// passport
const passport = require('passport');
const { createLogger } = require('winston');

/*
 * Express middlewares
 */
app.use(express.json());
app.use(helemt());
app.use(cors());
app.use(morgan('combined'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  res.status(200).send({ status: 'Server is running!' });
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/scan', scanRoute);
app.use('/user', userRouter);
app.use('/patient', patientRouter);
app.use('/checkout', checkoutRouter);

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
  logger.error(
    `API ERROR: ${error.message ? error.message : error.err.message} `
  );
  res.setHeader('Content-Type', 'application/json');
  res.status(
    error.httpStatusCode || error.err.httpStatusCode
      ? error.httpStatusCode || error.err.httpStatusCode
      : 500
  );
  res.json({
    status: false,
    err: error.message ? error.message : error.err.message,
  });
});

app.listen(process.env.PORT || 3000, (server) => {
  console.log(`app is listening at http://localhost:${process.env.PORT}`);
});
