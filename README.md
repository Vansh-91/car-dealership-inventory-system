# 🚗 Car Dealership Inventory System

A full-stack **Car Dealership Inventory Management System** built using the **MERN Stack (MongoDB, Express, React, Node.js)** with **TypeScript**, **JWT Authentication**, and a modern **React + Tailwind CSS** frontend.

This project was developed as part of a Full-Stack Developer assessment to demonstrate backend API development, frontend engineering, authentication, database management, testing, and modern development workflows.

---
# 🌐 Deployment
Frontend:
https://car-dealership-inventory-system-rust.vercel.app/

Backend API:
https://car-dealership-inventory-system-u44t.onrender.com

# 🔑 Demo Credentials
Admin Account:
Email:
admin@dealer.com
Password:
Admin@123

# ✨ Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Admin/User Roles

---

## Vehicle Management

* View all vehicles
* Search vehicles
* Filter by category
* Filter by price range
* Add vehicle (Admin)
* Update vehicle (Admin)
* Delete vehicle (Admin)
* Purchase vehicle
* Restock vehicle (Admin)

---

## Dashboard

* Modern responsive UI
* Inventory statistics
* Search & filters
* Purchase button disabled when stock reaches zero
* Admin-only controls
* Dark theme

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router DOM
* React Hook Form
* Zod
* Axios
* React Hot Toast
* React Icons
* Vite

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt
* Express Validator

## Testing

* Jest
* Supertest

---

# 📁 Project Structure

```text
car-dealership-inventory-system
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── tests
│   │   ├── utils
│   │   └── app.ts
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── schemas
│   │   ├── services
│   │   ├── types
│   │   └── App.tsx
│   │
│   └── package.json
│
├── README.md
└── PROMPTS.md
```

---

# 🔐 Authentication

The application uses **JSON Web Tokens (JWT)**.

Protected APIs require:

```
Authorization: Bearer <token>
```

Admin-only APIs additionally verify the user's role before allowing access.

---

# 🚙 API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

## Vehicles

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | /api/vehicles        | Get all vehicles         |
| GET    | /api/vehicles/search | Search & filter vehicles |
| POST   | /api/vehicles        | Add vehicle (Admin)      |
| PUT    | /api/vehicles/:id    | Update vehicle           |
| DELETE | /api/vehicles/:id    | Delete vehicle (Admin)   |

---

## Inventory

| Method | Endpoint                   | Description             |
| ------ | -------------------------- | ----------------------- |
| POST   | /api/vehicles/:id/purchase | Purchase vehicle        |
| POST   | /api/vehicles/:id/restock  | Restock vehicle (Admin) |

---

# ⚙ Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Vansh-91/car-dealership-inventory-system.git
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🧪 Running Tests

Backend tests:

```bash
npm test
```

---

# ✅ Test Report

```
Test Suites: 2 passed, 2 total

Tests:       15 passed, 15 total
```

All backend unit and integration tests pass successfully.

---

# 🖼 Screenshots

### Login

<img width="1870" height="928" alt="image" src="https://github.com/user-attachments/assets/22aeb114-5876-422f-a22a-f510087a4945" />


### Register

<img width="1888" height="947" alt="image" src="https://github.com/user-attachments/assets/da593006-c29f-46fd-85b3-83ca6dfeeb46" />


### Dashboard
<img width="1902" height="912" alt="Screenshot 2026-07-30 193921" src="https://github.com/user-attachments/assets/5ffb8744-0c59-44f9-99c2-7c1310a023d8" />

<img width="1891" height="967" alt="image" src="https://github.com/user-attachments/assets/824d66a5-4ee4-435c-a562-797b25f72132" />


### Vehicle Search

<img width="1902" height="913" alt="image" src="https://github.com/user-attachments/assets/4d3d05de-ecfb-490d-8b4b-cd786f6b9a51" />
<img width="1895" height="870" alt="image" src="https://github.com/user-attachments/assets/cfa0ae7e-9012-4f8c-87a9-80dd85e95117" />


### Admin Dashboard
<img width="1906" height="900" alt="image" src="https://github.com/user-attachments/assets/ba75070f-097e-42de-88a0-8a1683ba1222" />
<img width="1911" height="576" alt="image" src="https://github.com/user-attachments/assets/08d5e87a-9faa-4f97-89f8-be402d23537c" />

---

# 🎯 Key Features Implemented

* JWT Authentication
* Password Hashing
* MongoDB Integration
* Vehicle CRUD
* Inventory Purchase
* Inventory Restock
* Search & Filters
* Protected Routes
* Admin Authorization
* Responsive Design
* Modern Dark UI
* Form Validation
* Error Handling
* RESTful API Design
* Backend Testing

---

# 🤖 My AI Usage

This project was developed with responsible use of AI-assisted development tools.

### AI Tools Used

* ChatGPT

### How AI Was Used

* Planned the backend architecture.
* Generated initial API boilerplate.
* Designed the authentication flow.
* Assisted in debugging Express, MongoDB, and React issues.
* Helped implement frontend components using React and Tailwind CSS.
* Suggested improvements for reusable component design.
* Assisted in writing backend tests.
* Reviewed project structure.
* Improved documentation.
* Helped troubleshoot TypeScript and React Hook Form issues.

### Reflection

AI significantly accelerated development by reducing repetitive boilerplate work, helping identify bugs, and suggesting clean architectural patterns. Every AI-generated solution was reviewed, tested, and adapted before being integrated into the project. The final implementation reflects my understanding and manual validation of the generated code.

---

# 🚀 Future Improvements

* Image upload for vehicles
* Pagination
* Sorting
* Advanced filtering
* Sales analytics dashboard
* Email notifications
* Docker support
* CI/CD pipeline
* Cloud deployment monitoring

---
# 🌐 Deployment

Frontend:
Vercel

Backend:
Render

Database:
MongoDB Atlas

# 👨‍💻 Author

**Vansh Garg**

GitHub:

https://github.com/Vansh-91

---

# 📄 License

This project was created for educational and assessment purposes.
