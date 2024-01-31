const jwt = require("jsonwebtoken");

const Hashing = require("../service/Hashing");
const User = require("../../model/userModel");

const userLogin = async (req, res) => {
  const { user, password } = req.body;

  try {
    const foundUser = await User.findOne({ $or: [{ username: user }, { email: user }] });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid credentials.." });
    }

    const passwordMatch = await Hashing.validate(password, foundUser.password);

    if (passwordMatch) {
      const { _id, firstName, middleName, lastName, username, email, role, faculty, course, semester } = foundUser;
      
      const payload = {
        userId: _id,
        firstName,
        middleName,
        lastName,
        username,
        email,
        faculty,
        course,
        semester,
        role, 
        ipAddress: req.ip, 
        userAgent: req.headers["user-agent"], 
      };

      const data = {
        userId: _id,
        firstName,
        lastName,
        username,
        email,
        role
      };

      if(middleName){
        data.middleName= middleName;
      }

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
      foundUser.token = accessToken;

      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
      foundUser.refreshToken = refreshToken;

      await foundUser.save();

      return res.status(200).json({ message: "Authenticated", accessToken, refreshToken,data });
    } else {
      return res.status(401).json({ error: "Invalid credentialsss." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = userLogin;