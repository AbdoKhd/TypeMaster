const express = require('express');
const router = express.Router();
const { registerController } = require('../controllers/regController');


console.log("in route reg");
router.post('/register', registerController);

module.exports = router;