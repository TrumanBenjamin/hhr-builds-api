const { ObjectId } = require('mongodb');
const { db } = require('../db/db');
const { buildCreate, buildUpdate } = require('../validation/buildsSchema');

// small helper to strip unknown fields
const opts = { abortEarly: false, stripUnknown: true };

const col = () => db().collection('builds');

// GET /api/builds
exports.listBuilds = async (req, res, next) => {
  try {
    const items = await col().find({}).sort({ _id: -1 }).toArray();
    res.json(items);
  } catch (err) { next(err); }
};

// GET /api/builds/:id
exports.getBuild = async (req, res, next) => {
  try {
    const _id = new ObjectId(req.params.id);
    const item = await col().findOne({ _id });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
};

// POST /api/builds
exports.createBuild = async (req, res, next) => {
  try {
    const { error, value } = buildCreate.validate(req.body, opts);
    if (error) return res.status(400).json({ error: 'Validation failed', details: error.details });

    const { insertedId } = await col().insertOne({ ...value, createdAt: new Date() });
    const item = await col().findOne({ _id: insertedId });
    res.status(201).json(item);
  } catch (err) { next(err); }
};

// PUT /api/builds/:id
exports.updateBuild = async (req, res, next) => {
  try {
    const { error, value } = buildUpdate.validate(req.body, opts);
    if (error)
      return res.status(400).json({ error: 'Validation failed', details: error.details });

    const _id = new ObjectId(req.params.id);

    // Do the update
    const result = await col().updateOne(
      { _id },
      { $set: { ...value, updatedAt: new Date() } }
    );

    // If no match found → 404
    if (result.matchedCount === 0)
      return res.status(404).json({ error: 'Not found' });

    // Fetch the updated document and return it
    const updated = await col().findOne({ _id });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/builds/:id
exports.deleteBuild = async (req, res, next) => {
  try {
    const _id = new ObjectId(req.params.id);
    const result = await col().deleteOne({ _id });
    if (!result.deletedCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};