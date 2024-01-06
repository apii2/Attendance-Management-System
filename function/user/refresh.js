const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");

const refreshJwt = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decodedRefreshToken.userId || !decodedRefreshToken.userAgent) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    const user = await User.findById(decodedRefreshToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    if (decodedRefreshToken.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: "Refresh token has expired. Please login again." });
    }

    const { _id, username, email, role,faculty,course,semester } = user;
    const payload = {
      userId: _id,
      username,
      email,
      role,
      faculty,
      course,
      semester,
      userAgent: req.headers["user-agent"], 
      ipAddress: req.ip, 
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION 
    });

    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = refreshJwt;
