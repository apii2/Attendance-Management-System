const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let User = require("../../model/userModel");

const userLogin = async (req, res) => {
  const { user, password } = req.body;

  try {
    // Find the user by username or email
    const foundUser = await User.findOne({ $or: [{ username: user }, { email: user }] });

    if (!foundUser) {
      // User not found
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordMatch) {
      // User authenticated successfully
      // For example, generate a JWT token for the authenticated user
      const { _id,name, username, email, userType } = foundUser;
      const payload = {
        userId: _id,
        name,
        username,
        email,
        userType, // Adding userType to the payload
        ipAddress: req.ip, // Adding IP address to the payload
        userAgent: req.headers["user-agent"], // Adding user-agent to the payload
      };
      const data = {
        userId: _id,
        name,
        username,
        email,
        userType
      };

      // Set the expiration time for the access token (15 minutes)
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });

      // Set the expiration time for the refresh token (7 days)
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

      // Save the refresh token in the user table
      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      // Log the successful login attempt
      return res.status(200).json({ message: "Authenticated", accessToken, refreshToken,data });
    } else {
      // Passwords don't match
      return res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = userLogin;
