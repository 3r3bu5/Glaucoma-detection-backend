const express = require('express');
const router = express.Router();
const { newScan } = require('../controller/scanCtrl');
const { verifyUser } = require('../services/jwtAuth.service');

router.post('/', verifyUser, newScan);

module.exports = router;
