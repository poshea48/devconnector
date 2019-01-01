const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.company = !isEmpty(data.company) ? data.company : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  if (!data.current) {
    data.to = !isEmpty(data.to) ? data.to : '';
  }


  if(Validator.isEmpty(data.company)) {
    errors.company = "Company name is required"
  }

  if(Validator.isEmpty(data.title)) {
    errors.title = "Title field is required"
  }

  if(Validator.isEmpty(data.location)) {
    errors.location = "Location field is required"
  }

  if(Validator.isEmpty(data.from)) {
    errors.from = "From Date field is required"
  }

  if (!data.current) {
    if(Validator.isEmpty(data.to)) {
      errors.to = "To Date field is required"
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
