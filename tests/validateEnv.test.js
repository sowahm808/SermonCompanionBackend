const assert = require('assert');
const validateEnv = require('../src/config/validateEnv');

const original = { ...process.env };

process.env.MONGODB_URI = 'mongodb://localhost/test';
process.env.JWT_SECRET = 'secret';
process.env.OPENAI_API_KEY = 'key';
assert.doesNotThrow(() => validateEnv());

delete process.env.MONGODB_URI;
assert.throws(() => validateEnv(), /Missing required environment variables/);

Object.assign(process.env, original);
console.log('validateEnv tests passed');
