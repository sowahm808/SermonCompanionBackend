const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  res.json(req.user);
};

exports.updatePreferences = async (req, res) => {
  try {
    req.user.preferences = req.body.preferences;
    await req.user.save();
    res.json({
      message: 'Preferences updated',
      preferences: req.user.preferences,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
