const express = require('express');
const { generateOutline } = require('../controllers/generateController');
const router = express.Router();

router.post('/', generateOutline);

module.exports = router;
