# Madquick Password Manager Backend

A secure backend service for the Madquick Password Manager application that provides user authentication and password vault functionality.

## Features

- User authentication (signup and login)
- Secure password storage with encryption
- Password vault management (create, read, update, delete)
- JWT-based authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Madquick-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
PORT=8080
MONGO_CONN=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

Replace the placeholders with your actual MongoDB connection string and a secure JWT secret.

## Running the Application

### Development Mode

To run the application in development mode with automatic reloading:

```
npm run dev
```

### Production Mode

To run the application in production mode:

```
npm start
```

The server will start on the port specified in your `.env` file (default: 8080).

## API Endpoints

### Authentication

- **POST /auth/signup** - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- **POST /auth/login** - Login a user
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: JWT token

### Vault Management

All vault endpoints require authentication with a JWT token in the Authorization header.

- **GET /api/fetch-data** - Get all vault items for the logged-in user

- **POST /api/save-data** - Create or update a vault item
  - Body: `{ "_id": "string" (optional), "title": "string", "username": "string", "password": "string", "url": "string" (optional), "notes": "string" (optional) }`

- **DELETE /api/delete?id=<item-id>** - Delete a vault item

## Testing the API

You can test the API using tools like Postman or curl. For example:

```
# Test server is running
curl http://localhost:8080/ping

# Register a new user
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Security Notes

- Passwords are hashed using bcrypt before storage
- Authentication is handled via JWT tokens
- Make sure to use a strong, unique JWT_SECRET in production

## Deliverables

### Short Note: What You Used for Crypto and Why
I used the bcrypt library for password encryption because it provides a secure hashing algorithm that protects user passwords by adding salt. This ensures that even if the database is compromised, the original passwords cannot be easily retrieved.


