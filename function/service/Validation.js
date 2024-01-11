const validator = require('validator');

class Validation{

  static checkLength(data,min=3,max=255){
    return !(data.length>=min && data.length<=max);
  }

  static checkEmail(email){
    return !validator.isEmail(email)
  }

  static checkPassword(password, min = 8, max = 255) {
    return !(
      password.length >= min &&
      password.length <= max &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&   
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
      )  
  }

}

module.exports = Validation;