# Simple Inventory Management API

This is a simple **Inventory Management API** that allows users to sign up, log in, and manage their inventory items (CRUD operations). Built with Node.js, Express, and MongoDB, this service includes authentication, request validation, logging, error handling, and auto-generated Swagger documentation.

---

## ✨ Features

- **User Authentication (JWT based)**
- **Item CRUD operations** (Create, Read, Update, Delete)
- **Route Protection** using Auth Middleware
- **Swagger API Documentation**
- **Logging** with Winston (stored in log files)
- **Global Error Handling Middleware**
- **MongoDB Integration** with Mongoose

---

## 🛠️ Tools & Technologies Used

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT (jsonwebtoken)** for auth
- **bcryptjs** for password hashing
- **winston** for logging
- **dotenv** for environment variables
- **swagger-jsdoc** + **swagger-ui-express** for API docs
- **nodemon** for development

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management-service.git
```
```bash
cd inventory-management-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

```bash
PORT=8080
MONGO_URI=mongodb://localhost:27017/inventorydb ### your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server

```bash
npm start
```
The server will run on http://localhost:8080

### 5. Swagger API Docs

After starting the server, go to:

👉 http://localhost:8080/api-docs

Here you will find all the available API endpoints with parameters and responses.

🔐 Note: For authenticated routes, click "Authorize" button and enter the token value from login route's response:
