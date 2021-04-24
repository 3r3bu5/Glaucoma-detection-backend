const express = require('express');
const router = express.Router();
const { newScan } = require('../controller/scanCtrl');
const { verifyUser } = require('../services/jwtAuth.service');
const { rateLimiter } = require('../middleware/ratelimiter.midd');

router.post('/new', rateLimiter, verifyUser, newScan);

module.exports = router;
