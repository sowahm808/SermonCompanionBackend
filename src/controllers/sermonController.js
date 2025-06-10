const Sermon = require('../models/Sermon');
const { OpenAIApi, Configuration } = require('openai');
const { paginate } = require('../models/pagination');

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
    if (!theme || !length || !translation) {
      return res
        .status(400)
        .json({ message: 'theme, length and translation are required' });
    }
    const prompt = `Generate a ${length} minute sermon outline about ${theme} with Bible verses from the ${translation} translation.`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const choice = completion.data.choices && completion.data.choices[0];
    if (!choice) {
      return res
        .status(500)
        .json({ message: 'Failed to generate sermon outline' });
    }
    res.json({ outline: choice.message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
