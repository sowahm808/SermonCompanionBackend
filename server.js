const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const validateEnv = require('./src/config/validateEnv');
const rateLimiter = require('./src/middleware/rateLimiter');

// Load environment variables
dotenv.config();
try {
  validateEnv();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/sermons', require('./src/routes/sermons'));
app.use('/api/generate', require('./src/routes/generate'));
app.use('/api/user', require('./src/routes/user'));

app.use((req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
