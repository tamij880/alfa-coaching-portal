# Alfa Coaching Portal

Alfa Coaching Portal is a full-stack educational web platform built with **React, Node.js, Express, and MongoDB**.  
It provides students with study materials, notes, guides, and online exams.

---

## 🚀 Features
- Student registration and login system
- Secure authentication with JWT and protected routes
- Course management (add, update, delete, view)
- Admin dashboard for managing students and courses
- Responsive frontend built with React + React Router
- RESTful backend API using Node.js + Express
- MongoDB Atlas integration for database management

---

## 🌐 Live Demo Links
- **Frontend (React - Vercel)**: [https://alfa-coaching-portal.vercel.app](https://alfa-coaching-portal.vercel.app)  
- **Backend (Node.js - Render)**: [https://alfa-coaching-portal-1.onrender.com](https://alfa-coaching-portal-1.onrender.com)

---

## 📡 API Documentation

### 🔑 Authentication
- **POST /api/register**  
  Request Body:
  ```json
  {
    "name": "Tamij",
    "email": "tamij@example.com",
    "password": "123456"
  }
