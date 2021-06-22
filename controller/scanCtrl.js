require('dotenv').config();
const { uploadSingle } = require('../middleware/fileUpload.midd');
const User = require('../model/user.model');
const Scan = require('../model/scan.model');
// logging
const loggerService = require('../services/logger.service');
var logger = new loggerService('scan.controller');
// audit
const { handleAuditing } = require('../audit/audit');
const actionTypes = require('../audit/actionTypes');
// error handling
const APIError = require('../error/api.error');
const ErrorStatus = require('../error/errorStatusCode');
const ErrorType = require('../error/errorType');
var spawn = require("child_process").spawn;

exports.newScan = async (req, res) => {
  try {
    var user = await User.findById(req.user._id);
    if (user.credits < 1) {
      throw new APIError(
        ErrorType.API_ENDPOINT_ERROR,
        ErrorStatus.FORBIDDEN,
        'No enough credits',
        true
      );
    }
    uploadSingle(req, res, async function (err) {
      if (err) {
        logger.error(`SCAN: error uploading or saving image`, err.message);
        return res.status(500).send({ success: false, err: err.message });
      } else {
        var process = spawn('python3', ["/mnt/d/Development/Projects/graduation/src/glac-server/model_func/prediction.py",
          `/mnt/d/Development/Projects/graduation/src/glac-server/${req.file.path}`,
        ]);
        process.stdout.on('data', async (data) => {
          const newScan = new Scan({
            _patientId: req.body._patientId,
            eye: req.body.eye,
            notes: req.body.notes ? req.body.notes : '',
            result: data,
            Imagelink:
              req.protocol + '://' + "localhost" + '/' + req.file.path,
          });
          const savedScan = await newScan.save();
          user.credits = user.credits - 1;
          const updatedUser = await user.save();
          logger.info(
            `SCAN: created a new scan record for patient ${req.body._patientId}`
          );
          handleAuditing(
            actionTypes.CREATE_NEW_SCAN,
            savedScan,
            200,
            null,
            req.user._id
          );
          return res.status(200).json({
            status: true,
            filename: req.file.originalname,
            result: savedScan.result,
            remCredits: updatedUser.credits,
          });
        });
      }
    });
  } catch (err) {
    logger.error(
      `SCAN: Error creating scan record for patient ${req.body._patientId} `,
      err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};
