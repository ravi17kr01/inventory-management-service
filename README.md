# Simple Inventory Management API

This is a simple **Inventory Management API** that allows users to sign up, log in, and manage their inventory items (CRUD operations). Built with Node.js, Express, and MongoDB, this service includes authentication, request validation, logging, error handling, and auto-generated Swagger documentation.

---

## Features

- **User Authentication (JWT based)**
- **Item CRUD operations** (Create, Read, Update, Delete)
- **Route Protection** using Auth Middleware
- **Swagger API Documentation**
- **Logging** with Winston (stored in log files)
- **Global Error Handling Middleware**
- **MongoDB Integration** with Mongoose

---

## 🛠 Tools & Technologies Used

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT (jsonwebtoken)** for auth
- **bcryptjs** for password hashing
- **winston** for logging
- **dotenv** for environment variables
- **swagger-jsdoc** + **swagger-ui-express** for API docs
- **nodemon** for development

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management-service.git
cd inventory-management-service
```

### 2. Install Deoendencies

npm install

### 3. Create .env File

PORT=8080
MONGO_URI=your_mongodb_connection_string e.g., mongodb://localhost:27017/inventorydb
JWT_SECRET=your_jwt_secret_key

### 4. Start the Server

npm run dev

The server will run on http://localhost:8080

### 5. Swagger API Docs

After starting the server, go to:

👉 http://localhost:8080/api-docs

Here you will find all available API endpoints with parameters and responses.

🔐 Note: For authenticated routes, click "Authorize" button and enter the token in this format:

Bearer <your_token_here>

📂 Project Structure

.
├── app.js
├── .env
├── .gitignore
├── config
│   ├── db.js
│   └── swagger.js
├── controllers
│   ├── authController.js
│   └── itemController.js
├── middleware
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models
│   ├── User.js
│   └── Item.js
├── routes
│   ├── authRoutes.js
│   └── itemRoutes.js
├── utils
│   └── logger.js
├── logs
│   ├── error.log
│   └── combined.log
└── package.json

