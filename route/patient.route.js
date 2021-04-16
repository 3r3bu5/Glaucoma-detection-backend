const express = require('express');
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controller/patientCtrl');
const { verifyUser } = require('../services/jwtAuth.service');

router.get('/', verifyUser, getAll);
router.post('/new', verifyUser, createOne);
router.get('/:patientId', verifyUser, getOne);
router.put('/:patientId/edit', verifyUser, updateOne);
router.delete('/:patientId/delete', verifyUser, deleteOne);

module.exports = router;
