const express = require('express');
const router = express.Router();
const { uploadCtrl } = require('../controller/uploadCtrl');
const { uploadSingle } = require('../middleware/fileUpload.midd');
const { verifyUser } = require('../services/jwtAuth.service');

router.post('/', verifyUser, uploadSingle, uploadCtrl);

module.exports = router;
