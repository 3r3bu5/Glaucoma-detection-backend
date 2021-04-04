exports.uploadCtrl = (req, res) => {
  var items = Array(0,1);
  var item = items[Math.floor(Math.random() * items.length)];
  res.json({ filename: req.file.originalname, result: item });
};
