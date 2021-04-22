const express = require('express');
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
  getPatientHistory,
  deletePatientHistory,
} = require('../controller/patientCtrl');
const { verifyUser } = require('../services/jwtAuth.service');
// validation
const {
  validateUserInput,
} = require('../middleware/validation/validation.midd');
const validationType = require('../middleware/validation/action');

router.get('/', verifyUser, getAll);
router.post(
  '/new',
  verifyUser,
  validateUserInput(validationType.PATIENT),
  createOne
);
router.get(
  '/:patientId',
  verifyUser,
  validateUserInput(validationType.PATIENT),
  getOne
);
router.get(
  '/:patientId/history',
  verifyUser,
  validateUserInput(validationType.PATIENT),
  getPatientHistory
);
router.delete(
  '/:patientId/history/:historyId',
  verifyUser,
  validateUserInput(validationType.PATIENT),
  deletePatientHistory
);
router.put(
  '/:patientId/edit',
  verifyUser,
  validateUserInput(validationType.PATIENT),
  updateOne
);
router.delete(
  '/:patientId/delete',
  verifyUser,
  validateUserInput(validationType.PATIENT),
  deleteOne
);

module.exports = router;
