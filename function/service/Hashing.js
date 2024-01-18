const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Hashing{
  static hash(password,salt=10){
    return bcrypt.hash(password, salt);
  }

  static decrypt(token){
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }

  static decryptRefresh(refreshToken){
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } 

  static validate(password,hashedPassword){
    return bcrypt.compare(password,hashedPassword);
  }
}

module.exports = Hashing;