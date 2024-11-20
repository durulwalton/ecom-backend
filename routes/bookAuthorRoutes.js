const express = require("express");
const bookAuthorController = require("../controllers/bookAuthorController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], bookAuthorController.getBookAuthors);
router.post("/store", [authMiddleware, create], bookAuthorController.saveBookAuthor);


module.exports = router;