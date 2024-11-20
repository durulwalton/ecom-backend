const express = require("express");
const authorController = require("../controllers/authorController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], authorController.getAuthors);
router.post("/store", [authMiddleware, create], authorController.saveAuthor);

module.exports = router;
