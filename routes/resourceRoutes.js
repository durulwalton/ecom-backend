const express = require("express");
const resourceController = require("../controllers/resourceController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], resourceController.getResources);
router.post("/store", [authMiddleware, create], resourceController.saveResource);


module.exports = router;