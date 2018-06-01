const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.lookingFor = !isEmpty(data.lookingFor) ? data.lookingFor : "";

  if (!Validator.isLength(data.name, { min: 2, max: 300 })) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }
  if (Validator.isEmpty(data.lookingFor)) {
    errors.lookingFor = "Looking for field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
