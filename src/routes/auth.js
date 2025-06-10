const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');

router.post(
  '/register',
  validateRequest(['name', 'email', 'password']),
  asyncHandler(register)
);
router.post(
  '/login',
  validateRequest(['email', 'password']),
  asyncHandler(login)
);

module.exports = router;
