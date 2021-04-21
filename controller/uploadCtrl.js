require('dotenv').config();
const { uploadSingle } = require('../middleware/fileUpload.midd');
const User = require('../model/user.model');
const Image = require('../model/image.model');

exports.uploadCtrl = async (req, res) => {
  uploadSingle(req, res, async function (err) {
    if (err) {
      return res.status(500).send({ success: false, err: err.message });
    } else {
      try {
        var items = Array(0, 1);
        var result = items[Math.floor(Math.random() * items.length)];
        const newImage = new Image({
          _patientId: req.body._patientId,
          eye: req.body.eye,
          notes: req.body.notes ? req.body.notes : '',
          result: result,
          Imagelink:
            req.protocol + '://' + process.env.HOSTNAME + '/' + req.file.path,
        });
        const savedImage = await newImage.save();
        var user = await User.findById(req.user._id);
        user.credits = user.credits - 1;
        const updatedUser = await user.save();
        return res.status(200).json({
          filename: req.file.originalname,
          result: savedImage.result,
          remCredits: updatedUser.credits,
        });
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ success: false, err: err.message });
      }
    }
  });
};
