const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateOutline = async (req, res) => {
  try {
    const { theme, length } = req.body;
    if (!theme || !length) {
      return res.status(400).json({ message: 'theme and length are required' });
    }
    const prompt = `Provide a sermon outline about "${theme}" that would last approximately ${length} minutes.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    const choice = completion.choices && completion.choices[0];
    if (!choice) {
      return res.status(500).json({ message: 'Failed to generate outline' });
    }
    res.json({ outline: choice.message.content.trim() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
