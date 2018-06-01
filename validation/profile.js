const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // If input is null or undefiend set it to empty String
  // because Validator only works with Strings
  data.name = !isEmpty(data.name) ? data.name : "";
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.occupation = !isEmpty(data.occupation) ? data.occupation : "";

  if (!Validator.isLength(data.name, { min: 2 })) {
    errors.name = "Name must be at least 2 characters long";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Profile name must be between 2 and 30 characters long";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Account name is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }
  if (Validator.isEmpty(data.occupation)) {
    errors.occupation = "Occupation is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
