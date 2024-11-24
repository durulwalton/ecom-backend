const express = require("express");
const purchaseReturnController = require("../controllers/purchaseReturnController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware], purchaseReturnController.savePurchaseReturn);
router.post("/store", [authMiddleware], purchaseReturnController.savePurchaseReturn);


module.exports = router;