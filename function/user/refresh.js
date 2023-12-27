const jwt = require("jsonwebtoken");
let User = require("../../model/userModel");

const refreshToken = async (req, res) => {
  const { token, refreshToken } = req.body;

  try {
    // Decode the token to get user ID
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Find the user by user ID
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      // User not found
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Verify if the provided refresh token matches the stored refresh token
    if (refreshToken !== foundUser.refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    // At this point, the refresh token is valid

    // Generate new access and refresh tokens
    const newAccessToken = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    const newRefreshToken = jwt.sign({ userId: foundUser._id }, process.env.REFRESH_TOKEN_SECRET);

    // Update the user's refresh token in the database
    foundUser.refreshToken = newRefreshToken;
    await foundUser.save();

    // Return the new tokens
    return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = refreshToken;
