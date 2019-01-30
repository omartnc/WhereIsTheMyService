const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  user: {
    type: userSchema,
    required: true
  }
});

const location = mongoose.model("Location", locationSchema);

function validateLocation(location) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .required(),
    latitude: Joi.string()
      .min(5)
      .max(50)
      .required(),
    longitude: Joi.string()
      .min(5)
      .required(),
    userId: Joi.objectId().required()
  };

  return Joi.validate(location, schema);
}

exports.Location = location;
exports.validate = validateLocation;
exports.locationSchema = locationSchema;
