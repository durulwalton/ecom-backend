const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");
const router = express.Router();

router.post(
  "/register",
  [authMiddleware, registerValidator],
  userController.register
);
router.post("/login", loginValidator, userController.login);
router.get("/profile", [authMiddleware], userController.getProfile);
module.exports = router;
