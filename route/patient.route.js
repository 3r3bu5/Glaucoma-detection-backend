const express = require('express');
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getPatientHistory,
  deleteAllPatientHistory,
} = require('../controller/patientCtrl');
const { verifyUser } = require('../services/jwtAuth.service');

router.get('/', verifyUser, getAll);
router.post('/new', verifyUser, createOne);
router.get('/:patientId', verifyUser, getOne);
router.get('/:patientId/history', verifyUser, getPatientHistory);
router.delete('/:patientId/history', verifyUser, deleteAllPatientHistory);
router.put('/:patientId/edit', verifyUser, updateOne);
router.delete('/:patientId/delete', verifyUser, deleteOne);

module.exports = router;
