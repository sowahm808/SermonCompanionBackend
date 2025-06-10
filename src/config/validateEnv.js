module.exports = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'OPENAI_API_KEY'];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};
