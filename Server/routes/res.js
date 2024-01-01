const express = require('express');
const router = express.Router();
const { saveResController, getResController } = require('../controllers/resController');
const authenticateToken = require('./middleware');



console.log("in route res");
router.post('/saveRes', saveResController, authenticateToken);

router.get('/getRes', getResController, authenticateToken);

module.exports = router;