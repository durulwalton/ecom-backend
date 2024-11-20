const express = require("express");
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], articleController.getArticles);
router.post("/store", [authMiddleware, create], articleController.saveArticle);


module.exports = router;