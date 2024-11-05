const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);
router.post('/', userController.createUser);

// Add other routes like PUT and DELETE as needed

module.exports = router;
