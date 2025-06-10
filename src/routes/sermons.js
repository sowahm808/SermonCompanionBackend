const express = require('express');
const {
  createSermon,
  getSermons,
  updateSermon,
  deleteSermon,
  generateSermon,
} = require('../controllers/sermonController');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

router.post('/', auth, asyncHandler(createSermon));
router.get('/', auth, asyncHandler(getSermons));
router.put('/:id', auth, asyncHandler(updateSermon));
router.delete('/:id', auth, asyncHandler(deleteSermon));
router.post('/generate', auth, asyncHandler(generateSermon));

module.exports = router;
