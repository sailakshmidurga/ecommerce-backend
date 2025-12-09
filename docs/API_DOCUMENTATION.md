Create this file:

```
docs/API_DOCUMENTATION.md
```

Paste this inside:

---

# API Documentation

Base URL:

```
http://localhost:3000
```

---

## Authentication APIs

---

### **Register User**

```
POST /api/auth/register
```

Body:

```json
{
  "name": "Sai",
  "email": "test@example.com",
  "password": "password123"
}
```

---

### **Login User**

```
POST /api/auth/login
```

Body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "your-jwt-token"
}
```

---

## Product APIs

---

### **Create Product (Admin Only)**

```
POST /api/products/create
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "name": "Laptop",
  "price": 50000,
  "description": "Gaming laptop",
  "stock": 10
}
```

---

### **Get All Products**

```
GET /api/products/all
```

Behavior:

* First request → database
* Subsequent requests → Redis cache

---

## Order APIs

---

### **Place Order**

```
POST /api/orders/create
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "items": [
    { "productId": 1, "quantity": 2 }
  ]
}
```

Behavior:

* Runs inside a database transaction
* Uses optimistic locking
* Pushes job to BullMQ queue

---

## Queue / Worker System

---

### **Start Worker**

```
node src/jobs/worker.js
```

Worker Output Example:

```
Sending email for order...
Email sent!
Job completed
```

---

# End of API Documentation

---

# 🎉 All markdown files are now complete.
