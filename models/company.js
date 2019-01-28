const Joi = require("joi");
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});
const Company = mongoose.model("Company", companySchema);

function validateCompany(Company) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
  };
  return Joi.validate(Company, schema);
}

exports.companySchema = companySchema;
exports.Company = Company;
exports.validate = validateCompany;
