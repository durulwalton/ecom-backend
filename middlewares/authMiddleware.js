const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      appStatus: true,
      appCode: 401,
      appMessage: "Not authorized, no token",
      data: null,
    });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({
      appStatus: true,
      appCode: 401,
      appMessage: "Not authorized, token failed",
      data: null,
    });
  }
};

module.exports = authMiddleware;
