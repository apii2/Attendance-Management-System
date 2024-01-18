const jwt = require("jsonwebtoken");
const Hashing = require("../../function/service/Hashing");
const Usermodel = require("../../model/userModel");

const refreshJwt = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decodedRefreshToken = Hashing.decryptRefresh(refreshToken);
    console.log(decodedRefreshToken)

    if (!decodedRefreshToken.userId || !decodedRefreshToken.userAgent) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    const user = await Usermodel.findById(decodedRefreshToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    const { _id, firstName, middleName, lastName, username, email, role,faculty,course,semester } = user;

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


    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION 
    });
    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    user.token=accessToken;
    user.refreshToken = newRefreshToken;

    await user.save();

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = refreshJwt;