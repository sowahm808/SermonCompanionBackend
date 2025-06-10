# Sermon Companion Backend

This project provides a Node.js/Express API with MongoDB for the Sermon Companion application. It includes authentication, sermon CRUD operations and an endpoint to generate sermon outlines using the OpenAI API.

Additional middleware validates required environment variables and provides structured error responses for a more production-ready setup. A root `/` endpoint is also available for basic health checks.

## Requirements
- Node.js 18+
- MongoDB connection string
- OpenAI API key
- JWT secret for token signing

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example` and populate your environment variables.
3. Start the server (the process will exit if required environment variables are missing):
   ```bash
   npm start
   ```

## Scripts
- `npm start` – run the server
- `npm run dev` – run in development with nodemon

## API
- `GET /` – health check endpoint
- `POST /api/auth/register` – register user
- `POST /api/auth/login` – login user
- `GET /api/sermons` – list sermons (requires JWT)
- `POST /api/sermons` – create sermon
- `PUT /api/sermons/:id` – update sermon
- `DELETE /api/sermons/:id` – delete sermon
- `POST /api/sermons/generate` – generate sermon outline via OpenAI
- `GET /api/user/me` – get current user profile (requires JWT)
- `PUT /api/user/preferences` – update user preferences (requires JWT)

This repository only includes server code. The frontend should consume these endpoints.
