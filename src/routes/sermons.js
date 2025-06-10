const express = require('express');
const {
  createSermon,
  getSermons,
  updateSermon,
  deleteSermon,
  generateSermon,
} = require('../controllers/sermonController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createSermon);
router.get('/', auth, getSermons);
router.put('/:id', auth, updateSermon);
router.delete('/:id', auth, deleteSermon);
router.post('/generate', auth, generateSermon);

module.exports = router;
