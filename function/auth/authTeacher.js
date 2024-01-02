const jwt = require('jsonwebtoken');

const authTeacher = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const requestIp = req.ip;
    const requestAgent = req.headers['user-agent'];
    
    if(!requestIp==decoded.ipAddress || !requestAgent==decoded.userAgent){
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    if(decoded.role!=="teacher" || decoded.role !== "admin"){
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Attach the decoded payload to the request for later use
    req.user = decoded;

    next();
  } catch (error) {
      console.log(error)
      return res.status(401).json({ message: "Invalid token" });
    
  }
};

module.exports = authTeacher;
