const Joi = require('joi');

exports.buildCreate = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  year: Joi.number().integer().min(1900).max(2100).required(),
  model: Joi.string().min(1).max(120).required(),
  subtitle: Joi.string().allow('', null),
  plans: Joi.string().allow('', null),
  isCompleted: Joi.boolean().default(false),
  heroPhotoUrl: Joi.string().uri().allow('', null)
});

exports.buildUpdate = exports.buildCreate.min(1);