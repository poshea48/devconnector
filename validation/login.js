const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.login = "Incorrect user/password combination"
  }

  if (Validator.isEmpty(data.email)) {
    errors.login = "Incorrect user/password combination"
  }

  if (Validator.isEmpty(data.password)) {
    errors.login = "Incorrect user/password combinationd"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
