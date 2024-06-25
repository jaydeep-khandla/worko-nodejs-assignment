# Worko Node.js Assignment

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Building](#building)
- [Directory Structure](#directory-structure)

## Introduction

This project is a User Management API built with Node.js, Express, and MongoDB. It provides endpoints to create, read, update, and delete user data, as well as handle user authentication and data validation.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/worko-nodejs-assignment.git
    cd worko-nodejs-assignment
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following environment variables:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/worko
    ```

4. **Start the server:**
    ```sh
    npm run start:dev
    ```

    The server will start on `http://localhost:5000`.

## Usage

You can interact with the API using tools like Postman or cURL. Below are the available endpoints.

## API Endpoints

### User Endpoints

- **Create a user**

    ```http
    POST /api/users
    ```

    Request body:
    ```json
    {
      "email": "example@example.com",
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "zipCode": "123456"
    }
    ```

    Response:
    ```json
    {
      "id": "unique_user_id",
      "email": "example@example.com",
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "zipCode": "123456"
    }
    ```

- **Get all users**

    ```http
    GET /api/users
    ```

    Response:
    ```json
    [
      {
        "id": "unique_user_id",
        "email": "example@example.com",
        "name": "John Doe",
        "age": 30,
        "city": "New York",
        "zipCode": "123456"
      }
    ]
    ```

- **Get a user by ID**

    ```http
    GET /api/users/:id
    ```

    Response:
    ```json
    {
      "id": "unique_user_id",
      "email": "example@example.com",
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "zipCode": "123456"
    }
    ```

- **Update a user by ID**

    ```http
    PUT /api/users/:id
    ```

    Request body:
    ```json
    {
      "email": "example@example.com",
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "zipCode": "123456"
    }
    ```

    Response:
    ```json
    {
      "id": "unique_user_id",
      "email": "example@example.com",
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "zipCode": "123456"
    }
    ```

- **Soft delete a user by ID**

    ```http
    DELETE /api/users/:id
    ```

    Response:
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

##Bundling

To bundle the application, use following command:

```sh
npm run build
```

To Run the bundle, use following command:

```sh
npm run start:bundle
```

## Testing

To run the test suite, use the following command:

```sh
npm test
```

This will run unit tests for the controllers, services, and data access objects (DAOs) using Jest and Supertest.

## Directory Structure

```
└── 📁worko-nodejs-assignment
    └── .env
    └── .gitignore
    └── app.js
    └── package-lock.json
    └── package.json
    └── README.md
    └── 📁src
        └── 📁config
            └── db.js
        └── 📁controllers
            └── userController.js
        └── 📁dao
            └── userDAO.js
        └── 📁dtos
            └── userDTO.js
        └── 📁middlewares
            └── auth.js
        └── 📁models
            └── User.js
        └── 📁routes
            └── userRoutes.js
        └── 📁services
            └── userService.js
        └── 📁tests
            └── user.test.js
            └── userDAO.test.js
            └── userDTO.test.js
            └── userService.test.js
    └── webpack.config.js
```