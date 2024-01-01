const express = require('express');
const router = express.Router();
const { getTextsController } = require('../controllers/textsController');



router.get('/getTexts', getTextsController);

module.exports = router;

