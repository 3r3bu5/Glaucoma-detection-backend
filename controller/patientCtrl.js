const Patient = require('../model/patient.model');
const Image = require('../model/image.model');

exports.getAll = async (req, res, next) => {
  try {
    const patient = await Patient.find({ _doctorId: req.user._id });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, patient });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, err });
  }
};
exports.createOne = async (req, res, next) => {
  console.log(req.user._id, req.body);
  try {
    let patient = new Patient({
      _doctorId: req.user._id,
      fname: req.body.firstname,
      lname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
    });
    let savedPatient = await patient.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, savedPatient });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ success: false, err: err.message });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.patientId });
    if (req.user._id != patient._doctorId) {
      return res
        .status(401)
        .json({ success: false, msg: 'Unauthorized Access' });
    }
    if (!patient) {
      return res.status(404).json({ success: false, msg: 'Patient Not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, patient });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, err });
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.patientId });
    if (req.user._id != patient._doctorId) {
      return res
        .status(401)
        .json({ success: false, msg: 'Unauthorized Access' });
    }
    if (!patient) {
      return res.status(404).json({ success: false, msg: 'Patient Not found' });
    }
    if (req.body.firstname) {
      patient.fname = req.body.firstname;
    }
    if (req.body.lastname) {
      patient.lname = req.body.lastname;
    }
    if (req.body.age) {
      patient.age = req.body.age;
    }
    if (req.body.gender) {
      patient.gender = req.body.gender;
    }
    const newPatient = await patient.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, newPatient });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, err });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.patientId });
    if (req.user._id != patient._doctorId) {
      return res
        .status(401)
        .json({ success: false, msg: 'Unauthorized Access' });
    }
    if (!patient) {
      return res.status(404).json({ success: false, msg: 'Patient Not found' });
    }
    await patient.remove();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, msg: 'Deleted successfully' });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, err });
  }
};

exports.getPatientHistory = async (req, res, next) => {
  try {
    const history = await Image.find({
      _patientId: req.params.patientId,
    }).populate('_patientId');
    if (!history) {
      return res.status(404).json({ success: false, msg: 'History Not found' });
    }
    if (req.user._id !== history[0]._patientId._doctorId) {
      return res
        .status(401)
        .json({ success: false, msg: 'Unauthorized Access' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, history });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ success: false, err: err.message });
  }
};
exports.deleteAllPatientHistory = async (req, res, next) => {
  try {
    const history = await Image.find({
      _patientId: req.params.patientId,
    }).populate('_patientId');
    if (!history) {
      return res.status(404).json({ success: false, msg: 'History Not found' });
    }
    if (req.user._id !== history[0]._patientId._doctorId) {
      return res
        .status(401)
        .json({ success: false, msg: 'Unauthorized Access' });
    }
    await history.remove();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, msg: 'Delete history successfully' });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ success: false, err: err.message });
  }
};
