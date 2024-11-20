const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], bookController.getBooks);
router.post("/store", [authMiddleware, create], bookController.saveBook);


module.exports = router;