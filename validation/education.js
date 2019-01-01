const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  if (!data.current) {
    data.to = !isEmpty(data.to) ? data.to : '';
  }


  if(Validator.isEmpty(data.school)) {
    errors.school = "School name is required"
  }

  if(Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required"
  }

  if(Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required"
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
