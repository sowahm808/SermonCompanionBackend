const express = require('express');
const { getCurrentUser, updatePreferences } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, getCurrentUser);
router.put('/preferences', auth, updatePreferences);

module.exports = router;
