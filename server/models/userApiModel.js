const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: "Please provide proper email",
    unique: [true, "Employee email already Exists"],
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  empid: {
    type: Number,
    required: "Please provide proper employee id",
    unique: true,
    index: true,
  },
  mobile: {
    type: Number,
    unique: true,
    minlength: [10, "Number should not be less than 10"],
    maxlength: [10, "Number should not be greater than 10"],
    index: true,
    required: "Please provide proper mobile number",
  },
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  softDelete: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.model("users", UserSchema);
const userValidate = new Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.min": "Name should be atleast of 2 letters",
    "string.max": "Name letter limit is of 30 only!",
  }),
  mobile: Joi.number().min(1000000000).max(9999999999).required().messages({
    "number.min": "Mobile number should be of minimum 10 digits",
    "number.max": "Mobile number should be of maximum 10 digits",
    "number.empty": "Mobile number cannot be empty",
  }),
  empid: Joi.number().min(1000000).max(9999999).required().messages({
    "number.min": "Employee ID should be of minimum 7 digits",
    "number.max": "Employee ID should be of maximum 7 digits",
    "number.empty": "Employee ID cannot be empty",
  }),
  email: Joi.string().required(),
  city: Joi.string(),
  state: Joi.string(),
}).options({
  abortEarly: false,
});

module.exports = { User, userValidate };
