const Sermon = require('../models/Sermon');
const { OpenAIApi, Configuration } = require('openai');

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

exports.createSermon = async (req, res) => {
  try {
    const sermon = await Sermon.create({ ...req.body, user_id: req.user.id });
    res.status(201).json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find({ user_id: req.user.id });
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    res.json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSermon = async (req, res) => {
  try {
    await Sermon.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    res.json({ message: 'Sermon removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateSermon = async (req, res) => {
  try {
    const { theme, length, translation } = req.body;
    // Simple prompt for OpenAI
    const prompt = `Generate a ${length} minute sermon outline about ${theme} with Bible verses from the ${translation} translation.`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ outline: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
