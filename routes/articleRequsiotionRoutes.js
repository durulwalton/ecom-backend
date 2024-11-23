const express = require("express");
const articleRequationController = require("../controllers/articleRequationController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware], articleRequationController.getArticleRequations);
router.post("/store", [authMiddleware], articleRequationController.saveArticleRequsition);


module.exports = router;