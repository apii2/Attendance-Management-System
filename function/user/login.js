const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let User = require("../../model/userModel");

const userLogin = async (req, res) => {
  const { user, password } = req.body;

  try {
    const foundUser = await User.findOne({ $or: [{ username: user }, { email: user }] });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordMatch) {
      const { _id,name, username, email, role,faculty,course,semester } = foundUser;
      
      const payload = {
        userId: _id,
        name,
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
        name,
        username,
        email,
        role
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });

      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      return res.status(200).json({ message: "Authenticated", accessToken, refreshToken,data });
    } else {
      return res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = userLogin;
