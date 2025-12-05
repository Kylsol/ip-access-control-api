# ip-access-control-api
# **IP Access Control API (MVP)**

This project is an IP Access Control REST API that allows users, services, and approved IP records to be managed through a relational database. The goal is to provide a backend foundation for a system that verifies whether a user’s IP address is allowed to access a specific internal service.

This is the **MVP version**, which includes full CRUD operations, a relational database, basic middleware, unit tests, and API documentation.

---

## **Technologies Used**

* Node.js
* Express.js
* Sequelize ORM
* SQLite (development database)
* Jest + Supertest (unit tests)
* Postman (API documentation)

---

## **Project Structure**

```
.
├── app.js
├── server.js
├── routes/
│   ├── users.js
│   ├── services.js
│   ├── ipRecords.js
│   └── logs.js
├── database/
│   ├── models/
│   ├── seed.js
│   └── config.js
├── middleware/
│   ├── logger.js
│   └── errorHandler.js
└── tests/
```

---

## **Setup Instructions**

### 1. Install Dependencies

```
npm install
```

### 2. Run Database Setup

This resets and seeds the database with sample data.

```
npm run db:seed
```

### 3. Start the Server

```
npm run dev
```

Server runs on:
**[http://localhost:3000](http://localhost:3000)**

---

## **Available Endpoints (MVP)**

### **Users**

* `GET /users` – Get all users
* `POST /users` – Create a user
* `PUT /users/:id` – Update a user
* `DELETE /users/:id` – Delete a user

### **Services**

* `GET /services`
* `POST /services`
* `PUT /services/:id`
* `DELETE /services/:id`

### **IP Records**

* `GET /ips`
* `POST /ips`
* `PUT /ips/:id`
* `DELETE /ips/:id`

### **Logs**

* `GET /logs` – Returns all IP access logs (MVP placeholder)

---

## **Testing**

To run unit tests:

```
npm test
```

Tests include:

* Basic CRUD operations
* Validation/error responses
* Database reset before test suites

---

## **Postman Documentation**

*[Public API documentation link](https://www.postman.com/kkyyllee-ks-8217982/workspace/test/collection/49928997-6eafa8d0-ce82-4f08-9afa-a51d45055e60?action=share&creator=49928997)*

---