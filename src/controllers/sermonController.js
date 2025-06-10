const Sermon = require('../models/Sermon');
const OpenAI = require('openai');
const { paginate } = require('../models/pagination');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create a new sermon and associate it with the authenticated user
exports.createSermon = async (req, res) => {
  try {
    const sermon = await Sermon.create({ ...req.body, user_id: req.user.id });
    res.status(201).json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve paginated sermons for the logged-in user
exports.getSermons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await paginate(Sermon, {
      query: { user_id: req.user.id },
      page,
      limit,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user's sermon by ID
exports.updateSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true }
    );

    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }

    res.json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user's sermon by ID
exports.deleteSermon = async (req, res) => {
  try {
    const result = await Sermon.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });

    if (!result) {
      return res.status(404).json({ message: 'Sermon not found' });
    }

    res.json({ message: 'Sermon removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate sermon outline using OpenAI based on user input
exports.generateSermon = async (req, res) => {
  try {
    const { theme, length, translation } = req.body;

    // Validate required inputs
    if (!theme || !length || !translation) {
      return res.status(400).json({
        message: 'Theme, length, and translation are required.',
      });
    }
    const prompt = `Generate a ${length} minute sermon outline about ${theme} with Bible verses from the ${translation} translation.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const choice = completion.choices && completion.choices[0];
    if (!choice) {
      return res
        .status(500)
        .json({ message: 'Failed to generate sermon outline' });
    }

    res.json({ outline: content });
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ message: 'Error generating sermon outline.' });
  }
};
