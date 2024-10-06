
# BCard Server

Welcome to the **BCard** server, the backend component of the BCard platform. This server is built using **Node.js** and **Express** and is responsible for managing user authentication, business card creation, and data storage. The server connects to a **MongoDB** database using **Mongoose** and incorporates various middleware for security, validation, and logging.

## Table of Contents
- [Project Overview](#project-overview)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Documentation](#api-documentation)
- [Usage](#usage)

## Project Overview

BCard is a platform designed to connect businesses and customers through personalized digital business cards. Business owners can sign up, create business cards, and display them on the platform for potential customers to browse. Customers can search for services, view cards, and like their favorite businesses.

The server manages:
- User registration and authentication
- Business card creation, updating, and viewing
- Data validation and security
- Integration with a MongoDB database

The platform is divided into two main parts:
1. **Users**: Handles user registration, login, and profile management.
2. **Cards**: Manages business cards, including creation, updating, and deletion.

## Dependencies

This server utilizes the following dependencies:

\```json
{
  "bcryptjs": "^2.4.3",
  "chalk": "4.1",
  "config": "^3.3.12",
  "cors": "^2.8.5",
  "cross-env": "^7.0.3",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "joi": "^17.13.3",
  "jsonwebtoken": "^9.0.2",
  "lodash": "^4.17.21",
  "mongoose": "^8.6.2",
  "morgan": "^1.10.0"
}
\```

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   \```bash
   git clone https://github.com/eyalSasson71006/cardsServer.git
   \```

2. Navigate into the project directory:

   \```bash
   cd cardsServer
   \```

3. Install the required dependencies:

   \```bash
   npm install
   \```

4. **Download the provided `.env` file** and place it in the root directory of the project. This file contains the necessary environment variables for the project to run properly.

## Environment Variables

The server requires a `.env` file containing various environment variables to work properly. This file should be placed in the root of the project. The `.env` file includes values like:

- `ATLAS_CONNECTION_STRING`: The MongoDB connection string
- `JWT_SECRET`: The secret key used for signing JWT tokens

## Scripts

This project includes the following npm scripts:

- **Start the server in production mode**:

  \```bash
  npm start
  \```

  This command uses `cross-env` to set `NODE_ENV` to `production` and starts the server.

- **Start the server in development mode**:

  \```bash
  npm run dev
  \```

  This command starts the server with `nodemon` and sets `NODE_ENV` to `development` for hot-reloading.

- **Testing** (currently a placeholder):

  \```bash
  npm test
  \```

## API Documentation

The full API documentation for the server is available via the following links:

- [Cards API Documentation](https://documenter.getpostman.com/view/37787079/2sAXxMft7R)
- [Users API Documentation](https://documenter.getpostman.com/view/37787079/2sAXxMft7S)

These documents include detailed information on the available endpoints, including request/response examples.

## Usage

### Starting the Server

After setting up the project and installing dependencies, you can start the server:

1. **Run the server in development mode**:

   \```bash
   npm run dev
   \```

2. **Run the server in production mode**:

   \```bash
   npm start
   \```

The server will listen on the port specified in the `.env` file.

### Business Card Creation

The platform allows business owners to register and create business cards. A business card includes details such as:
- Title (e.g., business name)
- Description
- Contact information (email, phone)
- Website
- Address
- Business number

These business cards can be managed via the API, with users able to perform CRUD (Create, Read, Update, Delete) operations.


### Authentication and JWT

The server uses **JWT (JSON Web Tokens)** for user authentication. When users log in, they receive a token that must be included in the headers of subsequent requests to access protected routes.

### CORS

The server uses the **CORS** middleware to allow cross-origin requests, ensuring that the front-end (running on a different domain or port) can interact with the API.

