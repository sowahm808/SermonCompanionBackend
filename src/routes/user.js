const express = require('express');
const { getCurrentUser, updatePreferences } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');

router.get('/me', auth, asyncHandler(getCurrentUser));
router.put('/preferences', auth, validateRequest(['preferences']), asyncHandler(updatePreferences));

module.exports = router;
