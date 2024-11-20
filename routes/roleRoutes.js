const express = require("express");
const roleController = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const { read, create, write } = require("../middlewares/authorizeMiddleware");
const router = express.Router();

router.get("/index", [authMiddleware, read], roleController.getAllRole);

router.get("/show/:id", roleController.showRole);
// For Create Form Page
router.get("/create",authMiddleware, roleController.createRole);
router.post("/store", [authMiddleware, create], roleController.saveRole);
// For Edit Form Page
router.get("/show/edit/:id",authMiddleware, roleController.editRole);
router.put("/update/:id",authMiddleware, roleController.updateRole);

router.delete("/:id", roleController.removeRole);

module.exports = router;
