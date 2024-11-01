# News Portal API

## Overview

This is a simple API for a news portal application built with Express.js and PostgreSQL. The API supports two roles: Admin and Users/Visitors. Admins can manage news categories and articles, while users can view and search for news.

## Features

### Admin Role
- **Authentication**: Admin can log in and log out.
- **Manage Categories**: Add, edit, and delete news categories.
- **Manage News**: Add, edit, and delete news articles.

### User/Visitor Role
- **Authentication**: User can log in and log out.
- **View News**: Retrieve a list of news articles.
- **View News Details**: Fetch detailed information about a specific news article.
- **Search News**: Search for news articles based on keywords.

## Tech Stack
- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Database for storing news and categories.
- **Prisma**: ORM for PostgreSQL to manage database interactions.
- **JWT**: Library for authentication.
- **Postman**: Documentation for API endpoints.
- **Jest**: Testing library for unit tests.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/johnathanjohnathan/News_Apps.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database:
   - Create a `.env` file with the following content:
     ```
     DATABASE_URL="postgresql://username:password@localhost:5432/newsdb?schema=public"
     JWT_SECRET_KEY="secret"
     ```

4. Run migrations to set up the database schema:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Build and start the application:
   ```bash
   npm run build
   npm start
   ```

### Running the Application
To start the server, use:
```bash
npm start
```

### Testing
To run the tests, use:
```bash
npm run test
```

## API Documentation
Postman documentation is available at: [Postman Documentation](https://documenter.getpostman.com/view/35157893/2sAY4x9gDo)

## Conclusion
This API provides the basic functionality for a news portal application. Feel free to extend the features and enhance the security based on your requirements.