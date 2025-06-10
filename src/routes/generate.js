const express = require('express');
const { generateOutline } = require('../controllers/generateController');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');

router.post('/', validateRequest(['theme', 'length']), asyncHandler(generateOutline));

module.exports = router;
