require('dotenv').config();
const { uploadSingle } = require('../middleware/fileUpload.midd');
const User = require('../model/user.model');
const Scan = require('../model/scan.model');
// logging
const loggerService = require('../services/logger.service');
var logger = new loggerService('scan.controller');

exports.newScan = async (req, res) => {
  uploadSingle(req, res, async function (err) {
    if (err) {
      logger.error(`SCAN: error uploading or saving image`, err.message);
      return res.status(500).send({ success: false, err: err.message });
    } else {
      try {
        var items = Array(0, 1);
        var result = items[Math.floor(Math.random() * items.length)];
        const newScan = new Scan({
          _patientId: req.body._patientId,
          eye: req.body.eye,
          notes: req.body.notes ? req.body.notes : '',
          result: result,
          Imagelink:
            req.protocol + '://' + process.env.HOSTNAME + '/' + req.file.path,
        });
        const savedImage = await newScan.save();
        var user = await User.findById(req.user._id);
        user.credits = user.credits - 1;
        const updatedUser = await user.save();
        logger.info(
          `SCAN: created a new scan record for patient ${req.body._patientId}`,
          err.message
        );
        return res.status(200).json({
          filename: req.file.originalname,
          result: savedImage.result,
          remCredits: updatedUser.credits,
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
    }
  });
};
