const express = require('express');
const router = express.Router();
const { uploadCtrl } = require('../controller/uploadCtrl');
const { uploadSingle } = require('../middleware/fileUpload.midd');

router.post('/', uploadSingle, uploadCtrl);

module.exports = router;
