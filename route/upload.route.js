const express = require('express');
const router = express.Router();
const { uploadCtrl } = require('../controller/uploadCtrl');
const { verifyUser } = require('../services/jwtAuth.service');

router.post('/', verifyUser, uploadCtrl);

module.exports = router;
