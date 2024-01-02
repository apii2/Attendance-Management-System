const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");

const refreshJwt = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verify the refresh token to check its validity and extract the user ID and user-agent
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if the decoded refresh token contains the userId and user-agent
    if (!decodedRefreshToken.userId || !decodedRefreshToken.userAgent) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    // Fetch the user from the database based on the userId in the refresh token
    const user = await User.findById(decodedRefreshToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the provided refresh token matches the one stored in the database
    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    // Check if the refresh token has expired
    if (decodedRefreshToken.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: "Refresh token has expired. Please login again." });
    }

    // Generate a new access token with the user's data
    const { _id, username, email, role } = user;
    const payload = {
      userId: _id,
      username,
      email,
      role,
      userAgent: req.headers["user-agent"], // Use the updated user-agent from the current request
      ipAddress: req.ip, // Use the updated IP address from the current request
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION, // Set the access token expiration time
    });

    // Generate a new refreshToken with no expiration
    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

    // Save the new refreshToken to the user's refreshToken field in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    // Return the new access token and refreshToken to the client
    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = refreshJwt;
