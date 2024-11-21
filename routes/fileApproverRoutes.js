const express = require("express");
const fileApproverController = require("../controllers/fileApproverController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], fileApproverController.getFileApprovers);
router.post("/store", [authMiddleware, create], fileApproverController.saveFileApprover);


module.exports = router;