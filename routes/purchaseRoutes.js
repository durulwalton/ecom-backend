const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware], purchaseController.savePurchase);
router.post("/store", [authMiddleware], purchaseController.savePurchase);


module.exports = router;