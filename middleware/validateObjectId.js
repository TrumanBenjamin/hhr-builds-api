const { ObjectId } = require('mongodb');

module.exports = function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id format' });
  }
  next();
};