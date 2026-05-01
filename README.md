# 🚀 Node.js API with JWT, TypeScript, Mongoose, Express & Jest

## 📌 1. Introduction

This project is a RESTful API built using:

- TypeScript
- Express.js
- Mongoose (MongoDB)
- JSON Web Token (JWT) Authentication
- Jest (for testing)

---

## ⚙️ 2. Requirements

Make sure you have the following installed:

- Node.js v20 or higher
- MongoDB (local or cloud instance)

---

## 🛠️ 3. Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Open in browser
```
http://localhost:8000/
```

---

## 🔗 4. API Endpoints

### 👤 User APIs

#### ➤ Create User
- URL: `http://localhost:8000/users/create`
- Method: POST
- Body:
```json
{
  "username": "tester",
  "email": "tester@gmail.com",
  "password": "123456"
}
```

---

#### ➤ Login
- URL: `http://localhost:8000/auth/login`
- Method: POST
- Body:
```json
{
  "email": "tester@gmail.com",
  "password": "123456"
}
```

---

### 👥 Customer APIs

#### ➤ Create Customer
- URL: `http://localhost:8000/customers`
- Method: POST
- Headers:
```
Authorization: Bearer <your_token>
```
- Body:
```json
{
  "name": "Customer2",
  "email": "customer2@gmail.com",
  "phoneNumber": "8956325688"
}
```

---

### ✏️ Other Available APIs

You can find additional APIs in the codebase:

- Update Customer  
- Delete Customer  
- Reset User Password  
- Create Product  
- Update Product  
- Delete Product  

---

## 🧪 5. Running Tests

This project uses Jest for testing.

Run the following command:

```bash
npm run test
```

---

## ⭐ Support

If you found this project helpful:

- Give it a ⭐ on GitHub  
- Share it with others  
- Follow for more updates  
