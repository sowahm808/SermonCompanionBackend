module.exports = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'OPENAI_API_KEY'];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
};
