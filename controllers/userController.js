const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const config = require("../config");
const logger = require("../utils/logger");

exports.register = async (req, res, next) => {
  let authUser = req.user;
  try {
    const user = await userService.registerUser({
      ...req.body,
      createdBy: authUser.id,
    });
    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    // const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    //   expiresIn: "1h",
    // });
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    logger.error("Error in register:", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    logger.error("Error in login:", error);
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.findAuthUserById(req.user.id);
    res.status(200).json({
      appStatus: true,
      appCode: 200,
      appMessage: "Fetch Profile Successfully.",
      data: user,
    });
  } catch (error) {
    logger.error("Error in getProfile:", error);
    next(error);
  }
};
